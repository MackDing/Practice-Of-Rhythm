// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract SimpleStorage {
    uint public numa;
    
    function set(uint _numa) public {
        numa = _numa;
    }

    function get() public view returns(uint) {
        return numa;
    }
}