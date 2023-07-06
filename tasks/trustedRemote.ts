import { task } from "hardhat/config";
import { ethers } from "ethers";
import { chains } from "./interfaces/Chain";

task("setTrustedRemote", "set trusted remote")
    .addParam("remotechain", "Specify the remote chain")
    .setAction(async (taskArgs, hre) => {
        const networkName = hre.network.name;
        const chain = chains.find((chain) => chain.name === networkName);
        const remoteChain = chains.find((chain) => chain.name === taskArgs.remotechain);

        const rpc = new ethers.AlchemyProvider(chain?.alchemyName, chain?.alchemyKey);
        const wallet = new ethers.Wallet(`${process.env.ARB_GOERLI_PRIVATE_KEY}`, rpc);

        let trustedRemote = ethers.solidityPacked(
            ['address', 'address'],
            [remoteChain?.address, chain?.address]
        );

        try {
            let contract = new ethers.Contract(
                `${chain?.address}`,
                new ethers.Interface([
                    `function token() external view returns (address)`,
                    `function setTrustedRemote(uint16 _remoteChainId, bytes calldata _path) external`
                ]),
                rpc
            )

            let txn = await contract.connect(wallet).getFunction('setTrustedRemote')(remoteChain?.chainId, trustedRemote);
            console.log(txn)
        } catch (error) {

        }
    });

task("getTrustedRemote", "get trusted remote")
    .addParam("remotechain", "Specify the remote chain")
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
                    `function getTrustedRemoteAddress(uint16 _remoteChainId) external view returns (bytes memory)`
                ]),
                rpc
            )

            let txn = await contract.connect(wallet).getFunction('getTrustedRemoteAddress')(remoteChain?.chainId);
            console.log(txn)
        } catch (error) {

        }
    });