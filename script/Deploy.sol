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
    noERC20 apeth;

    function coreDeploy(uint16 _chainId, uint16 _masterChainId)
        internal
        returns (
            address,
            address,
            address,
            address,
            address
        )
    {
        core = new Core();
        communicator = new Communicator();
        nousdc = new noERC20(address(core), "nocadena USDC", "nUSDC");
        noeth = new noERC20(address(core), "nocadena ETH", "nETH");
        apeth = new noERC20(address(core), "apwine ETH", "apETH");

        core.initialize(
            address(nousdc),
            address(noeth),
            address(apeth),
            address(communicator)
        );

        return (
            address(communicator),
            address(core),
            address(nousdc),
            address(noeth),
            address(apeth)
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
