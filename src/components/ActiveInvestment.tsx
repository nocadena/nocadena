import {
  Box,
  Button,
  Checkbox,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect, useContext } from "react";
import { price } from "../pages/api/coinbasemarketcap";
import { getTokenPrices } from "../util/coinbasemarketcap";
import { tokens } from "../util/constants";
import { loadUserInvestments, loadUserTokens } from "../util/tokens";
import {
  InvestedToken,
  investment,
  investmentDetails,
  UserToken,
} from "../util/types";
import { Token } from "./Token";
import { Web3AuthContext } from "./Web3AuthProvider";
export const ActiveInvestment = ({
  investment,
}: {
  investment: investmentDetails;
}) => {
  const [tokens, setTokens] = useState([] as InvestedToken[]);
  const authContext = useContext(Web3AuthContext);
  useEffect(() => {
    // replace this with real function
    loadUserInvestments(authContext!.provider!).then((tokens) => {
      getTokenPrices(tokens.map((token) => token.name)).then((tmp: price[]) => {
        setTokens(
          tokens.map((token, index) => {
            return {
              ...token,
              priceUSD:
                tmp.find((tmpPrice) => tmpPrice.name == token.name)?.priceUSD ||
                0,
              APY: 0.01,
              fixed: true,
            };
          })
        );
      });
    });
  }, [authContext]);
  return (
    <Box w="100%">
      <Box
        margin="5px"
        border="1px"
        borderColor={"black"}
        padding="5px"
        display="flex"
        flexDirection={"column"}
      >
        <Box
          flexDirection={"row"}
          display="flex"
          justifyContent={"space-between"}
        >
          <Box flexDirection={"row"} display="flex" alignItems={"center"}>
            <Box
              marginX="10px"
              marginY="10px"
              alignItems="center"
              justifyContent={"center"}
            >
              <Image src={investment.pic} alt="token" boxSize="40px" />
            </Box>
            <Text fontSize={"24px"} fontWeight="bold">
              {investment.title}
            </Text>
          </Box>
        </Box>
        {tokens.map((token, id) => (
          <Token
            token={token}
            key={id}
            APY={token.APY}
            fixed={token.fixed}
            price={token.priceUSD}
          />
        ))}
      </Box>
    </Box>
  );
};
