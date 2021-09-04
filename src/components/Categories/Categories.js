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

import Category from "./Category/Category";

const Categories = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  let categoryList = null;

  if (props.categories) {
    categoryList = props.categories.map((category) => {
      return (
        <Category
          key={category.id}
          category={category}
          setCategories={props.setCategories}
          setCards={props.setCards}
        />
      );
    });
  }

  return (
    <Box marginLeft={4} marginTop={2}>
      <Button ref={btnRef} colorScheme="blue" onClick={onOpen}>
        Categories
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
          <DrawerHeader>Categories</DrawerHeader>

          <DrawerBody>{categoryList}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Categories;
