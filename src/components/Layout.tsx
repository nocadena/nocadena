import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      justifyContent="center"
      flex="1"
      display={"flex"}
      backgroundColor="gray"
    >
      <Box
        maxWidth={"430"}
        backgroundColor="white"
        minHeight={400}
        flex="1"
        display="flex"
        justifyContent={"center"}
        flexDirection="row"
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
