import { Box, Image, Spinner, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { price } from "../pages/api/coinbasemarketcap";
import { UserToken } from "../util/types";
export const Token = ({
  token,
  price,
  APY,
  fixed,
}: {
  token: UserToken;
  price: number;
  APY?: number;
  fixed?: boolean;
}) => {
  const router = useRouter();
  return (
    <Box w="100%">
      <Box
        onClick={() => router.push(token.name + "?balance=" + token.amount)}
        flexDir={"row"}
        display="flex"
        marginX="5"
        marginY="1"
        padding="2"
        borderY="1px"
        borderColor={"black"}
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Box flexDir={"row"} display="flex">
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
            <Text>$ {(price * token.amount).toFixed(2)}</Text>
          </Box>
        </Box>
        <Box flexDir={"row"} display="flex">
          <Text>{APY ? (fixed ? "fixed APY: " : "variable APY") : ""}</Text>
          <Text marginX="5px">{APY ? APY * 100 + "%" : ""}</Text>
        </Box>
      </Box>
    </Box>
  );
};
