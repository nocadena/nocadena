// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "./Config.sol";
import "openzeppelin-contracts/contracts/proxy/transparent/ProxyAdmin.sol";
import "openzeppelin-contracts/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";

import "./Getter.sol";

contract InitCommunicator is Config, Getter {
    Communicator communicator;

    function run() public {
        //init();
        uint256 chainId = vm.envUint("CHAINID");
        communicator = Communicator(
            getContractAddress(chainId, "communicator")
        );

        address satellite = getContractAddress(chainId, "satellite");

        getSatelliteModuleAddresses();

        vm.startBroadcast();

        communicator.initialize(
            uint16(chainId),
            masterChainId,
            satellite,
            hypOutbox[chainId], // outbox on the respective chain
            hypDomainIdentifier, // domains per chain
            satelliteAddresses
        );
        vm.stopBroadcast();
    }
}
