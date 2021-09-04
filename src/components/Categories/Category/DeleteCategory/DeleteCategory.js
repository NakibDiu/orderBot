import { Flex, IconButton, Button, Text, useToast } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import post from "../../../../customFunctions/post";
import { DeleteIcon } from "@chakra-ui/icons";

const DeleteCategory = (props) => {
  const [isSending, setIsSending] = useState(false);

  const toast = useToast();

  const deleteItem = () => {
    setIsSending(true);

    const data = {
      category_id: props.category.id,
    };

    const callBack = (response) => {
      setIsSending(false);

      toast({
        title: "Category Deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      props.setCategories((state) =>
        state.filter((category) => {
          return category.id !== props.category.id;
        })
      );

      props.setCards((state) =>
        state.filter((card) => {
          return card.category.id !== props.category.id;
        })
      );
    };

    const errorCallBack = (error) => {
      return;
    };

    post(`/api/user/category/delete`, data, callBack, errorCallBack);
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
            <Text>Are you sure you want to delete this category?</Text>
            <Text color="tomato">
              Deleting this category will delete all of it's items!!
            </Text>
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

export default DeleteCategory;
