// get core on chain one, submit test
//

import "./Getter.sol";
import {Core} from "../contracts/Core.sol";
import {Communicator} from "../contracts/Communicator.sol";

contract Test is Getter {
    function run() public {
        address core = getContractAddress(1, "core");
        address communicator = getContractAddress(2, "communicator");
        //console2.logUint(Communicator(communicator).getNc());

        vm.startBroadcast();

        Core(core).initUserAccount();
        Core(core).investAPWineETH(0.1 ether);
        vm.stopBroadcast();

        console2.logUint(Core(core).getBalance("ETH", address(this)));
    }
}
