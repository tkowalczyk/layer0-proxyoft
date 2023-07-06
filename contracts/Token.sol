// SPDX-License-Identifier: LIC
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor() ERC20("CryptoDev", "cDEV") {
        _mint(msg.sender, 1337 * 10 ** decimals());
    }
}