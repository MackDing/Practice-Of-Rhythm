// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;


contract ForWhile {
    function ForLoop(uint _x) public pure returns(uint) {
        uint numa = 0;

        for(uint i = 0; i <= _x; i++){
            numa += i;
        }
        return numa;
    }

    function whileLoop() public pure returns (uint) {
        uint x = 255;

        while (x < 256) {
            x++;
            return x; // 直接返回 x+1，因为循环只会运行一次
        }
        return x; // 冗余的返回值以防止编译器警告
    }

    function loop() public pure returns(uint, uint) {
        uint numa = 0;
        for(uint i = 0; i < 10; i++) {
            if (i < 3){
                continue; 
            }if (i > 5){
                break;
            } numa = i;
        uint j = 0;

        while (j < 10) {
            j++;
        }
        return (numa, j);
        }
    }
}