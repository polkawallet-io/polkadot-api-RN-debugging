# polkadot js Api for React Native debugging

New the polkadot js Api is fully compatible with React Native. 

**Reference**:  
<https://github.com/polkadot-js/api/issues/481>  
<https://github.com/polkadot-js/api/issues/526>

## How to test

```
$ git clone https://github.com/polkawallet-io/polkadot-api-reactNative-debugging.git
```

```
$ yarn install
```

```
Start your Substrate local Node.
```

```
$ react-native start
```
With another terminal:

```
$ react-native run-android
```

iOS For:

```
$ react-native run-ios
```
With another terminal:

```
$ react-native log-android  // or ios
```

**The effect** :  

![](https://user-images.githubusercontent.com/34789555/50756709-fc135d80-1297-11e9-9b61-7f86421e42e2.png)

Special thanks to: @polkadot{.js}  &  @jacogr
