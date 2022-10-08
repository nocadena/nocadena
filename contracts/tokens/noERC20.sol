// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC20} from "lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

//import {IERC20} from "openzeppelin-contracts/contracts/interfaces/IERC20.sol";

contract noERC20 is ERC20 {
    address core;

    constructor(
        address _core,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        core = _core;
        approve(core, 2**256 - 1);
    }

    //modifiers
    modifier onlyCore() {
        require(address(core) == msg.sender, "Only core");
        _;
    }

    function mint(address user, uint256 amount) external onlyCore {
        _mint(user, amount);
    }

    function burn(address user, uint256 amount) external onlyCore {
        _burn(user, amount);
    }
}
