// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Communicator {
    uint16 chainId;
    uint16 masterChainId;

    constructor(uint16 _chainId, uint16 _masterChainId) public {
        chainId = _chainId;
        masterChainId = _masterChainId;
    }

    function send(string memory protocol, uint256 amount) external {}

    function _sendHyperlane(uint256 amount) internal {}
}
