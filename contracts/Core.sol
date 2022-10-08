// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;


import "forge-std/Test.sol";

import {noUSDC} from "./tokens/noUSDC.sol";


contract Core {
    // pass on addresses to J

    mapping(address => uint256) usersId;
    mapping(uint256 => (address => uint256)) investedAPWine;
    uint256 countUser;

    IERC20 noUSDC;
    Communicator communicator;


    constructor(address _noUSDC, address _communicator) public {
        noUSDC = IERC20(_noUSDC);
        communicator = Communicator(_communicator);
    }


    function initUserAccount() {
        usersID[msg.sender] = countUser;
        countUser++;
        
        // issue fake tokens to every user account for demonstration purposes
        noUSDC.mint(msg.sender, 100);
    } 
    
    function investAPWine(uint256 amount){
        communicator.send('APwine', amount);

    }

}