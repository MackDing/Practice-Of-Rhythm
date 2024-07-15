// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract MyContract {
    string public myString;

    constructor() {
        myString = "Hello, World!";
    }

    function setMyString(string memory newString) public {
        myString = newString;
    }
}
