import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";

import post from "../../../../../../customFunctions/post";

const CategoryEditModal = (props) => {
  const [category, setCategory] = useState("");
  const [error, setError] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const [initialCategory, setInitialCategory] = useState(
    props.card.category.id
  );

  const toast = useToast();

  const onClose = () => {
    props.onToggle(false);
  };

  const handleSubmit = () => {
    if (category === "") {
      setError("Please Select A Category");
      return;
    }

    setIsSending(true);

    const data = {
      category_id: category,
      card_id: props.card.id,
    };

    const callBack = (response) => {
      props.setCategory(response.data.category);
      toast({
        title: "Category Editted",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setIsSending(false);
      setInitialCategory(response.data.name);
      onClose();
    };

    const errorCallBack = (error) => {
      return;
    };

    post(`/api/user/card/update`, data, callBack, errorCallBack);
  };

  let categoryOptions = null;

  if (props.categories) {
    categoryOptions = props.categories.map((category) => {
      if (category.id === initialCategory) {
        return;
      }
      return (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      );
    });
  }

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={onClose}
      blockScrollOnMount={false}
      closeOnEsc={true}
      closeOnOverlayClick={true}
      isCentered={true}
      scrollBehavior="inside"
      size="sm"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Category of {props.card.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Select
            placeholder="Select Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categoryOptions}
          </Select>
          {error ? (
            <Text fontSize="sm" fontWeight="semibold" color="tomato">
              {error}
            </Text>
          ) : null}
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            isLoading={isSending}
            isLoadingText="Sending..."
            onClick={handleSubmit}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CategoryEditModal;
