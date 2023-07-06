import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "dotenv/config";
import 'hardhat-deploy';
import "./tasks/index";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: "0.8.18",
  namedAccounts: {
    deployer: 0,
  },
  networks: {
    hardhat: {
      chainId: 8545,
    },
    localhost: {
      chainId: 8545,
    },
    arbitrumGoerli: {
      chainId: 421613,
      url: `https://arb-goerli.g.alchemy.com/v2/${process.env.ARB_GOERLI_ALCHEMY_API}`,
      accounts: [process.env.ARB_GOERLI_PRIVATE_KEY!],
      saveDeployments: true
    },
    polygonMumbai: {
      chainId: 80001,
      url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.PLG_MUMBAI_ALCHEMY_API}`,
      accounts: [process.env.PLG_MUMBAI_PRIVATE_KEY!],
      saveDeployments: true
    },
  },
  gasReporter: {
    enabled: false,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY || "",
      arbitrumOne: process.env.ARBISCAN_API_KEY || "",
      arbitrumGoerli: process.env.ARBISCAN_API_KEY || "",
      polygon: process.env.POLYGONSCAN_API_KEY || "",
      polygonMumbai: process.env.POLYGONSCAN_API_KEY || "",
    }
  },
};

export default config;