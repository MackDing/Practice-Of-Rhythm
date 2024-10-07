// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

// 1. Create a collection function
// 2. Record investors and view
// 3. During the lock up period, if the target value is reached, the manufacturer can withdraw funds. 
// 4. If the target value is not reached during the lock up period, investors will refund after the lock up period

contract FundMe {
    mapping(address => uint256) public funderToAmount;

    uint256 constant MINIMUN_VALUE = 100 * 10 ** 18; //wei 

    AggregatorV3Interface internal dataFeed;

    uint256 constant TARGET = 1000 * 10 ** 18;

    address owner;

    constructor() {
        // sepolia testnet
        dataFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        owner = msg.sender;
    }

    function fund() external  payable {
        require(convertEthToUSD(msg.value) >= MINIMUN_VALUE, "Send more ETH");
        funderToAmount[msg.sender] = msg.value;
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

    function convertEthToUSD(uint256 ethAmount) 
        internal 
        view 
        returns(uint256) {
            uint256 ethPrice = uint256(getChainlinkDataFeedLatestAnswer());
            return ethAmount * ethPrice / (10 ** 8);
    }

    function transferOwnership(address newOwner) public {
        require(msg.sender == owner, "this function can only be called by owner");
        owner = newOwner;
    }


    function getFund() external view {
        require(convertEthToUSD(address(this).balance) >= TARGET, "Target is not reached");
        require(msg.sender == owner, "this function can only be called by owner");

    }
    
}