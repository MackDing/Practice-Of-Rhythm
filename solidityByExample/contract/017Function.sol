// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;


contract Function {

uint public num = 88;

    function returnMany() public pure returns (uint, bool, uint) {
        return (1, true, 22);
    }

    function returnMany1() public view returns (uint x, bool y, uint z) {
        return (num, true, 22);
    }

    function returnMany2() public view returns (uint x, bool y, uint z) {
        x = 22;
        y = true;
        z = num;
    }

    function destructingAssignments() public pure returns(uint, bool, uint, uint, uint) {
        (uint i, bool b, uint j) = returnMany(); // i = 1, b = true, j = 22

        (uint x, , uint y) = (4,5,6);  // x = 4, y = 6

        return (i,b,j,x,y);
    }

    function arrInput(uint[] memory _arr) public {

    }

    uint[] public arr;

    function getarr() public view returns (uint[] memory) {
        return arr;
    }
}