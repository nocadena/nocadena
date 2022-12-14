import {
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  Icon,
  IconButton,
  Spinner,
  Text,
  Toast,
} from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { MdVerticalAlignBottom, MdSend, MdTimer } from "react-icons/md";
import { loadInvestmentGroups, loadUserTokens } from "../util/tokens";
import { investmentDetails, price, UserToken } from "../util/types";
import { Token } from "../components/Token";
import { Web3AuthContext } from "../components/Web3AuthProvider";
import { getUserInfo, login } from "../util/web3Auth";
import { ActiveInvestment } from "../components/ActiveInvestment";
import Logo from "../../public/logo";
import { ethers } from "ethers";
import { CORE_ADDRESS } from "../util/constants";
import coreABI from "../../out/contracts/Core.sol/Core.json";
import { Core } from "../../types/ethers-contracts";
import RPC from "../util/ethers";
import { formatEther } from "ethers/lib/utils";
import * as ripio from "@ripio/sdk";
import { getTokenPrices } from "../util/coinbasemarketcap";
import { cursorTo } from "readline";
import { toast } from "react-toastify";
//https://react-icons.github.io/react-icons/icons?name=md
const Home: NextPage = () => {
  console.log("reload");
  const authContext = useContext(Web3AuthContext);
  const [activeInvestments, setActiveInvestments] = useState(
    [] as investmentDetails[]
  );
  const [tokens, setTokens] = useState([] as UserToken[]);
  const [loading, setLoading] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);
  const LoggedInScreen = () => {
    return (
      <Box
        flex="1"
        display="flex"
        flexDirection={"column"}
        alignItems={"center"}
        marginTop="10"
      >
        <Box flexDirection={"row"}>
          <Heading>Assets</Heading>
        </Box>
        {!loading ? (
          <>
            <Box flexDirection={"row"}>
              $
              {tokens
                .reduce((prev, cur) => {
                  console.log("priceuSd", cur.priceUSD);
                  return prev + cur.amount * cur.priceUSD;
                }, 0)
                .toFixed(2)}
            </Box>
            <HStack spacing="5px" marginTop="5" marginBottom={"5"}>
              <Box flexDirection={"column"} width="20" textAlign={"center"}>
                <IconButton
                  variant="outline"
                  aria-label="Receive"
                  icon={<MdVerticalAlignBottom />}
                />
                <Text>Receive</Text>
              </Box>
              <Box flexDirection={"column"} width="20" textAlign={"center"}>
                <IconButton
                  variant="outline"
                  aria-label="Send"
                  icon={<MdSend />}
                />
                <Text>Send</Text>
              </Box>
              <Box flexDirection={"column"} width="20" textAlign={"center"}>
                <IconButton
                  variant="outline"
                  aria-label="History"
                  icon={<MdTimer />}
                />
                <Text>History</Text>
              </Box>
            </HStack>
            <Divider orientation="horizontal" />
            <Heading>My wallet</Heading>
            {tokens.map((token, id) => (
              <Token token={token} key={id} price={token.priceUSD} />
            ))}
            <Divider orientation="horizontal" />
            <Heading>Investments</Heading>
            {activeInvestments.map((investment, id) => (
              <ActiveInvestment investment={investment} key={id} />
            ))}
          </>
        ) : (
          <Spinner />
        )}
      </Box>
    );
  };
  useEffect(() => {
    // load tokens of user
    if (authContext && authContext.provider) {
      loadUserTokens(authContext.provider!).then((tokens) => {
        console.log("grbz3");
        getTokenPrices(tokens.map((token) => token.name)).then(
          (tmp: price[]) => {
            setTokens(
              tokens.map((token, index) => {
                return {
                  ...token,
                  priceUSD:
                    tmp.find((tmpPrice) => tmpPrice.name == token.name)
                      ?.priceUSD || 0,
                };
              })
            );
            setLoading(false);
          }
        );
      });
      loadInvestmentGroups(authContext.provider!).then((groups) =>
        setActiveInvestments(groups)
      );
    }
  }, [authContext]);
  useEffect(() => {
    if (!loggingIn && authContext && authContext.provider) {
      setLoggingIn(true);
      const tokenContract = new ethers.Contract(
        CORE_ADDRESS,
        coreABI.abi,
        new ethers.providers.Web3Provider(authContext!.provider!).getSigner()
      ) as Core;
      console.log(
        "user address",
        new RPC(authContext!.provider!).getAccounts()
      );
      //new ripio.JsonRPCWeb3Connector()
      console.log("chainid", new RPC(authContext!.provider!).getChainId());
      new RPC(authContext!.provider!).getAccounts().then((address) => {
        tokenContract.usersId(address).then((existingUserId) => {
          console.log("alex", parseFloat(formatEther(existingUserId)));
          if (parseFloat(formatEther(existingUserId)) == 0) {
            console.log("alex123", loggingIn);
            tokenContract.initUserAccount().then(() => {
              console.log("alex4");
            });
          }
        });
      });
    }
  }, [authContext, authContext?.provider, loggingIn]);
  if (!authContext) return <Spinner />;
  else if (!authContext.provider)
    return (
      <Box
        display="flex"
        flex="1"
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={"column"}
      >
        <Logo height={50} />
        <Button
          marginTop="30px"
          isLoading={!authContext.web3auth}
          onClick={() =>
            login(authContext.web3auth!).then((provider) =>
              authContext.setProvider(provider!)
            )
          }
        >
          {authContext.web3auth ? "Login" : "Loading..."}
        </Button>
      </Box>
    );
  else {
    return <LoggedInScreen />;
  }
};

