import { Box } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import CustomMessage from "./CustomMessage/CustomMessage";

const CustomMessages = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  let messageList = null;

  if (props.messages) {
    messageList = props.messages.map((message) => {
      return (
        <CustomMessage
          key={message.id}
          message={message}
          setMessages={props.setMessages}
        />
      );
    });
  }

  return (
    <Box marginLeft={4} marginTop={2}>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Custom Messages
      </Button>
      <Drawer
        isOpen={isOpen}
        iplacement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent overflowY="scroll">
          <DrawerCloseButton />
          <DrawerHeader>Custom Messages</DrawerHeader>

          <DrawerBody>{messageList}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default CustomMessages;
