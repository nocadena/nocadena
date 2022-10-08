// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "lib/forge-std/src/Test.sol";

import {noERC20} from "./tokens/noERC20.sol";

//import "apwine/protocol/contracts/interfaces/apwine/IController.sol";
//import "apwine/protocol/contracts/interfaces/IERC20.sol";

contract Satellite {
    // address internal constant CONTROLLER =
    //     0x4bA30FA240047c17FC557b8628799068d4396790;
    // address internal constant STETH =
    //     0xae7ab96520de3a18e5e111b5eaab095312d7fe84;
    // address internal constant STETH_FUTURE_VAULT =
    //     0x35bBdC3FBdC26f7DfEe5670aF50B93c7EaBCe2c0;
    // uint256 internal constant DEPOSIT_AMOUNT = 1 ether;

    address communicator;

    constructor(address _communicator) public {
        communicator = _communicator;
    }

    function investApwine(uint256 amount) public {
        //Lido https://github.com/lidofinance/lido-dao/blob/master/contracts/0.4.24/Lido.sol
        //Lido.submit(address(0));
        // taken from https://docs.apwine.fi/dev/
        //IERC20(STETH).approve(CONTROLLER, DEPOSIT_AMOUNT);
        //IController(CONTROLLER).deposit(STETH_FUTURE_VAULT, DEPOSIT_AMOUNT);
    }
}
