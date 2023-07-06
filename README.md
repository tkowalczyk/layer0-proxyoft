# Deployment

## Token

Test
```
yarn hardhat test
```

Compile
```
yarn hardhat compile
```

Deploy (localhost)
```
yarn hardhat --network localhost deploy
```

Deploy (polygonMumbai) - [Sample](https://mumbai.polygonscan.com/token/0x6167f53cAd11dF93ca8D572a158A67807631b2a6)
```
yarn hardhat --network polygonMumbai deploy
```

Verify (polygonMumbai)
```
yarn hardhat verify CONTRACT_ADDRESS --contract contracts/Token.sol:Token --network polygonMumbai
```

Deploy (arbitrumGoerli) - [Sample](https://goerli.arbiscan.io/token/0x0239fAaE00628616679eA1124e0F68e4AD6F287b)
```
yarn hardhat --network arbitrumGoerli deploy
```

Verify (arbitrumGoerli)
```
yarn hardhat verify CONTRACT_ADDRESS --contract contracts/Token.sol:Token --network arbitrumGoerli
```

## Proxy

Deploy (localhost)
```
yarn hardhat --network localhost deploy --tags Proxy
```

Deploy (arbitrumGoerli) - [Sample](https://goerli.arbiscan.io/address/0xf95c39f613ad761E15F23048108146A5Df558fA2)
```
yarn hardhat --network arbitrumGoerli deploy --tags Proxy
```

Verify (arbitrumGoerli)
```
yarn hardhat verify CONTRACT_ADDRESS --contract contracts/Proxy.sol:Proxy --network arbitrumGoerli LZ_ENDPOINT_CONTRACT_ADDRESS TOKEN_CONTRACT_ADDRESS
```

## TokenOFT

Deploy (localhost)
```
yarn hardhat --network localhost deploy --tags TokenOFT
```

Deploy (polygonMumbai) - [Sample](https://mumbai.polygonscan.com/address/0x85F4d06D1c5070b5e75F007f6D2F53CB5077369A)
```
yarn hardhat --network polygonMumbai deploy --tags TokenOFT
```

Verify (polygonMumbai)
```
yarn hardhat verify CONTRACT_ADDRESS --contract contracts/TokenOFT.sol:TokenOFT --network polygonMumbai TOKEN_NAME TOKEN_SYMBOL LZ_ENDPOINT_CONTRACT_ADDRESS
```

## Trusted

Set
```
yarn hardhat --network arbitrumGoerli setTrustedRemote --remotechain polygonMumbai
yarn hardhat --network polygonMumbai setTrustedRemote --remotechain arbitrumGoerli
```

Get
```
yarn hardhat --network arbitrumGoerli getTrustedRemote --remotechain polygonMumbai
yarn hardhat --network polygonMumbai getTrustedRemote --remotechain arbitrumGoerli
```

Approve
```
yarn hardhat --network arbitrumGoerli approveProxy --token TOKEN_CONTRACT_ADDRESS --amount 1000000000000000000
```

SendFrom
```
yarn hardhat --network arbitrumGoerli sendFromSrc --remotechain polygonMumbai --to REMOTE_RECEIVER_ADDRESS --amount 1000000000000000000
yarn hardhat --network polygonMumbai sendFromDst --remotechain arbitrumGoerli --to REMOTE_RECEIVER_ADDRESS --amount 1000000000000000000
```