source .env

echo "Test sending from master chain"
export CHAINID=1
forge script script/test.s.sol:Test --ffi --rpc-url $MOONBASE_RPC_URL  --private-key $PRIVATE_KEY --broadcast -vvvv 
