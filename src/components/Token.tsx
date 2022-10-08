import { Box, Image, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { getTokenPrice } from "../util/coinbasemarketcap";
import { UserToken } from "../util/types";
export const Token = ({ token }: { token: UserToken }) => {
  const [price, setPrice] = useState();
  useEffect(() => {
    getTokenPrice(token.name).then((tmp) => setPrice(tmp));
  }, [token.name]);
  return (
    <Box>
      <Box>
        <Image src={token.pic} alt="token" />
      </Box>
      <Box>
        <Text>
          {token.amount} {token.name}
        </Text>
        <Text>$ {price}</Text>
      </Box>
    </Box>
  );
};
