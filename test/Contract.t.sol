// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "lib/forge-std/src/Test.sol";
import {console2} from "lib/forge-std/src/console2.sol";
import {Communicator} from "../contracts/Communicator.sol";
import {Core} from "../contracts/Core.sol";
import {Satellite} from "../contracts/Satellite.sol";

import {noERC20} from "../contracts/tokens/noERC20.sol";

contract ContractTest is Test {
    Core core;
    Communicator communicator;
    Satellite satellite;
    noERC20 nousdc;
    noERC20 noeth;
    uint16[] chainIds;

    uint32[] hypDomainIdentifier;
    mapping(uint16 => address) hypOutbox;
    address[] satelliteFake;

    function setUp() public {
        communicator = new Communicator();
        chainIds.push(1);
        hypDomainIdentifier.push(0x6d6f2d61);
        hypOutbox[0] = 0x54148470292C24345fb828B003461a9444414517;
        chainIds.push(2);
        hypDomainIdentifier.push(80001);
        hypOutbox[1] = 0xe17c37212d785760E8331D4A4395B17b34Ba8cDF;

        satelliteFake.push(address(0));
        satelliteFake.push(address(0));

        core = new Core();
        nousdc = new noERC20(address(core), "nocadena USDC", "nUSDC");
        noeth = new noERC20(address(core), "nocadena ETH", "nETH");
        core.initialize(
            address(nousdc),
            address(noeth),
            address(0),
            address(communicator)
        );
        communicator.initialize(
            1,
            1,
            address(0),
            hypOutbox[uint16(1) - 1], // outbox on the respective chain
            hypDomainIdentifier, // domains per chain,
            satelliteFake
        );
    }

    function test1() public {
        console2.logAddress(address(this));
        core.initUserAccount();
        core.investAPWineETH(0.1 ether);

        console2.logUint(core.getBalance("ETH", address(this)));
    }
}
