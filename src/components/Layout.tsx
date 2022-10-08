import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box>
      <main>{children}</main>
    </Box>
  );
};

export default Layout;
