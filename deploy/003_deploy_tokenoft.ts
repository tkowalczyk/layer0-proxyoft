import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts } = hre;
    const { deploy } = deployments;

    const { deployer } = await getNamedAccounts();

    await deploy('TokenOFT', {
        from: deployer,
        args: ["GryShift", "GSH", "0xf69186dfBa60DdB133E91E9A4B5673624293d8F8"],
        log: true,
    });
};
export default func;
func.tags = ['all','TokenOFT'];