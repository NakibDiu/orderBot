import { Box, Flex } from "@chakra-ui/react";
import React from "react";

import AddOrder from "./AddOrder/AddOrder";
import CustomMessages from "./CustomMessages/CustomMessages";
import AddCustomMessage from "./AddCustomMessage/AddCustomMessage";
import useLocalState from "../../customHooks/useLocalState";

const Buttons = (props) => {
  const [user] = useLocalState("user", {});

  return (
    <Box
      // position="sticky"
      // top={0}
      // zIndex={3}
      backgroundColor="rgba(255, 255, 255, 0.8)"
    >
      <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
        <AddOrder setOrders={props.setOrders} />
        {user &&
        user.features &&
        user.features
          .map((f) => f.toLowerCase())
          .includes("custom_messaging") ? (
          <>
            <CustomMessages
              messages={props.messages}
              setMessages={props.setMessages}
            />
            <AddCustomMessage setMessages={props.setMessages} />
          </>
        ) : null}
      </Flex>
    </Box>
  );
};

export default Buttons;
