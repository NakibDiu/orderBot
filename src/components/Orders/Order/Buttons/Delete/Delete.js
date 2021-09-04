import { Button, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
} from "@chakra-ui/react";
import post from "../../../../../customFunctions/post";
import { DeleteIcon } from "@chakra-ui/icons";

const Delete = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  const handleClick = () => {
    setIsLoading(true);

    const data = {
      order_id: props.order.id,
    };

    const callBack = (response) => {
      if (response.data === "deleted") {
        props.setIsDeleted(true);
        setIsLoading(false);
        close();
        props.setOrders((state) => {
          return state.filter((o) => o.id !== props.order.id);
        });
      }
    };

    const errorCallBack = (error) => {};

    post(`/api/user/order/delete`, data, callBack, errorCallBack);
  };
  return (
    <Popover
      returnFocusOnClose={false}
      isOpen={isOpen}
      onClose={close}
      placement="right"
    >
      <PopoverTrigger>
        <Button
          colorScheme="red"
          marginRight={2}
          size="sm"
          leftIcon={<DeleteIcon />}
          marginBottom={2}
          onClick={open}
        >
          {props.isDeleted ? "Deleted" : "Delete"}
        </Button>
      </PopoverTrigger>
      <PopoverContent zIndex={4}>
        <PopoverArrow />
        <PopoverHeader>Cofirm Delete</PopoverHeader>
        <PopoverBody>
          <Flex direction="column">
            <Text>Are you sure you want to delete this order?</Text>
            <Flex>
              <Button
                colorScheme="red"
                size="sm"
                marginRight={2}
                isLoading={isLoading}
                isLoadingText="Deleting..."
                onClick={handleClick}
              >
                Yes
              </Button>
              <Button colorScheme="green" size="sm" onClick={close}>
                No
              </Button>
            </Flex>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Delete;
