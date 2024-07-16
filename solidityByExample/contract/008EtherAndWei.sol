// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;



contract Ether {
    // 1rth = 10 ** 18, Wei is the smallest unit of gas on Ethereum 
    uint public oneWei = 1 wei;

    bool public isOneWei = (1 wei == 1);  // == >= <= !=

    uint public  oneEther = 1 ether;

    bool public isOneEther = (1 ether == 10 **18 wei); // 1e18 = 10 ** 18 = 1000000000000000000

}