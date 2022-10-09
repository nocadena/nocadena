
source .env

export contractSatellite="0x4a4ce9930469763cb97603d24cb88dd6d7a102e6"
export contractCore="0x5e9da23ca7abb102cff923a27f08f6eabedfbc4b" 


#fund wallet
#cast send --rpc-url $GOERLI_RPC_URL --private-key $PRIVATE_KEY  --value 10000000 $contractCore

#initiate cross chain comm
cast send --rpc-url $MOONBASE_RPC_URL --private-key $PRIVATE_KEY $contractCore "initUserAccount()"
cast send --rpc-url $MOONBASE_RPC_URL --private-key $PRIVATE_KEY $contractCore "investAPWineETH(uint256)" 50

