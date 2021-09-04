import { EditIcon } from "@chakra-ui/icons";
import { Box, Flex, Text, IconButton, useDisclosure } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

import CategoryEditModal from "./CategoryEditModal/CategoryEditModal";

const CategoryEdit = (props) => {
  const { isOpen, onOpen, onToggle } = useDisclosure();

  return (
    <Box mx={3}>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="lg">Category:</Text>
        <Text fontSize="lg" fontWeight="semibold" textTransform="capitalize">
          {props.category ? props.category.name : ""}
        </Text>
        <IconButton size="sm" icon={<EditIcon />} onClick={onOpen} />
        <CategoryEditModal
          onToggle={onToggle}
          isOpen={isOpen}
          card={props.card}
          categories={props.categories}
          setCategory={props.setCategory}
          card={props.card}
          category={props.category}
        />
      </Flex>
    </Box>
  );
};

export default CategoryEdit;
