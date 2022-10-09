// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "lib/forge-std/src/Test.sol";

import {noERC20} from "./tokens/noERC20.sol";
import {IERC20} from "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {ILido} from "./ILido.sol";

import "./apwine/protocol/contracts/interfaces/apwine/IController.sol";
import "./apwine/protocol/contracts/interfaces/IERC20.sol";

contract Satellite {
    address internal constant CONTROLLER =
        0x4bA30FA240047c17FC557b8628799068d4396790;
    address internal constant STETH =
        0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6;
    address internal constant STETH_FUTURE_VAULT =
        address(0xccaff2a8f34f3b294715487cb62144f90eab84de);

    //address internal constant AAVE_LENDING_POOL_MUMBAI = address(0);
    //address internal constant DAI_MUMBAI = address(0);

    address internal constant LIDO_GOERLI =
        0x1643E812aE58766192Cf7D2Cf9567dF2C37e9B7F;

    address communicator;
    mapping(address => uint256) public aaveDepositedDai;

    event InvestedLido(uint256);

    constructor(address _communicator) public {
        communicator = _communicator;
        //IERC20(DAI_MUMBAI).approve(address(AAVE_LENDING_POOL_MUMBAI),type(uint256).max);
    }

    function investLido(uint256 amount) public {
        ILido(LIDO_GOERLI).submit{value: amount}(address(0));
        emit InvestedLido(amount);
    }

    function investApwine(uint256 amount) public {
        investLido(amount);
        IERC20(STETH).approve(CONTROLLER, amount);
        IController(CONTROLLER).deposit(STETH_FUTURE_VAULT, amount);
    }

    fallback() external payable {}
}
