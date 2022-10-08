import "forge-std/Script.sol";
import "./Config.sol";

// /// @dev See the Solidity Scripting tutorial: https://book.getfoundry.sh/tutorials/solidity-scripting
contract Getter is Script, Config {
    address[] satelliteAddresses;

    function getContractAddress(uint256 chainId, string memory name)
        internal
        returns (address)
    {
        string[] memory inputs = new string[](5);
        inputs[0] = "node";
        inputs[1] = "script/helpers/readJson.js";
        inputs[2] = "deployTest.json";
        inputs[3] = vm.toString(chainId);
        inputs[4] = name;
        bytes memory _add = vm.ffi(inputs);
        address addr;
        assembly {
            addr := mload(add(_add, 20))
        }
        return addr;
    }

    function getSatelliteModuleAddresses() internal {
        for (uint256 i = 0; i < chainIds.length; i++) {
            string[] memory inputs = new string[](5);
            inputs[0] = "node";
            inputs[1] = "script/helpers/readJson.js";
            inputs[2] = "deployTest.json";
            inputs[3] = vm.toString(chainIds[i]);
            inputs[4] = "satellite";
            bytes memory _add = vm.ffi(inputs);
            address addr;
            assembly {
                addr := mload(add(_add, 20))
            }
            satelliteAddresses.push(addr);
        }
    }
}
