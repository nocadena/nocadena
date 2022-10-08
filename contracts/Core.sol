// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "lib/forge-std/src/Test.sol";
import {IERC20} from "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {Communicator} from "../contracts/Communicator.sol";

import {noERC20} from "./tokens/noERC20.sol";
import {InoERC20} from "./tokens/InoERC20.sol";

contract Core {
    // pass on addresses to J

    mapping(address => uint256) usersId;
    mapping(uint256 => mapping(address => uint256)) investedAPWine;
    uint256 countUser;

    InoERC20 noUSDC;
    Communicator communicator;

    constructor(address _noUSDC, address _communicator) public {
        noUSDC = InoERC20(_noUSDC);
        communicator = Communicator(_communicator);
    }

    function initUserAccount() public {
        usersId[msg.sender] = countUser;
        countUser++;

        // issue fake tokens to every user account for demonstration purposes
        noUSDC.mint(msg.sender, 100);
    }

    function investAPWineETH(uint256 amount) public {
        require(noUSDC.balanceOf(msg.sender) >= amount);
        noUSDC.burn(msg.sender, amount);
        communicator.send("APwine", amount);
    }
}
