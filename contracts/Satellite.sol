// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "lib/forge-std/src/Test.sol";

import {noERC20} from "./tokens/noERC20.sol";
//import {IERC20} from "lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {ILido} from "./ILido.sol";

import "./apwine/protocol/contracts/interfaces/apwine/IController.sol";
import "./apwine/protocol/contracts/interfaces/apwine/IFutureVault.sol";

contract Satellite {
    address internal constant CONTROLLER =
        0xA30C48BAE2a1E326bc71Ce1B00823c7f0Ab62237;
    address internal constant STETH =
        0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6;
    address internal constant STETH_FUTURE_VAULT =
        address(0xCCAFf2A8F34F3B294715487cb62144f90EAB84dE);

    //address internal constant AAVE_LENDING_POOL_MUMBAI = address(0);
    //address internal constant DAI_MUMBAI = address(0);

    address internal constant LIDO_GOERLI =
        0x1643E812aE58766192Cf7D2Cf9567dF2C37e9B7F;

    address communicator;
    mapping(address => uint256) public aaveDepositedDai;

    event InvestedLido(uint256);

    constructor(address _communicator) public {
        communicator = _communicator;
    }

    function investLido(uint256 amount) public {
        ILido(LIDO_GOERLI).submit{value: amount}(address(0));
        emit InvestedLido(amount);
    }

    function investApwine(uint256 amount) public {
        uint256 amountFake; // we have to do this so we can demo our product as we have not enough eth in our contract
        amountFake = 1000000;

        investLido(amountFake);
        IERC20(LIDO_GOERLI).approve(CONTROLLER, 1000000);
        IController(CONTROLLER).deposit(STETH_FUTURE_VAULT, uint256(700000));
    }

    function getInvestedLido() public returns (uint256) {
        return IERC20(LIDO_GOERLI).balanceOf(address(this));
    }

    function getInvestedApwine() public view returns (uint256) {
        return
            IERC20(IFutureVault(STETH_FUTURE_VAULT).getIBTAddress()).balanceOf(
                address(this)
            );
    }

    fallback() external payable {}
}
