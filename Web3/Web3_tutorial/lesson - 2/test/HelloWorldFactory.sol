//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import { HelloWorld } from "./test.sol";

// 1. 直接引入合约文件或者文件下的合约
// 2. 引入 GitHub 上的合约
// 3. 包引入

contract HelloWorldFactory {
    HelloWorld hw; 

    HelloWorld[] hws;

    function createHelloWorld() public {
        hw = new HelloWorld();
        hws.push(hw);
    }

    function getHelloWorldByIndex(uint256 _index) 
        public 
        view 
        returns (HelloWorld) {
            return hws [_index];
    }
    
    function callSayHelloFromFactory(uint256 _index, uint256 _id) 
        public
        view returns (string memory) {
            return hws [_index].sayHello(_id);
    }

    function callSetHelloWorldFromFactory(uint256 _index, uint256 _id, string memory newSrting) 
        public {
        hws[_index].setHelloWorld(newSrting, _id);
    }
}