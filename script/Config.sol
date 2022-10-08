// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Config {
    uint16[] chainIds;

    uint32[] hypDomainIdentifier;
    mapping(uint16 => address) hypOutbox;

    uint16 masterChainId = 2;

    function init() internal {
        // Moonbase
        chainIds.push(0);
        hypDomainIdentifier.push(0x6d6f2d61);
        hypOutbox[0] = 0x54148470292C24345fb828B003461a9444414517;

        // Mumbai
        chainIds.push(1);
        hypDomainIdentifier.push(80001);
        hypOutbox[1] = 0xe17c37212d785760E8331D4A4395B17b34Ba8cDF;

        //TODO add optimism
    }
}
