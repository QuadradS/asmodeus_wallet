// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "hardhat/console.sol";

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Main is Ownable {
  //Users
  struct UserAccount {
    string name;
    address wallet;
  }

  mapping (address => UserAccount) public users;
  //Users

  UserAccount public ownerAccount;

  constructor(string memory name){
    ownerAccount = UserAccount(name, msg.sender);
  }

  function setUser(string memory _name, address _address) public onlyOwner {
    users[_address] = UserAccount(_name, _address);
  }


}
