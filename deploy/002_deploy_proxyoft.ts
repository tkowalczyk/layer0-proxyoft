import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;

    const { deployer } = await getNamedAccounts();

    await deploy('Proxy', {
        from: deployer,
        args: ["0x6aB5Ae6822647046626e83ee6dB8187151E1d5ab", "0x0239fAaE00628616679eA1124e0F68e4AD6F287b"],
        log: true,
    });
};
export default func;
func.tags = ['all','Proxy'];