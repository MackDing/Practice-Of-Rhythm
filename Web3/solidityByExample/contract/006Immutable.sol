// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;


contract Immutable{
    // coding convention
    address public immutable my_address;
    uint256 public immutable MY_UINT;
    uint public immutable numb;

    constructor(uint256 _myUint) {
        my_address = msg.sender;
        MY_UINT = _myUint;
        numb = 200;
    }
}