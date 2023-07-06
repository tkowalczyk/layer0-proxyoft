import { task } from "hardhat/config";
import { ethers } from "ethers";
import { chains } from "./interfaces/Chain";

task("sendFromSrc", "get trusted remote")
    .addParam("remotechain", "Specify the remote chain")
    .addParam("to", "receiver address")
    .addParam("amount", "Amount to spent")
    .setAction(async (taskArgs, hre) => {
        const networkName = hre.network.name;
        const chain = chains.find((chain) => chain.name === networkName);
        const remoteChain = chains.find((chain) => chain.name === taskArgs.remotechain);

        const rpc = new ethers.AlchemyProvider(chain?.alchemyName, chain?.alchemyKey);
        const wallet = new ethers.Wallet(`${process.env.ARB_GOERLI_PRIVATE_KEY}`, rpc);

        try {
            let contract = new ethers.Contract(
                `${chain?.address}`,
                new ethers.Interface([
                    `function estimateSendFee(uint16 _dstChainId, bytes calldata _toAddress, uint _amount, bool _useZro, bytes calldata _adapterParams) external view returns (uint nativeFee, uint zroFee)`,
                    `function sendFrom(address _from, uint16 _dstChainId, bytes calldata _toAddress, uint _amount, address payable _refundAddress, address _zroPaymentAddress, bytes calldata _adapterParams) external payable`
                ]),
                rpc
            );

            let txnFee = await contract.connect(wallet).getFunction('estimateSendFee')(
                remoteChain?.chainId,
                taskArgs.to,
                taskArgs.amount,
                false,
                "0x"
            );

            let txnSwap = await contract.connect(wallet).getFunction('sendFrom')(
                wallet.address,
                remoteChain?.chainId,
                taskArgs.to,
                taskArgs.amount,
                wallet.address,
                ethers.ZeroAddress,
                "0x",
                { value: txnFee.nativeFee }
            );
            console.log(txnSwap)
        } catch (error) {

        }
    });

task("sendFromDst", "get trusted remote")
    .addParam("remotechain", "Specify the remote chain")
    .addParam("to", "receiver address")
    .addParam("amount", "Amount to spent")
    .setAction(async (taskArgs, hre) => {
        const networkName = hre.network.name;
        const chain = chains.find((chain) => chain.name === networkName);
        const remoteChain = chains.find((chain) => chain.name === taskArgs.remotechain);

        const rpc = new ethers.AlchemyProvider(chain?.alchemyName, chain?.alchemyKey);
        const wallet = new ethers.Wallet(`${process.env.PLG_MUMBAI_TOKEN_OWNER}`, rpc);

        try {
            let contract = new ethers.Contract(
                `${chain?.address}`,
                new ethers.Interface([
                    `function estimateSendFee(uint16 _dstChainId, bytes calldata _toAddress, uint _amount, bool _useZro, bytes calldata _adapterParams) external view returns (uint nativeFee, uint zroFee)`,
                    `function sendFrom(address _from, uint16 _dstChainId, bytes calldata _toAddress, uint _amount, address payable _refundAddress, address _zroPaymentAddress, bytes calldata _adapterParams) external payable`
                ]),
                rpc
            );

            let txnFee = await contract.connect(wallet).getFunction('estimateSendFee')(
                remoteChain?.chainId,
                taskArgs.to,
                taskArgs.amount,
                false,
                "0x"
            );

            let txnSwap = await contract.connect(wallet).getFunction('sendFrom')(
                wallet.address,
                remoteChain?.chainId,
                ethers.solidityPacked(["address"], [taskArgs.to]),
                taskArgs.amount,
                wallet.address,
                ethers.ZeroAddress,
                "0x",
                { value: txnFee.nativeFee }
            );
            console.log(txnSwap)
        } catch (error) {

        }
    });