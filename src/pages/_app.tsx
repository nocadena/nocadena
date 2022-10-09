import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, LightMode } from "@chakra-ui/react";
import theme from "../theme/theme";
import Layout from "../components/Layout";
import { Web3AuthProvider } from "../components/Web3AuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Web3AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Web3AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
