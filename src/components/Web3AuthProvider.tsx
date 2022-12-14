import React, { useState, useEffect } from "react";
import { Web3Auth } from "@web3auth-mpc/web3auth";
import { SafeEventEmitterProvider } from "@web3auth-mpc/base";
import { OpenloginAdapter } from "@web3auth-mpc/openlogin-adapter";
const clientId =
  "BBLzio-vcma_d-Ra8hYxCWOxM0Q9OPiV02ZJh7KM1EX9ulsn3Z6wgDLsdyFtza2hE5GUD_WuS512hCFNoGxsMIY";
export type Web3AuthContextData = {
  web3auth: Web3Auth | null;
  provider: SafeEventEmitterProvider | null;
  setWeb3auth: React.Dispatch<React.SetStateAction<Web3Auth | null>>;
  setProvider: React.Dispatch<
    React.SetStateAction<SafeEventEmitterProvider | null>
  >;
} | null;

export const Web3AuthContext = React.createContext<Web3AuthContextData>(null);

export const Web3AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  useEffect(() => {
    const init = async () => {
      const imports = await import("torus-mpc");
      try {
        console.log("test");
        const web3auth = new Web3Auth({
          clientId,
          uiConfig: {
            appLogo: "https://images.web3auth.io/web3auth-logo-w.svg",
            theme: "light",
            loginMethodsOrder: ["twitter", "google"],
          },
          chainConfig: {
            chainNamespace: "eip155",
            chainId: "0x507",
            rpcTarget: "https://rpc.api.moonbase.moonbeam.network",
            displayName: "Moonbeam Alpha",
            blockExplorer:
              "https://moonbase-blockscout.testnet.moonbeam.network/",
            ticker: "DVR",
            tickerName: "Moonbase Alpa",
          },
          enableLogging: true,
        });
        (window as any).web3auth = web3auth;
        console.log("test2");
        const openloginAdapter = new OpenloginAdapter({
          loginSettings: {
            mfaLevel: "mandatory",
          },
          tssSettings: {
            useTSS: true,
            tssGetPublic: imports.tssGetPublic,
            tssSign: imports.tssSign,
            tssDataCallback: imports.tssDataCallback,
          },
          adapterSettings: {
            _iframeUrl: "https://mpc-beta.openlogin.com",
            network: "development",
            clientId,
          },
        });

        console.log("test3");
        (window as any).openloginAdapter = openloginAdapter;
        console.log("test4");
        web3auth.configureAdapter(openloginAdapter);
        await web3auth.initModal({
          modalConfig: {
            "torus-evm": {
              label: "Torus Wallet",
              showOnModal: false,
            },
            metamask: {
              label: "Metamask",
              showOnModal: false,
            },
            "wallet-connect-v1": {
              label: "Wallet Connect",
              showOnModal: false,
            },
          },
        });
        console.log("test5");
        setWeb3auth(web3auth);

        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    init();
  }, []);
  return (
    <Web3AuthContext.Provider
      value={{ web3auth, provider, setWeb3auth, setProvider }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
};
