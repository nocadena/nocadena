// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "lib/forge-std/src/Script.sol";
import {console2} from "lib/forge-std/src/console2.sol";
import {CoreDeploy, SatelliteDeploy} from "./Deploy.sol";

import "./Config.sol";

import "./Deploy.sol";

//import {Helpers} from "../../../src/helpers/Helpers.sol";

contract DeployMasterChain is Script, CoreDeploy {
    function run() public {
        uint256 chainId = vm.envUint("CHAINID");
        vm.startBroadcast();
        (
            address communicator,
            address core,
            address nousdc,
            address noeth
        ) = coreDeploy(uint16((chainId)), 1); // masterchain id
        vm.stopBroadcast();

        string[] memory inputs = new string[](12);
        inputs[0] = "node";
        inputs[1] = "script/helpers/writeToJson.js";
        inputs[2] = "deployTest.json";
        inputs[3] = vm.toString(chainId);

        inputs[4] = "core";
        inputs[5] = vm.toString(core);
        inputs[6] = "communicator";
        inputs[7] = vm.toString(communicator);
        inputs[8] = "nousdc";
        inputs[9] = vm.toString(nousdc);
        inputs[10] = "noeth";
        inputs[11] = vm.toString(noeth);
        vm.ffi(inputs);
    }
}

contract DeploySatelliteChain is Script, SatelliteDeploy {
    function run() public {
        uint256 chainId = vm.envUint("CHAINID");
        vm.startBroadcast();
        (address satellite, address communicator) = satelliteDeploy(
            uint16(chainId),
            1 // masterchain id
        );
        vm.stopBroadcast();

        string[] memory inputs = new string[](16);
        inputs[0] = "node";
        inputs[1] = "script/helpers/writeToJson.js";
        inputs[2] = "deployTest.json";
        inputs[3] = vm.toString(chainId);
        inputs[4] = "satellite";
        inputs[5] = vm.toString(satellite);
        inputs[4] = "communicator";
        inputs[5] = vm.toString(communicator);
        vm.ffi(inputs);
    }
}
