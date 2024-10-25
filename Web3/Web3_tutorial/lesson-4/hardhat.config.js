require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("@chainlink/env-enc").config();

const SEPOLIA_URL = process.env.SEPOLIA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

console.log(SEPOLIA_URL);

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // defaultNetwork: "hardhat",
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};

//  npx hardhat run scripts/deployFundMe.js --network sepolia
