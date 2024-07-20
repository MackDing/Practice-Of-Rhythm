// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;


contract SimpleStorage {
    uint favoriteNumber;

    struct People{
        uint age;
        string name;
    }

    People[] public person;

    function store(uint _favoriteNumber) public  {
        favoriteNumber = _favoriteNumber;
    }

    function retrieve() public  view returns(uint) {
        return favoriteNumber;
    }

    // memory && calldata
    function addPerson(uint _age, string memory _name) public  {
        person.push(People({age: _age, name: _name}));
    }
}