// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Satellite} from "./Satellite.sol";
import {console2} from "lib/forge-std/src/console2.sol";

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
    address[] public dstCommunicators;

    function initialize(
        uint16 _chainId,
        uint16 _masterChainId,
        address _satelliteAddress,
        address _hypOutbox,
        uint32[] memory _hypDomainIdentifier,
        address[] memory _dstCommunicators
    ) public {
        console2.log(_chainId);
        console2.log(_masterChainId);
        console2.log(_satelliteAddress);
        //console2.log(_hypOutbox);
        //console2.log(_hypDomainIdentifier);

        chainId = _chainId;
        masterChainId = _masterChainId;
        satelliteAddress = _satelliteAddress;
        hypOutbox = _hypOutbox;
        hypDomainIdentifier = _hypDomainIdentifier;
        dstCommunicators = _dstCommunicators;
    }

    // alignment preserving cast
    function _addressToBytes32(address _addr) internal pure returns (bytes32) {
        return bytes32(uint256(uint160(_addr)));
    }

    function getNc() public returns (uint256) {
        return dstCommunicators.length;
    }

    function send(string memory protocol, uint256 amount) external {
        _sendHyperlane(amount, 2);
    }

    function _sendHyperlane(uint256 amount, uint16 _dstChainId) internal {
        console2.logAddress(hypOutbox);
        console2.logUint(hypDomainIdentifier[_dstChainId - 1]);
        console2.logBytes(abi.encodePacked(amount));

        IOutbox(hypOutbox).dispatch{gas: 1000000}(
            hypDomainIdentifier[_dstChainId - 1],
            _addressToBytes32(dstCommunicators[_dstChainId - 1]), // address of the destination chain satellite
            abi.encodePacked(amount)
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
