export const availableTokens = ["0x000000", "0x000000"];
export async function loadUserTokens() {
  //do it later
  // availableTokens.forEach((tokenAddress)=>{
  //     const token = new ethers.Contract(
  //         tokenAddress,
  //         CoreVaultEngineABI.abi,
  //         new JsonRpcProvider(NETWORKS[MASTERCHAINID].rpcUrls[0])
  //       ) as CoreVaultEngine;
  // })
  return [
    {
      ...tokens[0],
      amount: 1,
    },
  ];
}
export const tokens = [
  {
    name: "USDC",
    address: "AA",
    pic: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
  },
];
