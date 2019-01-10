/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import Api from '@polkadot/api/promise';
import WsProvider from '@polkadot/rpc-provider/ws';
import { Balance, BlockNumber } from '@polkadot/types';

const { Keyring } = require('@polkadot/keyring');
const { stringToU8a } = require('@polkadot/util');

type Props = {};
type State = {
  balance?: Balance | null,
  blockNumber?: BlockNumber
};

const ALICE = '5GoKvZWG5ZPYL1WUovuHW3zJBWBP5eT8CbqjdRY4Q6iMaDtZ';
const ALICE_SEED = 'Alice'.padEnd(32, ' ');
const BOB   = '5FZEyVyZm7r8WPQ8racC8MfdYMsAJNqGVVQQR4zM5SbEwhDr';
const ENDPOINT = 'ws://10.0.2.2:9944/';

export default class App extends Component<Props> {
  state = {};

  componentDidMount () {
    (async () => {
      const keyring = new Keyring();
      const alice = keyring.addFromSeed(stringToU8a(ALICE_SEED));

      const provider = new WsProvider(ENDPOINT);
      const api = await Api.create(provider);

      //query balance
      api.query.balances.freeBalance(ALICE, (balance) => {
        this.setState({
          balance
        });
      });

      //block number
      api.rpc.chain.subscribeNewHead((block) => {
        if (block && block.blockNumber) {
          this.setState({
            blockNumber: block.blockNumber
          });
        }
      });

      //Taransfer
      const aliceNonce = await api.query.system.accountNonce(alice.address());
      const transfer = api.tx.balances.transfer(BOB, 99369);
      transfer.sign(alice, aliceNonce);
      const hash = await transfer.send();
      console.log(`transfer 99369 to Bob with hash ${hash}`);

      // query Storage
      const [accountNonce, blockPeriod, validators] = await Promise.all([
        api.query.system.accountNonce(ALICE),
        api.query.timestamp.blockPeriod(),
        api.query.session.validators()
      ]);
    
      console.log(`accountNonce(${ALICE}) ${accountNonce}`);
      console.log(`blockPeriod ${blockPeriod.toNumber()} seconds`);

      // Retrieve the balances for all validators
      const validatorBalances = await Promise.all(
        validators.map((authorityId) =>
          api.query.balances.freeBalance(authorityId)
        )
      );

      console.log('validators', validators.map((authorityId, index) => ({
        address: authorityId.toString(),
        balance: validatorBalances[index].toString()
      })));
    
      // subscribe to system events via storage
      api.query.system.events((events) => {
        console.log(`\nReceived ${events.length} events:`);

        // loop through the Vec<EventRecord>
        events.forEach((record) => {
          // extract the phase, event and the event types
          const { event, phase } = record;
          const types = event.typeDef;

          // show what we are busy with
          console.log(`\t${event.section}:${event.method}:: (phase=${phase.toString()})`);
          console.log(`\t\t${event.meta.documentation.toString()}`);

          // loop through each of the parameters, displaying the type and data
          event.data.forEach((data, index) => {
            console.log(`\t\t\t${types[index].type}: ${data.toString()}`);
          });
        });
      });



    })();
  }

  render() {
    const { balance, blockNumber } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Current block</Text>
        <Text style={styles.instructions}>#{(blockNumber || '-').toString()}</Text>
        <Text style={styles.instructions}>Alice balance = {(balance || '-').toString()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});