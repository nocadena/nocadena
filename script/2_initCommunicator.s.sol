// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "lib/forge-std/src/Script.sol";
import "./Config.sol";
import "./Getter.sol";
import {Communicator} from "../contracts/Communicator.sol";
import {console2} from "lib/forge-std/src/console2.sol";

contract InitCommunicator is Config, Getter {
    Communicator communicator;

    function run() public {
        //init();
        uint256 chainId = vm.envUint("CHAINID");
        communicator = Communicator(
            getContractAddress(chainId, "communicator")
        );
        console2.logAddress(getContractAddress(chainId, "communicator"));

        address satellite = getContractAddress(chainId, "satellite");
        console2.logAddress(getContractAddress(chainId, "satellite"));

        if (chainId == 1) {
            // in case we are on master chain
            vm.startBroadcast();
            communicator.initializeCore(
                uint16(chainId),
                masterChainId,
                hypOutbox[uint16(chainId) - 1], // outbox on the respective chain
                hypDomainIdentifier // domains per chain
            );
            vm.stopBroadcast();
        } else {
            getSatelliteModuleAddresses();
            vm.startBroadcast();

            communicator.initializeSatellite(
                uint16(chainId),
                masterChainId,
                satellite,
                hypOutbox[uint16(chainId) - 1], // outbox on the respective chain
                hypDomainIdentifier, // domains per chain
                satelliteAddresses
            );
            vm.stopBroadcast();
        }

        for (uint256 i = 0; i < satelliteAddresses.length; i++) {
            console2.logAddress(satelliteAddresses[i]);
        }
        console2.logUint(hypDomainIdentifier.length);
        console2.logUint(satelliteAddresses.length);
    }
}
