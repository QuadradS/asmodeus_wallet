// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "hardhat/console.sol";

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Main is Ownable {

  //Users
  struct UserAccount {
    bytes32 name;
    address wallet;
    int256 amount;
    uint created;
  }

  mapping (address => UserAccount) public users;

  modifier _onlyExists {
    require(users[msg.sender].wallet != address(0), 'Account is not exist');
    _;
  }
  //Users

  UserAccount public ownerAccount;

  constructor(bytes32 name){
    ownerAccount = UserAccount(name, msg.sender, 0, block.timestamp);
  }

  function setUser(bytes32 _name, address _address) public onlyOwner {
    users[_address] = UserAccount(_name, _address, 0, block.timestamp);
  }

  function deposit(int256 amount) public _onlyExists {
    users[msg.sender].amount = users[msg.sender].amount + amount;
  }

  function userBalance(address _address) public view returns(int256) {
    return users[_address].amount;
  }


}
