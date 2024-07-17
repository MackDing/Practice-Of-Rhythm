// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Gas {
    uint256 public i = 0;
    // Transaction Cost (in wei) = Gas Limit × Gas Price
    // Using up all of the gas that you send causes your transaction to fail.
    // State changes are undone.
    // Gas spent are not refunded.
    function forever() public {
        // Here we run a loop until all of the gas are spent
        // and the transaction fails
        while (true) {
            i += 1;
        }
    }
}

/*
Gas 的目的
防止欺诈：

防止恶意用户在网络上提交需要大量计算资源的复杂操作（例如，错误循环或递归）来攻击网络。
激励矿工：

通过 Gas 费用来激励矿工处理和验证交易并将其打包到区块中。
资源管理：

保证每个交易对网络资源（包括计算能力和存储）的消耗是有上限的，防止网络资源被滥用。
*/


/*
以太坊优化
理解和优化 Gas 消耗对智能合约开发者来说非常重要，因为这直接影响交易成本和用户体验。优化 Gas 消耗的方法包括但不限于：

减少不必要的计算。
优化数据存储和读取。
使用合适的数据类型。
*/


/*
Gas 的详细计算
每个以太坊操作都有固定的 Gas 消耗使得它们可以被明确地计量。以下是典型的一些操作及其 Gas 消耗：

基本操作：

加法、减法等操作：3 Gas
乘法、除法等操作：5 Gas
调用智能合约：700 直接 Gas + 内部逻辑所需 Gas
存储和读取：

写入存储：20,000 Gas
修改存储：5,000 Gas
读取存储：200 Gas
交易操作：

发送 ETH：21,000 Gas
*/