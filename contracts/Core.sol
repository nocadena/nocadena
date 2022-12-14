// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "lib/forge-std/src/Test.sol";
import {console2} from "lib/forge-std/src/console2.sol";

import {IERC20} from "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {Communicator} from "../contracts/Communicator.sol";

import {noERC20} from "./tokens/noERC20.sol";
import {InoERC20} from "./tokens/InoERC20.sol";

contract Core {
    // pass on addresses to J

    mapping(address => uint256) public usersId;
    mapping(uint256 => mapping(address => uint256)) public investedAPWine;
    uint256 public countUser;

    InoERC20 noUSDC;
    InoERC20 noETH;
    InoERC20 apETH;

    Communicator communicator;

    function initialize(
        address _noUSDC,
        address _noETH,
        address _apETH,
        //address _anoETH,
        address _communicator
    ) public {
        noUSDC = InoERC20(_noUSDC);
        noETH = InoERC20(_noETH);
        apETH = InoERC20(_apETH);

        //aaveNoUSDC = InoERC20(_noUSDC);
        //aaveNoETH = InoERC20(_noETH);

        communicator = Communicator(_communicator);
    }

    // TODO reset function

    function initUserAccount() public {
        console2.logAddress(address(this));
        usersId[msg.sender] = countUser;
        countUser++;

        // issue fake tokens to every user account for demonstration purposes
        noUSDC.mint(msg.sender, 100 ether);
        noETH.mint(msg.sender, 2 ether);
    }

    function investAPWineETH(uint256 amount) public {
        require(noETH.balanceOf(msg.sender) >= amount, "not enough funds");
        noETH.burn(msg.sender, amount);
        apETH.mint(msg.sender, amount);
        communicator.send("APwine", amount);
    }

    function getBalance(string memory asset, address user)
        public
        returns (uint256)
    {
        if (keccak256(bytes(asset)) == keccak256(bytes("ETH"))) {
            return noUSDC.balanceOf(user);
        } else {
            return noETH.balanceOf(user);
        }
    }
}
