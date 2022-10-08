import {
  Box,
  Divider,
  Heading,
  HStack,
  Icon,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { MdVerticalAlignBottom, MdSend, MdTimer } from "react-icons/md";
import { loadUserTokens } from "../util/tokens";
import { UserToken } from "../util/types";
import { Token } from "../components/Token";
//https://react-icons.github.io/react-icons/icons?name=md
const Home: NextPage = () => {
  const [tokens, setTokens] = useState([] as UserToken[]);
  useEffect(() => {
    //load tokens of user
    // loadUserTokens().then((tokens)=>
    // setTokens(tokens)
    // ));
  }, []);
  return (
    <Box flex="1" display="flex" flexDirection={"column"} alignItems={"center"}>
      <Box flexDirection={"row"}>
        <Heading>Assets</Heading>
      </Box>
      <Box flexDirection={"row"}>SUM money here</Box>
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
          <IconButton variant="outline" aria-label="Send" icon={<MdSend />} />
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
      <Heading>My wallet</Heading>
      <Box>
        {tokens.map((token, id) => (
          <Token token={token} key={id} />
        ))}
      </Box>
    </Box>
  );
};

export default Home;
