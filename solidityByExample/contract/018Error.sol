// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;




/*
You can throw an error by calling require, revert or assert.

- require is used to validate inputs and conditions before execution.
- revert is similar to require. See the code below for details.
- assert is used to check for code that should never be false. Failing assertion probably means that there is a bug.
*/

contract Error {
    function testRequire(uint _i) public pure {
        // Require should be used to validate conditions such as:
        // - inputs
        // - conditions before execution
        // - return values from calls to other functions
        require(_i > 10,"I mush greated than Ten!");
    }

    function testRevert(uint _i) public pure {
        // Revert is useful when the condition to check is complex.
        // This code does the exact same thing as the example above
        if(_i <= 10){
            revert("I mush greated than Ten!");
        }
    }

    uint public num;
    function testAssert() public view  {
        // Assert should only be used to test for internal errors,
        // and to check invariants.

        // Here we assert that num is always equal to 0
        // since it is impossible to update the value of num
        assert(num == 10);
    } 

    // custom error
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function testCustomError(uint256 _withdrawAmount) public view {
        uint256 bal = address(this).balance;
        if (bal < _withdrawAmount) {
            revert InsufficientBalance({
                balance: bal,
                withdrawAmount: _withdrawAmount
            });
        }
    }
} 

