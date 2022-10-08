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
import React, { useState, useEffect } from "react";
import { price } from "../pages/api/coinbasemarketcap";
import { getTokenPrice } from "../util/coinbasemarketcap";
import { availableTokens, loadUserTokens, tokens } from "../util/tokens";
import {
  InvestedToken,
  investment,
  investmentDetails,
  UserToken,
} from "../util/types";
import { Token } from "./Token";
export const ActiveInvestment = ({
  investment,
}: {
  investment: investmentDetails;
}) => {
  const [tokens, setTokens] = useState([] as InvestedToken[]);
  useEffect(() => {
    // replace this with real function
    loadUserTokens().then((tokens) =>
      setTokens(
        tokens.map((token) => {
          return { ...token, APY: 0.01, fixed: true };
        })
      )
    );
  }, []);
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
          <Token token={token} key={id} APY={token.APY} fixed={token.fixed} />
        ))}
      </Box>
    </Box>
  );
};
