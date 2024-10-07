// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// account 1: 0x1AC55d145062C48ddda47f1AB2C5b7B0129842d5 
// account 2: 0x555112d0546DC584d622D708549f5dC146e3e122 

/*
0x5B38Da6a701c568545dCfcB03FcB875f56beddC4, 18
0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2, 28
0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db, 38
*/

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

    function deleteNum(address _add) public {
        // reset the value to the defailt value
        delete myMap[_add];
    }
}

contract NestMapping {
    // 0x583031D1113aD414F02576BD6afaBfb302140225,0,true
    // 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db,1,false
    // 0x0A098Eda01Ce92ff4A4CCb7A4fFFb5A43EBC70DC,2,true

    // Nested mapping (mapping from address to another mapping)
    mapping (address => mapping(uint => bool)) public nestedMapping;

    function getNestMapping(address _add, uint _num) public view returns (bool) {
        // can get calues from a nested mapping
        // even when it is not initialized
        return nestedMapping[_add][_num];
    }
    
    function setNestMapping(address _add, uint _num, bool _boo) public {
        nestedMapping[_add][_num] = _boo;
    }

    function deleteNestMapping (address _add, uint _num) public {
        delete nestedMapping[_add][_num];
    }
}