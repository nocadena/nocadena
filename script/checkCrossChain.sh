
source .env

export contractSatellite="0x53a1301f3649949405672021679b1279ad763655"
export contractCore="0xaaf4b546ea698e795bd860a502fb27eb2fb7cac9" 


#fund wallet
cast send --rpc-url $GOERLI_RPC_URL --private-key $PRIVATE_KEY  --value 100000000000 $contractSatellite

#initiate cross chain comm
#cast send --rpc-url $MOONBASE_RPC_URL --private-key $PRIVATE_KEY $contractCore "initUserAccount()"
#cast send --rpc-url $MOONBASE_RPC_URL --private-key $PRIVATE_KEY $contractCore "investAPWineETH(uint256)" 50

