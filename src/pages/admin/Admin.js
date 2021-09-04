import React from "react";

import { Box, Text } from "@chakra-ui/react";

import Topbar from "../../layout/Topbar/Topbar";
import Cards from "../../components/Cards/Cards";
import useLocalState from "../../customHooks/useLocalState";

const Admin = (props) => {
  const [user] = useLocalState("user", {});

  return (
    <>
      <Topbar />
      <Box width="100%" minHeight="100vh" padding={[2, 4, 6, 8]}>
        <Text
          textAlign="center"
          fontSize="3xl"
          fontWeight="bold"
          marginBottom={2}
        >
          {user?.business_name}
        </Text>
        <Cards />
      </Box>
    </>
  );
};

export default Admin;
