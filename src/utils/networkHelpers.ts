import {
  JsonRpcProvider,
  StaticJsonRpcProvider,
} from "@ethersproject/providers";

import { NetworkId } from "./constants";
export class Environment {
  public static env = process.env;
  private static _get(args: {
    key: string;
    err?: string;
    first: true;
    fallback: string;
  }): string;
  private static _get(args: {
    key: string;
    err?: string;
    first?: never;
    fallback: string;
  }): string[];
  private static _get(args: {
    key: string;
    err?: string;
    first: true;
    fallback?: never;
  }): string | undefined;
  private static _get(args: {
    key: string;
    err?: string;
    first?: never;
    fallback?: never;
  }): string[] | undefined;
  private static _get(args: {
    key: string;
    err?: string;
    first?: boolean;
    fallback?: string;
  }) {
    const value = this.env[args.key] || args.fallback;

    if (!value) console.warn(args.err);

    if (value === undefined) return value;

    return args.first ? value : value.split(" ");
  }
  public static getNodeUrls = (networkId: NetworkId) => {
    switch (networkId) {
      case NetworkId.MAINNET:
        return this._get({
          key: `REACT_APP_ETHEREUM_NODE_URL`,
          fallback:
            "https://eth-mainnet.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
        });
      case NetworkId.TESTNET_RINKEBY:
        return this._get({
          key: `REACT_APP_ETHEREUM_TESTNET_NODE_URL`,
          fallback:
            "https://eth-rinkeby.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
        });
      case NetworkId.ARBITRUM:
        return this._get({
          key: `REACT_APP_ARBITRUM_NODE_URL`,
          fallback:
            "https://arb-mainnet.g.alchemy.com/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
        });
      case NetworkId.ARBITRUM_TESTNET:
        return this._get({
          key: `REACT_APP_ARBITRUM_TESTNET_NODE_URL`,
          fallback:
            "https://arb-rinkeby.g.alchemy.com/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
        });
      case NetworkId.AVALANCHE:
        return this._get({
          key: `REACT_APP_AVALANCHE_NODE_URL`,
          fallback: "https://api.avax.network/ext/bc/C/rpc",
        });
      case NetworkId.AVALANCHE_TESTNET:
        return this._get({
          key: `REACT_APP_AVALANCHE_TESTNET_NODE_URL`,
          fallback: "https://api.avax-test.network/ext/bc/C/rpc",
        });
      case NetworkId.POLYGON:
        return this._get({
          key: `REACT_APP_POLYGON_NODE_URL`,
          fallback:
            "https://polygon-mainnet.g.alchemy.com/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
        });
      case NetworkId.POLYGON_TESTNET:
        return this._get({
          key: `REACT_APP_POLYGON_TESTNET_NODE_URL`,
          fallback:
            "https://polygon-mumbai.g.alchemy.com/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
        });
      case NetworkId.FANTOM:
        return this._get({
          key: `REACT_APP_FANTOM_NODE_URL`,
          fallback: "https://rpc.ftm.tools/",
        });
      case NetworkId.FANTOM_TESTNET:
        return this._get({
          key: `REACT_APP_FANTOM_TESTNET_NODE_URL`,
          fallback: "https://rpc.testnet.fantom.network/",
        });
      case NetworkId.OPTIMISM:
        return this._get({
          key: `REACT_APP_OPTIMISM_NODE_URL`,
          fallback: "https://mainnet.optimism.io/",
        });
      case NetworkId.OPTIMISM_TESTNET:
        return this._get({
          key: `REACT_APP_OPTIMISM_TESTNET_NODE_URL`,
          fallback: "https://kovan.optimism.io/",
        });
      case NetworkId.BOBA:
        return this._get({
          key: `REACT_APP_BOBA_NODE_URL`,
          fallback: "https://mainnet.boba.network	",
        });
      case NetworkId.BOBA_TESTNET:
        return this._get({
          key: `REACT_APP_BOBA_TESTNET_NODE_URL`,
          fallback: "https://rinkeby.boba.network/",
        });
    }
  };
}
export function shorten(str: string) {
  if (str.length < 10) return str;
  return `${str.slice(0, 6)}...${str.slice(str.length - 4)}`;
}

export class Providers {
  private static _providerCache = {} as Record<
    NetworkId,
    StaticJsonRpcProvider
  >;

  /**
   * Returns a provider url for a given network
   */
  public static getProviderUrl(networkId: NetworkId) {
    const [url] = Environment.getNodeUrls(networkId);

    return url;
  }

  /**
   * Returns a static provider for a given network
   */
  public static getStaticProvider(networkId: NetworkId) {
    if (!this._providerCache[networkId])
      this._providerCache[networkId] = new StaticJsonRpcProvider(
        this.getProviderUrl(networkId)
      );

    return this._providerCache[networkId];
  }
}

interface IGetCurrentNetwork {
  provider: StaticJsonRpcProvider | JsonRpcProvider;
}

export const initNetworkFunc = async ({ provider }: IGetCurrentNetwork) => {
  try {
    let networkName: string;
    let uri: string;
    let supported = true;
    const id: number = await provider
      .getNetwork()
      .then((network) => network.chainId);
    switch (id) {
      case 1:
        networkName = "Ethereum";
        uri = Providers.getProviderUrl(id);
        break;
      case 4:
        networkName = "Rinkeby Testnet";
        uri = Providers.getProviderUrl(id);
        break;
      case 42161:
        networkName = "Arbitrum";
        uri = Providers.getProviderUrl(id);
        break;
      case 421611:
        networkName = "Arbitrum Testnet";
        uri = Providers.getProviderUrl(NetworkId.ARBITRUM_TESTNET);
        break;
      case 43113:
        networkName = "Avalanche Fuji Testnet";
        uri = Providers.getProviderUrl(NetworkId.AVALANCHE_TESTNET);
        break;
      case 43114:
        networkName = "Avalanche";
        uri = Providers.getProviderUrl(NetworkId.AVALANCHE);
        break;
      default:
        supported = false;
        networkName = "Unsupported Network";
        uri = "";
        break;
    }

    return {
      networkId: id,
      networkName: networkName,
      uri: uri,
      initialized: supported,
    };
  } catch (e) {
    console.log(e);
    return {
      networkId: -1,
      networkName: "",
      uri: "",
      initialized: false,
    };
  }
};

export const idToHexString = (id: number) => {
  return "0x" + id.toString(16);
};

export const idFromHexString = (hexString: string) => {
  return parseInt(hexString, 16);
};
