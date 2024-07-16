// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;


contract Contants {
        // coding convention to uppercase constant variables
    address public constant MY_ADDRESS = 0x777788889999AaAAbBbbCcccddDdeeeEfFFfCcCc;
    uint256 public constant MY_UINT = 123;
    address public TestAddress;

    function mod() public {
    //    MY_ADDRESS = 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB; // cannot modify
       TestAddress = 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB; // cannot modify

    }
}