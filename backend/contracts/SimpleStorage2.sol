// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.18;

/**
 * @title SimpleStorage2
 * @dev Store & retrieve value in a variable
 */
contract SimpleStorage2 {
    uint256 public number;

    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function store(uint256 num) public {
        number = num;
    }

    /**
     * @dev Return value
     * @return value of 'number'
     */
    function retrieve() public view returns (uint256) {
        return number;
    }
}