export default Home;

// import { useEffect, useState } from "react";
// import { SafeEventEmitterProvider } from "@web3auth-mpc/base";
// import RPC from "./web3RPC"; // for using web3.js

// // MPC stuff
// import { Web3Auth } from "@web3auth-mpc/web3auth";
// import { OpenloginAdapter } from "@web3auth-mpc/openlogin-adapter";

// const clientId =
//   "BBP_6GOu3EJGGws9yd8wY_xFT0jZIWmiLMpqrEMx36jlM61K9XRnNLnnvEtGpF-RhXJDGMJjL-I-wTi13RcBBOo"; // get from https://dashboard.web3auth.io

// function App() {
//   const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
//   const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
//     null
//   );
//   const [tssDataCallback, settssDataCallback] = useState({} as any);
//   const [tssGetPublic, settssGetPublic] = useState({} as any);
//   const [tssSign, settssSign] = useState({} as any);
//   const [generatePrecompute, setgeneratePrecompute] = useState({} as any);
//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     const initTerminal = async () => {
//       const imports = await import("torus-mpc");
//       settssDataCallback(() => imports.tssDataCallback);
//       settssGetPublic(() => imports.tssGetPublic);
//       settssSign(() => imports.tssSign);
//       setgeneratePrecompute(() => imports.generatePrecompute);
//     };

//     initTerminal().then(() => setLoading(false));
//   }, []);
//   useEffect(() => {
//     const initEthAuth = async () => {
//       try {
//         const web3auth = new Web3Auth({
//           clientId,
//           uiConfig: {
//             appLogo: "https://images.web3auth.io/web3auth-logo-w.svg",
//             theme: "light",
//             loginMethodsOrder: ["twitter", "google"],
//           },
//           chainConfig: {
//             chainNamespace: "eip155",
//             chainId: "0x5",
//             rpcTarget: "https://rpc.ankr.com/eth_goerli",
//             displayName: "Goerli Testnet",
//             blockExplorer: "https://goerli.etherscan.io/",
//             ticker: "ETH",
//             tickerName: "Ethereum",
//           },
//           enableLogging: true,
//         });

//         const openloginAdapter = new OpenloginAdapter({
//           loginSettings: {
//             mfaLevel: "mandatory",
//           },
//           tssSettings: {
//             useTSS: true,
//             tssGetPublic,
//             tssSign,
//             tssDataCallback,
//           },
//           adapterSettings: {
//             _iframeUrl: "https://mpc-beta.openlogin.com",
//             network: "development",
//             clientId,
//           },
//         });

//         web3auth.configureAdapter(openloginAdapter);
//         await web3auth.initModal({
//           modalConfig: {
//             "torus-evm": {
//               label: "Torus Wallet",
//               showOnModal: false,
//             },
//             metamask: {
//               label: "Metamask",
//               showOnModal: false,
//             },
//             "wallet-connect-v1": {
//               label: "Wallet Connect",
//               showOnModal: false,
//             },
//           },
//         });
//         setWeb3auth(web3auth);

