import { SafeEventEmitterProvider } from "@web3auth-mpc/base";
import { Web3Auth } from "@web3auth-mpc/web3auth";
import RPC from "./ethers";

export const login = async (web3auth: Web3Auth) => {
  if (!web3auth) {
    console.log("web3auth not initialized yet");
    return;
  }
  console.log("Inside");
  const web3authProvider = await web3auth.connect();
  console.log("After");
  return web3authProvider;
};

export const getUserInfo = async (web3auth: Web3Auth) => {
  if (!web3auth) {
    console.log("web3auth not initialized yet");
    return;
  }
  const user = await web3auth.getUserInfo();
  console.log(user);
};

export const logout = async (web3auth: Web3Auth) => {
  if (!web3auth) {
    console.log("web3auth not initialized yet");
    return;
  }
  await web3auth.logout();
  return null;
};

export const getChainId = async (provider: SafeEventEmitterProvider) => {
  if (!provider) {
    console.log("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  const chainId = await rpc.getChainId();
  console.log(chainId);
};
export const getAccounts = async (provider: SafeEventEmitterProvider) => {
  if (!provider) {
    console.log("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  const address = await rpc.getAccounts();
  console.log("ETH Address: " + address);
};

export const getBalance = async (provider: SafeEventEmitterProvider) => {
  if (!provider) {
    console.log("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  const balance = await rpc.getBalance();
  console.log(balance);
};

export const sendTransaction = async (provider: SafeEventEmitterProvider) => {
  if (!provider) {
    console.log("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  const receipt = await rpc.sendTransaction();
  console.log(receipt);
};

export const signMessage = async (provider: SafeEventEmitterProvider) => {
  if (!provider) {
    console.log("provider not initialized yet");
    return;
  }
  const rpc = new RPC(provider);
  const signedMessage = await rpc.signMessage();
  console.log(signedMessage);
};
