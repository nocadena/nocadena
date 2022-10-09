// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Config {
    uint16[] chainIds;

    uint32[] hypDomainIdentifier;
    mapping(uint16 => address) hypOutbox;

    uint16 masterChainId = 1;

    function init() internal {
        // Moonbase
        chainIds.push(1);
        hypDomainIdentifier.push(0x6d6f2d61);
        hypOutbox[0] = 0x54148470292C24345fb828B003461a9444414517;

        // Goerli
        chainIds.push(2);
        hypDomainIdentifier.push(5);
        hypOutbox[1] = 0xDDcFEcF17586D08A5740B7D91735fcCE3dfe3eeD;

        // Mumbai
        chainIds.push(3);
        hypDomainIdentifier.push(80001);
        hypOutbox[2] = 0xe17c37212d785760E8331D4A4395B17b34Ba8cDF;

        // Optimism
        chainIds.push(4);
        hypDomainIdentifier.push(0);
        hypOutbox[3] = address(0);
    }
}
