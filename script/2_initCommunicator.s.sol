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
        init();
        uint256 chainId = vm.envUint("CHAINID");
        communicator = Communicator(
            getContractAddress(chainId, "communicator")
        );
        console2.logAddress(getContractAddress(chainId, "communicator"));

        address satellite = getContractAddress(chainId, "satellite");
        console2.logAddress(getContractAddress(chainId, "satellite"));

        getSatelliteModuleAddresses();

        console2.logUint(123456789);
        console2.logUint(satelliteAddresses.length);
        vm.startBroadcast();

        communicator.initialize(
            uint16(chainId),
            masterChainId,
            satellite,
            hypOutbox[uint16(chainId) - 1], // outbox on the respective chain
            hypDomainIdentifier, // domains per chain
            satelliteAddresses
        );
        vm.stopBroadcast();

        console2.logUint(hypDomainIdentifier.length);
        console2.logUint(satelliteAddresses.length);
    }
}
