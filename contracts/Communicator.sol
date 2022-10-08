// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Satellite} from "./Satellite.sol";

interface IOutbox {
    function dispatch(
        uint32 _destinationDomain,
        bytes32 _recipientAddress,
        bytes calldata _messageBody
    ) external returns (uint256);
}

interface IMessageRecipient {
    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _messageBody
    ) external;
}

contract Communicator is IMessageRecipient {
    uint16 chainId;
    uint16 masterChainId;
    address satelliteAddress;
    address hypOutbox;
    uint32[] hypDomainIdentifier;
    address[] dstSatellites;

    function initialize(
        uint16 _chainId,
        uint16 _masterChainId,
        address _satelliteAddress,
        address _hypOutbox,
        uint32[] memory _hypDomainIdentifier,
        address[] memory _dstSatellites
    ) public {
        chainId = _chainId;
        masterChainId = _masterChainId;
        satelliteAddress = _satelliteAddress;
        hypOutbox = _hypOutbox;
        hypDomainIdentifier = _hypDomainIdentifier;
        dstSatellites = _dstSatellites;
    }

    // alignment preserving cast
    function _addressToBytes32(address _addr) internal pure returns (bytes32) {
        return bytes32(uint256(uint160(_addr)));
    }

    function send(string memory protocol, uint256 amount) external {}

    function _sendHyperlane(uint256 amount, uint16 _dstChainId) internal {
        IOutbox(hypOutbox).dispatch(
            hypDomainIdentifier[_dstChainId],
            _addressToBytes32(dstSatellites[_dstChainId]), // address of the destination chain satellite
            bytes(abi.encodePacked(amount))
        );
    }

    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes memory _messageBody
    ) external {
        uint256 amount;
        assembly {
            amount := mload(add(_messageBody, 20))
        }
        Satellite(satelliteAddress).investApwine(amount);
    }
}
