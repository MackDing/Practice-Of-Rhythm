// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Array {
    uint[] public arr; 

    uint[] public arr1 = [1, 2 , 3, 4, 5];

    uint[10] public fixArray;

    function get(uint _index) public view returns (uint) {
        return arr1[_index];
    }

    // Solidity can return the entire array.
    // But this function should be avoided for
    // arrays that can grow indefinitely in length.
    function getArr() public view returns (uint256[] memory) {
        return arr1;
    }

    function getArray() public view returns (uint[10] memory) {
        return fixArray;
    }

    function pushArr(uint _i) public {
        arr.push(_i);
    }

    function pushArr1(uint _i) public {
        arr1.push(_i);
    }

    function getLenth() public view returns (uint) {
        return arr1.length;
    }

    // cannot push to fixArray
    // function pushTest(uint _i) public {
    //     fixArray.push(_i);
    // }

    function pop() public {
        arr1.pop();
    }

    function remove(uint _index) public {
        delete arr1[_index];
    }

    // function examples() pure external {
    //      // create array in memory, only fixed size can be created
    //     uint[] memory a = new uint[](5);
    // }

    // function examples1() external {
    //     // create array in memory, only fixed size can be created
    //     uint256[] memory a = new uint256[](5);
    // }
}