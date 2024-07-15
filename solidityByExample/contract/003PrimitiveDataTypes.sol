// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;


contract Primittives {
    bool public boo = true; // init default: false

 /*
    uint stands for unsigned integer, meaning non negative integers
    different sizes are available
        uint8   ranges from 0 to 2 ** 8 - 1
        uint16  ranges from 0 to 2 ** 16 - 1
        ...
        uint256 ranges from 0 to 2 ** 256 - 1
*/

    uint8 public u8 = 1;

    uint16 public numa = 65535; // uint = Non-negative integers

    uint public numb = 2 ** 256 - 1; 

    int8 public numi = -128;

    int public numj = 2 ** 255-1;

    address public addr = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
    
    uint public x;

    bytes1 public a = 0x9b;
}