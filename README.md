# polkadot-api-reactNative-debugging

> wss://poc-2.polkadot.io:9944

> wss://substrate-rpc.parity.io/

> ws://10.0.2.2:9944  <android>

> ws://127.0.0.1:9944     <ios>
## @polkadot/api
### api.
#### api.rpc
- [x] api.rpc.chain.subscribeNewHead
```
type State = { blockNumber?: BlockNumber };
...
componentDidMount(){
     api.rpc.chain.subscribeNewHead((block) => {
        if (block && block.blockNumber) {
          this.setState({
            blockNumber: block.blockNumber
          });
        }
      });
....
      
<Text style={styles.instructions}>{(blockNumber ||'-').toString()}</Text>
```
----

- [x] api.rpc.system

```
      const [chain, nodeName, nodeVersion] = await Promise.all([
        api.rpc.system.chain(),
        api.rpc.system.name(),
        api.rpc.system.version()
      ]);
      this.setState({
        nodeversion: nodeVersion
      });
      
      ...
<Text style={styles.instructions}>{(nodeversion ||'-').toString()}</Text>
```



