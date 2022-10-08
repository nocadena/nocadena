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
  return ["tokens"];
}
