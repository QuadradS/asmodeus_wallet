// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Main is Ownable {

  string public _testVar = 'str1';

  function testFn() public onlyOwner returns (string memory) {
    _testVar = 'str2';
    return 'test';
  }
}
