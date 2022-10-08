// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IERC20} from "lib/openzeppelin-contracts/contracts/interfaces/IERC20.sol";

interface InoERC20 is IERC20 {
    function mint(address user, uint256 amount) external;

    function burn(address user, uint256 amount) external;
}
