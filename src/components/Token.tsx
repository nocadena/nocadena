import { Box, Image, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { price } from "../pages/api/coinbasemarketcap";
import { getTokenPrice } from "../util/coinbasemarketcap";
import { UserToken } from "../util/types";
export const Token = ({ token }: { token: UserToken }) => {
  const [price, setPrice] = useState({} as price);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    getTokenPrice(token.name).then((tmp) => {
      setPrice(tmp[0]);
      setLoading(false);
    });
  }, [token.name]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <Box w="100%">
      <Box
        onClick={() => router.push(token.name + "?balance=" + token.amount)}
        flexDir={"row"}
        display="flex"
        marginX="5"
        marginY="5"
        padding="2"
        borderY="1px"
        borderColor={"black"}
        justifyContent={"left"}
        alignItems="center"
      >
        <Box justifyContent={"center"} alignItems="center">
          <Image
            src={token.pic}
            alt="token"
            boxSize="40px"
            mr="25px"
            display={"flex"}
          />
        </Box>
        <Box>
          <Text>
            {token.amount} {token.name}
          </Text>
          <Text>$ {price.priceUSD.toFixed(2)}</Text>
        </Box>
      </Box>
    </Box>
  );
};
