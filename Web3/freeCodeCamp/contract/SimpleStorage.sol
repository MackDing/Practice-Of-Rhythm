// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract SimpleStorage {
    // // boolean, uint, int, address, bytes
    // bool hasFavoriteBool = true;
    // uint256 FavoriteNumber = 5;
    // string favoriteNumberIntText = "Five";
    // int256 favoriteInt = -5;
    // address myAddress = 0x1AC55d145062C48ddda47f1AB2C5b7B0129842d5;
    // bytes32 favoriteBytes = "cat";

    uint256 favoriteNumber;
    uint256 public brothersFavoriteNumber;

    mapping(string => uint256)public nameToFavoriteNumber;

    struct People {
        uint256 favoriteNumber;
        string name;
    }

    // uint256 public favoriteNumberList;
    People[] public people;

    function store(uint256 _favoriteNumber) public  {
        // favoriteNumber = _favoriteNumber + 1;
        favoriteNumber = _favoriteNumber;
    }

    // view pure
    function retrieve() public view returns(uint256) {
        return favoriteNumber;
    }

    // calldata, memory, storage
    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        // people.push(People(_favoriteNumber, _name));
        // People memory newPerson =People({favoriteNumber: _favoriteNumber, name: _name});
        // People memory newPerson =People(_favoriteNumber, _name); 
        // people.push(newPerson);  
        people.push(People(_favoriteNumber, _name));  

        nameToFavoriteNumber[_name] = _favoriteNumber;  
    }

}


    // view, pure
    /*
    状态变量访问：
    view 函数可以读取状态变量，但不能修改。
    pure 函数不能读取或修改状态变量，仅依赖于传入的参数和内部计算。
    
    函数相互调用：
    view 函数可以调用其他 view 和 pure 函数，但不能调用修改状态的函数。
    pure 函数只能调用其他 pure 函数，不能调用 view 或修改状态的函数。
    
    Gas 花费：
    调用 view 和 pure 函数没有Gas花费（调用时为call而不是transaction）。
    一般来说，view 函数内部没有商业逻辑，仅访问状态数据。
    pure 函数一般用于数学运算等逻辑，而不访问链上的状态。
    */

/*
    EVM Overview
    - EVM can access and store information in six places:
    1. Stack
    2. ***Memory
    3. ***CStorage
    4. ***Calldata
    5. Code
    6. Logs
 */   