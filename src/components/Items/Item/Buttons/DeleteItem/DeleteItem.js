import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import post from "../../../../../customFunctions/post";

const DeleteItem = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const toast = useToast();

  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  const deleteItem = () => {
    setIsSending(true);

    const data = {
      method: "POST",
      item_id: props.item.id,
    };

    const callBack = (response) => {
      setIsSending(false);

      close();

      toast({
        title: "Item Deleted",
        description: `Item named ${props.item.title} was deleted`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      props.setItems(
        props.items.filter((item) => {
          return item.id !== props.item.id;
        })
      );
    };

    const errorCallBack = (error) => {
      return;
    };

    post(`/api/user/item/delete`, data, callBack, errorCallBack);
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
          size="xs"
          rightIcon={<DeleteIcon />}
          onClick={open}
        >
          Delete Item
        </Button>
      </PopoverTrigger>
      <PopoverContent zIndex={4}>
        <PopoverArrow />
        <PopoverHeader>Cofirm Delete</PopoverHeader>
        <PopoverBody>
          <Flex direction="column">
            <Text>Are you sure you want to delete this item?</Text>
            <Flex>
              <Button
                colorScheme="red"
                size="sm"
                marginRight={2}
                onClick={deleteItem}
                isLoading={isSending}
                isLoadingText="Deleting"
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

export default DeleteItem;
