// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;


contract Event {
    // Event declaration
    // Up to 3 parameters can be indexed.
    // Indexed parameters helps you filter the logs by the indexed parameter
    event Log(address indexed sender, string message);
    event AnthorLog();

    function test() public  {
        emit Log(msg.sender, "Hello world!");
     
        emit Log(msg.sender, "Hello world again!");

        emit AnthorLog();

    }
}   