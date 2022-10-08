// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC20} from "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract noUSDC is IUSX, ERC20 {
    address core;

    constructor(address _core) ERC20("X2 Stablecoin", "USX") {
        core = _core;
        approve(core, 2**256 - 1);
    }

    //modifiers
    modifier onlyCore() {
        require(address(core) == msg.sender);
        _;
    }

    function mint(address user, uint256 amount) external onlyCore {
        _mint(user, amount);
        emit Mint(user, amount);
    }

    function burn(address user, uint256 amount) external onlyCore {
        _burn(user, amount);
        emit Burn(user, amount);
    }
}
