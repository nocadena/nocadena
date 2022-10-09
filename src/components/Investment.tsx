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
import { CORE_ADDRESS, tokens } from "../util/constants";
import { investment, UserToken } from "../util/types";
import { Web3AuthContext } from "./Web3AuthProvider";
import RPC from "../util/ethers";
import { ethers } from "ethers";
import coreABI from "../../out/contracts/Core.sol/Core.json";
import { Core } from "../../types/ethers-contracts";
import { getTokenPrices } from "../util/coinbasemarketcap";
export const Investment = ({
  investment,
  balance,
  name,
}: {
  investment: investment;
  balance: number;
  name: string;
}) => {
  const authContext = useContext(Web3AuthContext);
  const [price, setPrice] = useState({ name: name, priceUSD: 0 } as price);
  const [amount, setAmount] = useState(undefined as number | undefined);
  const [lockInterest, setLockInterest] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getTokenPrices([name]).then((tmp: price[]) => {
      setPrice(tmp[0]);
      setLoading(false);
    });
  }, []);
  async function invest() {
    const tokenContract = new ethers.Contract(
      CORE_ADDRESS,
      coreABI.abi,
      new ethers.providers.Web3Provider(authContext!.provider!).getSigner()
    ) as Core;
    new RPC(authContext!.provider!).getAccounts().then((address) => {
      tokenContract.usersId(address).then((existingUserId) => {
        //do something
      });
    });
  }
  return (
    <Box margin="5px" border="1px" borderColor={"black"} padding="5px">
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
        <Box flexDirection={"row"} display="flex" alignItems={"center"}>
          <Text>Historic APY:</Text>
          <Text marginX="5px" fontWeight={"bold"}>
            {investment.options.filter((option) => option.name == name)[0].APY *
              100}
            %
          </Text>
        </Box>
      </Box>
      <Box>{investment.desc}</Box>
      <Box marginY="5px" alignItems="center" justifyContent={"center"}>
        <InputGroup
          height="50px"
          justifyContent={"center"}
          alignItems="center"
          display="flex"
        >
          <Input
            type="number"
            placeholder="0.0"
            height="50px"
            onChange={(event) => {
              setAmount(Number(event.target.value));
            }}
            value={amount}
          />
          <InputRightElement
            // eslint-disable-next-line react/no-children-prop
            children={
              <Image
                src={tokens.filter((token) => token.name == name)[0].pic}
                alt="token"
                boxSize="40px"
                marginTop="10px"
                marginRight="10px"
                display={"flex"}
              />
            }
          />
        </InputGroup>
        <Box
          flexDir={"row"}
          justifyContent="space-between"
          display="flex"
          marginX="5px"
        >
          <Text>$ {(price.priceUSD * (amount || 0)).toFixed(4)} </Text>
          <Text>Available Balance: {balance}</Text>
        </Box>
        <Box flexDirection="row" display="flex">
          <Text marginX="5px">Current variable APY:</Text>
          <Text fontWeight="bold">0.9%</Text>
        </Box>
        <Box
          flexDirection="row"
          display="flex"
          border="1px"
          padding="3px"
          borderColor={"grey"}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Box alignItems="center" justifyContent={"center"}>
            <Image
              src={"https://avatars.githubusercontent.com/u/69766511?s=200&v=4"}
              alt="token"
              boxSize="30px"
            />
          </Box>
          Lock this interest rate at 0.8% until Dec 2022
          <Checkbox
            checked={lockInterest}
            onChange={(event) => {
              setLockInterest(Boolean(event.target.value));
            }}
          />
        </Box>
        <Button
          onClick={() => {
            invest();
          }}
          disabled={!amount || amount > balance || amount == 0}
          w="100%"
          marginTop="10px"
        >
          {!amount || amount <= balance ? "Invest" : "Insufficient Balance"}
        </Button>
      </Box>
    </Box>
  );
};
