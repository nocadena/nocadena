// get core on chain one, submit test
//

import "./Getter.sol";
import {Core} from "../contracts/Core.sol";

contract Test is Getter {
    function run() public {
        address core = getContractAddress(1, "core");
        vm.startBroadcast();

        Core(core).initUserAccount();
        Core(core).investAPWineETH(0.1 ether);
        vm.stopBroadcast();

        console2.logUint(Core(core).getBalance("ETH", address(this)));
    }
}
