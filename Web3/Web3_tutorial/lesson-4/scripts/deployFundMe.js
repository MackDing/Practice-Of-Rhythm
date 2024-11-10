const { ethers, run, network } = require("hardhat");

async function main() {
  // 获取 FundMe 合约的工厂对象
  const fundMeFactory = await ethers.getContractFactory("FundMe");
  console.log("Deploying the contract...");

  // 部署合约，构造函数参数为 10
  const fundMe = await fundMeFactory.deploy(10);
  await fundMe.deploymentTransaction().wait(); // 等待交易完成
  console.log(
    `Contract FundMe is deployed successfully at address ${fundMe.target}`
  );

  // 如果在 Sepolia 网络上，并且设置了 Etherscan API KEY，则进行验证
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for 3 confirmations...");
    await fundMe.deploymentTransaction().wait(3); // 等待3次确认
    console.log("Verifying contract on Etherscan...");
    await verify(fundMe.target, [10]);
  } else {
    console.log("Skipping verification");
  }

  // 初始化两个签名者（账户）
  const [firstAccount, secondAccount] = await ethers.getSigners();
  console.log(`First account address is ${firstAccount.address}`);
  console.log(`Second account address is ${secondAccount.address}`);

  // 进行首次资金存入
  console.log("Funding the contract...");
  try {
    const fundTx = await fundMe.fund({
      // value: ethers.utils.parseEther("0.1"), // 确保使用 ethers.utils.parseEther
      value: ethers.parseEther("0.1")
    });
    await fundTx.wait();
    console.log("Funded the contract");
  } catch (error) {
    console.error("Error in funding the contract:", error);
    console.error("Error reason:", error.reason); // 打印错误原因
    return;
  }

  // 查询合约的余额
  try {
    const fundMeBalance = await ethers.provider.getBalance(fundMe.target);
    console.log(
      `Balance of the contract FundMe is ${ethers.utils.formatEther(
        fundMeBalance
      )} ETH`
    );
  } catch (error) {
    console.error("Error in fetching the balance:", error);
    return;
  }

  // 查询第一个账户的资金
  console.log("Fetching the funds of the first account...");
  try {
    const fundsOfFirstAccount = await fundMe.fundersToAmount(
      firstAccount.address
    );
    console.log(
      `Current funds of the first account is ${ethers.utils.formatEther(
        fundsOfFirstAccount
      )} ETH`
    );
  } catch (error) {
    console.error("Error in fetching the funds for the first account:", error);
    return;
  }

  // 第二个账户进行资金存入操作
  console.log("Funding the contract on behalf of the second account...");
  try {
    const secondFundTx = await fundMe.connect(secondAccount).fund({
      // value: ethers.utils.parseEther("0.1"),
      value: ethers.parseEther("0.1")
    });
    await secondFundTx.wait();
  } catch (error) {
    console.error(
      "Error in funding the contract with the second account:",
      error
    );
    return;
  }

  // 查询第二个账户的资金
  console.log("Fetching the funds of the second account...");
  try {
    const fundsOfSecondAccount = await fundMe.fundersToAmount(
      secondAccount.address
    );
    console.log(
      `Current funds of the second account is ${ethers.utils.formatEther(
        fundsOfSecondAccount
      )} ETH`
    );
  } catch (error) {
    console.error("Error in fetching the funds for the second account:", error);
    return;
  }
}

// 验证合约
async function verify(address, args) {
  try {
    await run("verify:verify", {
      address: address,
      constructorArguments: args,
    });
  } catch (e) {
    console.error("Verification failed:", e);
  }
}

// 执行主函数并处理可能的错误
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });
