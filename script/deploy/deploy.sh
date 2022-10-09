#!/bin/bash
#tr '\r' '\n' < .env > .env.unix
source .env

node script/helpers/cleanJson.js deployTest.json

mkdir -p ./script/addresses

echo "Deploying on Moonbase"
export CHAINID=1
forge script script/deployModules.s.sol:DeployMasterChain --ffi --rpc-url $MOONBASE_RPC_URL  --private-key $PRIVATE_KEY --broadcast -vvvv 


echo "Deploying on Goerli"
export CHAINID=2
forge script script/deployModules.s.sol:DeploySatelliteChain --ffi --rpc-url $GOERLI_RPC_URL  --private-key $PRIVATE_KEY --broadcast -vvvv


echo "Deploying on Mumbai"
export CHAINID=3
forge script script/deployModules.s.sol:DeploySatelliteChain --ffi --rpc-url $MUMBAI_RPC_URL  --private-key $PRIVATE_KEY --broadcast -vvvv

echo "Deploying on Optimism"
export CHAINID=4
forge script script/deployModules.s.sol:DeploySatelliteChain --ffi --rpc-url $OPTIMISM_RPC_URL  --private-key $PRIVATE_KEY --broadcast -vvvv



echo "Init Communicator on Moonbase"
export CHAINID=1
forge script script/initCommunicator.s.sol:InitCommunicator --ffi  --rpc-url $MOONBASE_RPC_URL  --private-key $PRIVATE_KEY --broadcast -vvvv


echo "Init Communicator on Goerli"
export CHAINID=2
forge script script/initCommunicator.s.sol:InitCommunicator --ffi --rpc-url $GOERLI_RPC_URL  --private-key $PRIVATE_KEY --broadcast -vvvv

echo "Init Communicator on Mumbai"
export CHAINID=3
forge script script/initCommunicator.s.sol:InitCommunicator --ffi --rpc-url $MUMBAI_RPC_URL  --private-key $PRIVATE_KEY --broadcast -vvvv

echo "Deploying on Optimism"
export CHAINID=4
forge script script/deployModules.s.sol:DeploySatelliteChain --ffi --rpc-url $OPTIMISM_RPC_URL  --private-key $PRIVATE_KEY --broadcast -vvvv

