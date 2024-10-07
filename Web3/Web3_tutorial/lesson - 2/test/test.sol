// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// struct: 结构体 --将不同类型的数据存储在一起
// array: 数组   --将相同类型的数据存储在一起
// mapping: 映射 --存储为key, value

/*
1. storage
2. memory
3. calldata
4. stack
5. codes
6. logs
*/

contract HelloWorld {
    bool boolVar = true;
    // uint = uint256
    // 1byte = 8bit
    // bytes !== bytes32

    int256 intVar = -1;
    address addVar = 0x1AC55d145062C48ddda47f1AB2C5b7B0129842d5;
    string strVar = "Hello world"; 
    struct Info {
        string phrase;
        uint256 id;
        address addr;
    }

    Info[] infos;

    mapping (uint256 id => Info info) infoMapping;

    function sayHello(uint256 _id) public view returns(string memory) {
        if (infoMapping[_id].addr == address(0x0)){
            return addInfo(strVar);
        } else {
            return addInfo(infoMapping[_id].phrase);
        }
   
        // infoMapping[_id].phrase;
        // for(uint256 i = 0; i < infos.length; i++) {
        //     if(infos[i].id == _id) {
        //        return addInfo((infos[i].phrase));
        //     }
        // }
        // return addInfo(strVar);
        }

    function setHelloWorld(string memory newString, uint256 _id) public {
        strVar = newString;
        Info memory info = Info(newString,_id, msg.sender);
        infos.push(info);
    }

    function addInfo(string memory helloWorldStr) internal pure returns(string memory) {
        return string.concat(helloWorldStr,"from Mack's contract");   
    }
}



