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
    uint256 amount;
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

  function deposit() payable public _onlyExists {
    require(msg.value > 0, 'not a negative balance');
    users[msg.sender].amount += msg.value;
  }

  function userBalance(address _address) public view returns(uint256) {
    return users[_address].amount;
  }

  function transfer(address _to, uint256 _amount) public _onlyExists {
    require(_to != address(0), 'Not null address');
    require(users[msg.sender].amount >= _amount, 'Not enough amount');

    users[_to].amount += _amount;
    users[msg.sender].amount -= _amount;
  }

  function withdraw() payable public _onlyExists {
    require(users[msg.sender].amount >= msg.value, 'Not enough amount');
    // require(_to != address(0), 'Non zero account for withdraw');
    users[msg.sender].amount -= msg.value;
    payable(msg.sender).transfer(msg.value);
  }
}
