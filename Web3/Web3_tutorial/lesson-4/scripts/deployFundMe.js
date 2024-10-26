// import ethers.js
// create main funciotn
// execute main function

const { ethers, run } = require("hardhat");

async function main() {
  // create factory
  const fundMeFactory = await ethers.getContractFactory("FundMe");
  // deploy contract from factory
  const fundMe = await fundMeFactory.deploy(10);
  await fundMe.waitForDeployment();
  console.log(
    `contract has been deployed successfully, contract address is ${fundMe.target}`
  );

  // verify fundMe
  if (
    hre.network.config.chainId == 111551111 &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await fundMe.deloymentTransaction.wait(5);
    console.log("Waiting for 5 confirmations");
    await verifyFundMe(fundMe, [10]);
  } else {
    console.log("verification skipped..");
  }
}

async function verifyFundMe(fundMeAddr, args) {
  await hre.run("verify:verify", {
    address: fundMeAddr,
    constructorArguments: args,
  });
}

main()
  .then()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// npx hardhat run scripts/deployFundMe.js --network sepolia
// npx hardhat verify --network sepolia 0x1AC55d145062C48ddda47f1AB2C5b7B0129842d5 "10"