//         if (web3auth.provider) {
//           setProvider(web3auth.provider);
//         }
//       } catch (error) {
//         console.log("error", error);
//       }
//     };
//     if (!loading) initEthAuth();
//   }, [loading]);

//   const login = async () => {
//     if (!web3auth) {
//       uiConsole("web3auth not initialized yet");
//       return;
//     }
//     const web3authProvider = await web3auth.connect();
//     setProvider(web3authProvider);
//     generatePrecompute(); // <-- So one precompute would be available to your users.
//   };

//   const getUserInfo = async () => {
//     if (!web3auth) {
//       uiConsole("web3auth not initialized yet");
//       return;
//     }
//     const user = await web3auth.getUserInfo();
//     uiConsole(user);
//   };

//   const logout = async () => {
//     if (!web3auth) {
//       uiConsole("web3auth not initialized yet");
//       return;
//     }
//     await web3auth.logout();
//     setProvider(null);
//   };

//   const getChainId = async () => {
//     if (!provider) {
//       uiConsole("provider not initialized yet");
//       return;
//     }
//     const rpc = new RPC(provider);
//     const chainId = await rpc.getChainId();
//     uiConsole(chainId);
//   };
//   const getAccounts = async () => {
//     if (!provider) {
//       uiConsole("provider not initialized yet");
//       return;
//     }
//     const rpc = new RPC(provider);
//     const address = await rpc.getAccounts();
//     uiConsole("ETH Address: " + address);
//   };

//   const getBalance = async () => {
//     if (!provider) {
//       uiConsole("provider not initialized yet");
//       return;
//     }
//     const rpc = new RPC(provider);
//     const balance = await rpc.getBalance();
//     uiConsole(balance);
//   };

//   const signTransaction = async () => {
//     if (!provider) {
//       uiConsole("provider not initialized yet");
//       return;
//     }
//     const rpc = new RPC(provider);
//     const receipt = await rpc.signTransaction();
//     uiConsole(receipt);
//   };

//   const sendTransaction = async () => {
//     if (!provider) {
//       uiConsole("provider not initialized yet");
//       return;
//     }
//     const rpc = new RPC(provider);
//     const receipt = await rpc.sendTransaction();
//     uiConsole(receipt);
//   };

//   const signMessage = async () => {
//     if (!provider) {
//       uiConsole("provider not initialized yet");
//       return;
//     }
//     const rpc = new RPC(provider);
//     const signedMessage = await rpc.signMessage();
//     uiConsole(signedMessage);
//   };

//   function uiConsole(...args: any[]): void {
//     const el = document.querySelector("#console>p");
//     if (el) {
//       el.innerHTML = JSON.stringify(args || {}, null, 2);
//     }
//   }

//   const loggedInView = (
//     <>
//       <div>
//         <div>
//           <button onClick={generatePrecompute}>Generate Precompute</button>
//         </div>
//         <div>
//           <button onClick={getUserInfo}>Get User Info</button>
//         </div>
//         <div>
//           <button onClick={getChainId}>Get Chain ID</button>
//         </div>
//         <div>
//           <button onClick={getAccounts}>Get Accounts</button>
//         </div>
//         <div>
//           <button onClick={getBalance}>Get Balance</button>
//         </div>
//         <div>
//           <button onClick={signMessage}>Sign Message</button>
//         </div>
//         <div>
//           <button onClick={signTransaction}>Sign Transaction</button>
//         </div>
//         <div>
//           <button onClick={sendTransaction}>Send Transaction</button>
//         </div>
//         <div>
//           <button onClick={logout}>Log Out</button>
//         </div>
//       </div>
//       <div id="console" style={{ whiteSpace: "pre-line" }}>
//         <p style={{ whiteSpace: "pre-line" }}></p>
//       </div>
//     </>
//   );

//   const unloggedInView = (
//     <button disabled={!web3auth} onClick={login}>
//       {web3auth ? "Login" : "Loading..."}
//     </button>
//   );

//   return (
//     <div>
//       <h1>
//         <a target="_blank" href="http://web3auth.io/" rel="noreferrer">
//           Web3Auth{" "}
//         </a>
//         MPC & ReactJS Example
//       </h1>

//       <div>{provider ? loggedInView : unloggedInView}</div>

//       <footer>
//         <a
//           href="https://github.com/shahbaz17/w3a-ts-demo"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Source code
//         </a>
//       </footer>
//     </div>
//   );
// }

// export default App;
