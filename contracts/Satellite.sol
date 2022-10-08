// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import {noUSDC} from "./tokens/noUSDC.sol";
import "apwine/protocol/contracts/interfaces/apwine/IController.sol";
import "apwine/protocol/contracts/interfaces/IERC20.sol";

contract Satellite {
    address internal constant CONTROLLER =
        0x4bA30FA240047c17FC557b8628799068d4396790;
    address internal constant STETH =
        0xae7ab96520de3a18e5e111b5eaab095312d7fe84;
    address internal constant STETH_FUTURE_VAULT =
        0x35bBdC3FBdC26f7DfEe5670aF50B93c7EaBCe2c0;
    uint256 internal constant DEPOSIT_AMOUNT = 1 ether;

    constructor() public {}

    function investApwine() {
        //Lido https://github.com/lidofinance/lido-dao/blob/master/contracts/0.4.24/Lido.sol
        Lido.submit(address(0));

        // taken from https://docs.apwine.fi/dev/
        IERC20(STETH).approve(CONTROLLER, DEPOSIT_AMOUNT);
        IController(CONTROLLER).deposit(STETH_FUTURE_VAULT, DEPOSIT_AMOUNT);
    }
}
