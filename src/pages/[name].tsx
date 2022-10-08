import { Box, Button, Heading, Spinner, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { Investment } from "../components/Investment";
import styles from "../styles/Home.module.css";
import { investments } from "../util/investments";

const Assets: NextPage = () => {
  const router = useRouter();
  const { name, balance } = router.query;

  const fittingInvestments = investments.filter(
    (investment) =>
      investment.options.findIndex((option) => option.name == name) > -1
  );
  return (
    <Box flex="1" display="flex" flexDirection={"column"}>
      <Box
        flexDirection={"row"}
        display="flex"
        alignItems={"center"}
        justifyContent="center"
      >
        <Box w="100" minW="75" paddingX="5">
          <Button onClick={() => router.push("/")} variant="ghost">
            Back
          </Button>
        </Box>
        <Box
          flex="1"
          display="flex"
          alignItems="center"
          justifyContent={"center"}
        >
          <Heading>Invest {name}</Heading>
        </Box>
        <Box minW="75"></Box>
      </Box>
      {fittingInvestments.map((investment, key) => (
        <Investment
          investment={investment}
          balance={Number(balance || 0)}
          name={name as string}
          key={key}
        />
      ))}
    </Box>
  );
};

export default Assets;
