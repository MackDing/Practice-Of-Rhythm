// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract FunctionModifier {
    address public addr;
    uint public x =10;
    bool public locked; //  default locked = true

    constructor() {
        // Set the transaction sender as the owner of the contract.
        addr = msg.sender;
   } 
        
    modifier onlyOwner() {
        require(msg.sender == addr, "u are not owner!");
        // Underscore is a special character only used inside
        // a function modifier and it tells Solidity to
        // execute the rest of the code.
        _;
    }

    modifier validAddress(address _addr) {
        require(_addr != address(0), "Not valid address");
        _;
    }

    function modifyOwner(address _newOwner) public onlyOwner validAddress(_newOwner) {
        addr = _newOwner;
    }

    // Modifiers can be called before and / or after a function.
    // This modifier prevents a function from being called while
    // it is still executing.  
    modifier noReentrancy() {
        require(!locked, 'no Reentrancy');

        locked = true;
        _;
        locked = false;
    }

    function decrement(uint i) public noReentrancy {
        // The modifiers are executed in order, and if one of them fails, 
        // no code after it will be executed. 
        require(x > i, "x is less than i");
        x -= i;
    }
}