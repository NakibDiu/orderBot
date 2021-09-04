import { ChatIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Text,
  IconButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

import SendMessageModal from "./SendMessageModal/SendMessageModal";

const SendMessage = (props) => {
  const { isOpen, onOpen, onToggle } = useDisclosure();

  return (
    <Box mx={3}>
      <Flex justifyContent="space-between" alignItems="center">
        <Button
          colorScheme="blue"
          marginRight={2}
          size="sm"
          variant="outline"
          leftIcon={<ChatIcon />}
          onClick={onOpen}
          marginBottom={2}
        >
          Message
        </Button>
        <SendMessageModal
          order={props.order}
          messages={props.messages}
          onToggle={onToggle}
          isOpen={isOpen}
        />
      </Flex>
    </Box>
  );
};

export default SendMessage;
