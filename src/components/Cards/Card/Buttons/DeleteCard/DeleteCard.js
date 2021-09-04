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
import React, { useState } from "react";

import post from "../../../../../customFunctions/post";

const DeleteCard = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const toast = useToast();

  const open = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  const deleteCard = () => {
    setIsSending(true);

    const callBack = (response) => {
      setIsSending(false);

      close();

      toast({
        title: "Card Deleted",
        // description: `Card named ${props.card.title} was deleted`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });

      props.setCards(
        props.cards.filter((card) => {
          return card.id !== props.card.id;
        })
      );
    };

    const errorCallBack = () => {
      return;
    };

    const data = {
      method: "POST",
      card_id: props.card.id,
    };

    post(`/api/user/card/delete`, data, callBack, errorCallBack);
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
          size="sm"
          rightIcon={<DeleteIcon />}
          onClick={open}
          title="Delete Card"
          marginRight={3}
        >
          Delete Card
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
                onClick={deleteCard}
                isLoading={isSending}
                isLoadingText="Deleting..."
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

export default DeleteCard;
