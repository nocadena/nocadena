import { Provider } from "@ethersproject/providers";
import { SafeEventEmitterProvider } from "@web3auth-mpc/base";
import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import InoERC20ABI from "../../out/tokens/InoERC20.sol/InoERC20.json";
import { InoERC20 } from "../../types/ethers-contracts";
import { investmentTokens, tokens } from "./constants";
import RPC from "./ethers";
import { UserToken } from "./types";
export async function loadUserTokens(provider: SafeEventEmitterProvider) {
  const rpc = new RPC(provider);
  const userTokens = await Promise.all(
    tokens.map(async (token) => {
      const tokenContract = new ethers.Contract(
        token.address,
        InoERC20ABI.abi,
        new ethers.providers.Web3Provider(provider)
      ) as InoERC20;
      const address = await rpc.getAccounts();
      console.log("address", address);
      const balance = await tokenContract.balanceOf(address);
      return {
        ...token,
        amount: parseFloat(formatEther(balance)),
      };
    })
  );
  return userTokens.filter((userToken) => userToken.amount > 0);
  //do it later
  // availableTokens.forEach((tokenAddress)=>{
  //     const token = new ethers.Contract(
  //         tokenAddress,
  //         CoreVaultEngineABI.abi,
  //         new JsonRpcProvider(NETWORKS[MASTERCHAINID].rpcUrls[0])
  //       ) as CoreVaultEngine;
  // })
  // return [
  //   {
  //     ...tokens[0],
  //     amount: 1,
  //   },
  // ];
}
export async function loadUserInvestments(provider: SafeEventEmitterProvider) {
  const rpc = new RPC(provider);
  const userTokens = await Promise.all(
    investmentTokens.map(async (token) => {
      const tokenContract = new ethers.Contract(
        token.address,
        InoERC20ABI.abi,
        new ethers.providers.Web3Provider(provider)
      ) as InoERC20;
      console.log("user", rpc.getAccounts());
      const address = await rpc.getAccounts();
      const balance = await tokenContract.balanceOf(address);
      console.log("address", address);
      return {
        ...token,
        amount: parseFloat(formatEther(balance)),
      };
    })
  );
  return userTokens.filter((userToken) => userToken.amount > 0);
}
