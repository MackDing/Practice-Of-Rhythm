// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

// 1. Create a collection function
// 2. Record investors and view
// 3. During the lock up period, if the target value is reached, the manufacturer can withdraw funds.
// 4. If the target value is not reached during the lock up period, investors will refund after the lock up period

contract FundMe {
    mapping(address => uint256) public fundersToAmount;

    uint256 constant MINIMUN_VALUE = 100 * 10 ** 18; //wei to USD

    AggregatorV3Interface internal dataFeed;

    uint256 constant TARGET = 1000 * 10 ** 18;

    address public owner;

    uint256 deploymentTimestamp; // star time
    uint256 lockTime; // How long

    address erc20Addr;

    bool public getFundSuccess = false;

    constructor(uint256 _lockTime) {
        // sepolia testnet
        // dataFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        dataFeed = AggregatorV3Interface(
            0x1AC55d145062C48ddda47f1AB2C5b7B0129842d5
        );
        owner = msg.sender;

        deploymentTimestamp = block.timestamp;
        lockTime = _lockTime;
    }

    function fund() external payable {
        require(convertEthToUSD(msg.value) >= MINIMUN_VALUE, "Send more ETH");
        // require(block.timestamp < deploymentTimestamp + lockTime, "window is close");
        fundersToAmount[msg.sender] = msg.value;
    }

    function getChainlinkDataFeedLatestAnswer() public view returns (int) {
        // prettier-ignore
        (
            /* uint80 roundID */,
            int answer,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = dataFeed.latestRoundData();
        return answer;
    }

    function convertEthToUSD(
        uint256 ethAmount
    ) internal view returns (uint256) {
        uint256 ethPrice = uint256(getChainlinkDataFeedLatestAnswer());
        return (ethAmount * ethPrice) / (10 ** 8);
    }

    function transferOwnership(address newOwner) public onlyOwner {
        // require(msg.sender == owner, "this function can only be called by owner");
        owner = newOwner;
    }

    function getFund() external windowClose onlyOwner {
        require(
            convertEthToUSD(address(this).balance) >= TARGET,
            "Target is not reached"
        );
        // require(msg.sender == owner, "this function can only be called by owner");
        // require(block.timestamp >= deploymentTimestamp + lockTime, "window is not closed");

        // transfer: transfer ETH and revert if tx failed

        // payable(msg.sender).transfer(address(this).blance)

        // send: transfer ETH and return if failed
        // bool success = payable(msg.sender).send(address(this).balance)

        // call: transfer ETH with data return value of function and bool
        bool success;
        (success, ) = payable(msg.sender).call{value: address(this).balance}(
            ""
        );
        require(success, "transfer tx failed");
        fundersToAmount[msg.sender] = 0;
    }

    function refund() external windowClose {
        require(
            convertEthToUSD(address(this).balance) < TARGET,
            "Target is reached"
        );
        // uint256 amount = fundersToAmount[msg.sender];
        require(fundersToAmount[msg.sender] != 0, "there is no fund for you ");
        // require(block.timestamp >= deploymentTimestamp + lockTime, "window is not closed");

        bool success;
        (success, ) = payable(msg.sender).call{
            value: fundersToAmount[msg.sender]
        }("");
        require(success, "transfer tx failed");
        fundersToAmount[msg.sender] = 0;
        getFundSuccess = true; // flag
    }

    function setFunderToAmount(
        address funder,
        uint256 amountToUpdate
    ) external {
        require(
            msg.sender == erc20Addr,
            "you do not have permission to call this funtion"
        );
        fundersToAmount[funder] = amountToUpdate;
    }

    function setErc20Addr(address _erc20Addr) public onlyOwner {
        erc20Addr = _erc20Addr;
    }

    modifier windowClose() {
        require(
            block.timestamp >= deploymentTimestamp + lockTime,
            "window is not close"
        );
        _;
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "this function can only be called by owner"
        );
        _;
    }
}
