import { Flex, IconButton, Button, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";

import post from "../../../../../customFunctions/post";
import { DeleteIcon } from "@chakra-ui/icons";

const DeleteCustomMessage = (props) => {
  const [isSending, setIsSending] = useState(false);

  const toast = useToast();

  const deleteItem = () => {
    setIsSending(true);

    const data = {
      custom_message_id: props.message.id,
    };

    const callBack = (response) => {
      setIsSending(false);

      toast({
        title: "Message Deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      props.setMessages((state) =>
        state.filter((message) => {
          return message.id !== props.message.id;
        })
      );
    };

    const errorCallBack = (error) => {
      return;
    };

    post(`/api/user/custom-message/delete`, data, callBack, errorCallBack);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton size="sm" icon={<DeleteIcon />} colorScheme="red" mx={2} />
      </PopoverTrigger>
      <PopoverContent zIndex={40}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Confirm Delete</PopoverHeader>
        <PopoverBody>
          <Flex direction="column">
            <Text>Are you sure you want to delete this message?</Text>
            <Flex>
              <Button
                colorScheme="red"
                size="sm"
                marginRight={2}
                onClick={deleteItem}
                isLoading={isSending}
                isLoadingText="Deleting..."
              >
                Yes
              </Button>
              <Button colorScheme="green" size="sm" onClick={() => {}}>
                No
              </Button>
            </Flex>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default DeleteCustomMessage;
