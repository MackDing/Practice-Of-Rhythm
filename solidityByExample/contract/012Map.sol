// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Mapping {
    // formula: mapping(keyType => valueType) 
    // keyType: string, booleans, address, bytes, or other contract
    // valueType: multiple types of variables, another mapping or an array

    mapping (address => uint) public myMap;

    function getByAdd(address _addr) public view returns (uint){
        // Mapping always returns a value.
        // If the value was never set, it will return the default value.
         return myMap[_addr];
    }

    function set(address _addr, uint256 _i ) public {
        // Update the value at this address
        myMap[_addr] = _i;
    }
}