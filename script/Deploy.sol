// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Communicator} from "../contracts/Communicator.sol";
import {Core} from "../contracts/Core.sol";
import {Satellite} from "../contracts/Satellite.sol";

import {noERC20} from "../contracts/tokens/noERC20.sol";

contract CoreDeploy {
    Core core;
    Communicator communicator;
    Satellite satellite;
    noERC20 nousdc;
    noERC20 noeth;

    function coreDeploy(uint16 _chainId, uint16 _masterChainId)
        internal
        returns (
            address,
            address,
            address,
            address
        )
    {
        communicator = new Communicator();
        core = new Core(address(nousdc), address(communicator));
        nousdc = new noERC20(address(core), "nocadena USDC", "nUSDC");
        noeth = new noERC20(address(core), "nocadena ETH", "nETH");
        return (
            address(communicator),
            address(core),
            address(nousdc),
            address(noeth)
        );
    }
}

contract SatelliteDeploy {
    Communicator communicator;
    Satellite satellite;

    function satelliteDeploy(uint16 _chainId, uint16 _masterChainId)
        internal
        returns (address, address)
    {
        communicator = new Communicator();
        satellite = new Satellite(address(communicator));
        return (address(satellite), address(communicator));
    }
}
