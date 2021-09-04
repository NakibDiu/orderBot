import React, { useState, useEffect } from "react";

import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import url from "../../url";
import useLocalState from "../../customHooks/useLocalState";

const Topbar = (props) => {
  const [, setUser] = useLocalState("user", {});

  const logout = () => {
    setUser({});
    window.location.replace("/login");
  };

  return (
    <Box
      width={["100%"]}
      height="65px"
      borderBottom="1px solid #e2e8f0"
      paddingBlock={3}
    >
      <Flex alignItems="center">
        {/* <Box w="19" h="20">
          <Image
            h="100%"
            w="100%"
            marginTop="2px"
            src={`${url}/images/logo.png`}
            marginLeft={[2, 4, 6, 8]}
          />
        </Box> */}
        <img
          src={`${url}/images/logo.png`}
          style={{
            height: 50,
            width: 50,
            marginLeft: "1rem",
            marginTop: "-5px",
          }}
        />
        <Box marginLeft="auto" marginRight={[2, 4, 6, 8]}>
          <Flex alignItems="center">
            {window.location.pathname !== "/dashboard" ? (
              <Link to="/dashboard">
                <Button
                  marginRight={2}
                  style={{ textDecoration: "none" }}
                  colorScheme="green"
                >
                  Dashboard
                </Button>
              </Link>
            ) : null}

            {window.location.pathname !== "/admin" ? (
              <Link to="/admin">
                <Button
                  marginRight={2}
                  style={{ textDecoration: "none" }}
                  colorScheme="green"
                >
                  Admin Panel
                </Button>
              </Link>
            ) : null}

            <Link to="/password-reset">
              <Button
                marginRight={2}
                style={{ textDecoration: "none" }}
              >
                Change Password
              </Button>
            </Link>
            <Button
              as={Link}
              href="https://f8afbaa7e080.ngrok.io/auth/callback"
              marginRight={2}
              style={{ textDecoration: "none" }}
              colorScheme="blue"
            >
              Connect
            </Button>

            <Button colorScheme="red" onClick={logout}>
              Logout
            </Button>
            {/* <Text
                            fontSize={["lg", "lg", "lg", "xl"]}
                            marginRight={[2, 4, 6, 8]}
                            cursor="pointer"
                        >
                            {user.username}
                        </Text> */}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Topbar;
