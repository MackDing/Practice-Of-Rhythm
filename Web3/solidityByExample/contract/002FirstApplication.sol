// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {
    uint256 public count;

    // function to get the current count
    function get() public view returns (uint){
        return count;
    }

    function increment() public {
        count += 1; // count = count + 1
    }

    function decrement() public {
        count -= 1; // count = count - 1
    }
}