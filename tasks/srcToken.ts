import { task } from "hardhat/config";
import { ethers } from "ethers";
import { chains } from "./interfaces/Chain";

task("approveProxy", "get trusted remote")
    .addParam("token", "Token contract address")
    .addParam("amount", "Amount to spent")
    .setAction(async (taskArgs, hre) => {
        const networkName = hre.network.name;
        const chain = chains.find((chain) => chain.name === networkName);

        const rpc = new ethers.AlchemyProvider(chain?.alchemyName, chain?.alchemyKey);
        const wallet = new ethers.Wallet(`${process.env.ARB_GOERLI_PRIVATE_KEY}`, rpc);

        try {
            let contract = new ethers.Contract(
                `${taskArgs.token}`,
                new ethers.Interface([
                    `function approve(address spender, uint256 amount) public`
                ]),
                rpc
            )

            let txn = await contract.connect(wallet).getFunction('approve')(chain?.address, taskArgs.amount);
            console.log(txn)
        } catch (error) {

        }
    });