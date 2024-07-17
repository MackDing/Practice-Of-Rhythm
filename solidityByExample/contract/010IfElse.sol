// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract IfElse {
    function foo(uint x) public pure returns(uint) {
        if (x < 5) {
            return 0;
        } else if (x < 10) {
        return 1;
        } else {
            return 2;}
        }

    function ternary(uint _x) public pure  returns(uint) {
        // _x < 5 ? 0 : 1 && _x < 10 ? 1 : 2
        return (_x < 5) ? 0 : (_x < 10) ? 1 : 2;
        }
}