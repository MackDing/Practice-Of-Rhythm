// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;


contract Variables{
    int32 public a = type(int32).min;

    // local state global
/*
There are 3 types of variables in Solidity

 - local
declared inside a function
not stored on the blockchain

 - state
declared outside a function
stored on the blockchain

 - global 
 (provides information about the blockchain)
*/
    string public text = "Hello,Fred";

    uint numa = 88;

    function doSomething() public view returns(uint,address) {
        uint numb = 99; // Unused


        uint time = block.timestamp;

        address sender = msg.sender;
        return (time, sender);
    }
    
}