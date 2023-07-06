import { deployments, ethers, getNamedAccounts, network } from "hardhat";
import { developmentChains } from "../helper-hardhat-config";
import { expect } from "chai";
import { Contract } from "ethers";

// * if the newwork will be hardhat or localhost then these tests will be run.
!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Token Contract - Unit Tests", () => {
    let deployer: string;
    let token: Contract;

    beforeEach(async () => {
      if (!developmentChains.includes(network.name)) {
        throw "You need to be on a development chain to run tests";
      }

      deployer = (await getNamedAccounts()).deployer;
      await deployments.fixture(["Token"]);

      const tokenContract = await deployments.get("Token");

      token = await ethers.getContractAt(
        tokenContract.abi,
        tokenContract.address);
    });

    describe("Deployment", () => {
      it("should create a token with a name.", async () => {
        expect(await token.name()).to.equal('CryptoDev');
      });

      it("should create a token with a symbol.", async () => {
        expect(await token.symbol()).to.equal('cDEV');
      });

    });
  });