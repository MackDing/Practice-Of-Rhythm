// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

// 1. 创建一个收款函数
// 2. 记录投资人并且查看
// 3. 在锁定期内，达到目标值，生产商可以提款
// 4. 在锁定期内，没有达到目标值，投资人在锁定期以后退款

contract FundMe {
    mapping(address => uint256) public fundersToAmount;

    uint256 constant MINIMUM_VALUE = 100 * 10 ** 18; //USD
    uint256 constant TARGET = 1000 * 10 ** 18;

    AggregatorV3Interface internal dataFeed;

    address public owner;
    uint256 deploymentTimestamp;
    uint256 lockTime;
    address erc20Addr;
    bool public getFundSuccess = false;

    constructor(uint256 _lockTime) {
        // sepolia testnet
        dataFeed = AggregatorV3Interface(
            0x1AC55d145062C48ddda47f1AB2C5b7B0129842d5
        );
        owner = msg.sender;
        deploymentTimestamp = block.timestamp;
        lockTime = _lockTime;
    }

    function fund() public payable {
        // Check if the message value meets the minimum amount required
        require(convertEthToUsd(msg.value) >= MINIMUM_VALUE, "Send more ETH");

        // Check if the current time is before the closing window time
        require(
            block.timestamp < deploymentTimestamp + lockTime,
            "window is closed"
        );

        // Increment the amount of funds sent by the sender
        fundersToAmount[msg.sender] += msg.value;
    }

    function getChainlinkDataFeedLatestAnswer() public view returns (int) {
        // Get the latest round data from Chainlink
        (, /* uint80 roundID */ int answer, , , ) = /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/
        dataFeed.latestRoundData();

        return answer;
    }

    function convertEthToUsd(
        uint256 ethAmount
    ) internal view returns (uint256) {
        uint256 ethPrice = uint256(getChainlinkDataFeedLatestAnswer());
        return (ethAmount * ethPrice) / (10 ** 8);
    }

    function transferOwnership(address newOwner) public onlyOwner {
        owner = newOwner;
    }

    function getFund() external windowClosed onlyOwner {
        require(
            convertEthToUsd(address(this).balance) >= TARGET,
            "Target is not reached"
        );

        // Transfer the balance to the owner
        bool success;
        (success, ) = payable(msg.sender).call{value: address(this).balance}(
            ""
        );
        require(success, "Transfer failed");

        // Reset the funder's amount
        fundersToAmount[msg.sender] = 0;
        getFundSuccess = true; // flag
    }

    function refund() external windowClosed {
        require(
            convertEthToUsd(address(this).balance) < TARGET,
            "Target is reached"
        );
        require(fundersToAmount[msg.sender] != 0, "There is no fund for you");

        // Refund the amount to the sender
        bool success;
        (success, ) = payable(msg.sender).call{
            value: fundersToAmount[msg.sender]
        }("");
        require(success, "Transfer failed");

        // Reset the funder's amount
        fundersToAmount[msg.sender] = 0;
    }

    function setFunderToAmount(
        address funder,
        uint256 amountToUpdate
    ) external {
        require(
            msg.sender == erc20Addr,
            "You do not have permission to call this function"
        );

        // Update amount for funder
        fundersToAmount[funder] = amountToUpdate;
    }

    function setErc20Addr(address _erc20Addr) public onlyOwner {
        erc20Addr = _erc20Addr;
    }

    modifier windowClosed() {
        require(
            block.timestamp >= deploymentTimestamp + lockTime,
            "Window is not closed"
        );
        _;
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "This function can only be called by owner"
        );
        _;
    }

    // Publicly expose MINIMUM_VALUE constant, so that it can be accessed from the interface
    function getMinimumValue() public pure returns (uint256) {
        return MINIMUM_VALUE;
    }

    // Publicly expose deploymentTimestamp, so that it can be accessed from the interface
    function getDeploymentTimestamp() public view returns (uint256) {
        return deploymentTimestamp;
    }
}
