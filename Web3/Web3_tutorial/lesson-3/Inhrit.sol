// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// contract Parent {
//     uint256 public a;  // public private internal external
//     uint256 private b =10;
//     function addOne() public {
//         a++;
//     }

// }

// contract Chile {
//     uint256 public a;
//     function addOne() public {
//         a++;
//     }
//     function addTwo() public {
//         a += 2;
//     }
// }

// contract Chile is Parent {
//     function addTwo() public {
//         a += 2;
//     }
// }

// ERC20: Fungible Token
// ERC721: NFT Non-Fungible Token


abstract contract Parent {
    uint256 public a;  // public private internal external
    function addOne() public {
        a++;
    }
    function addTwo() public  virtual ;
}

contract Chile is Parent {
    function addTwo() public override {
         a+=2;
    }
}