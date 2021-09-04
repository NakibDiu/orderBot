import {
  Text,
  Box,
  Button,
  FormLabel,
  IconButton,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { EditIcon } from "@chakra-ui/icons";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";

import post from "../../../../../customFunctions/post";
import url from "../../../../../url";

const CardImageEdit = (props) => {
  const { isOpen, onOpen, onToggle } = useDisclosure();
  const [isSending, setIsSending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toast = useToast();

  const onClose = () => {
    onToggle(false);
  };

  const onSubmit = (data) => {
    setIsSending(true);

    const fd = new FormData();
    fd.append("image", data.image[0]);
    fd.append("card_id", props.card.id);

    const callBack = (response) => {
      setIsSending(false);
      onToggle(false);
      toast({
        title: "Image Changed",
        description: "",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      props.setImageSource(`${url}${response.data.image_link}`);

      onClose();
    };

    const errorCallBack = (error) => {
      return;
    };

    post(`/api/user/card/edit-image`, fd, callBack, errorCallBack, true);
  };

  const validateImage = (value) => {
    if (
      value[0].type !== "image/jpeg" &&
      value[0].type !== "image/png" &&
      value[0].type !== "image/jpg"
    ) {
      toast({
        title: "File Format Not Supported",
        description: "Only JPEG and PNG are supported",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return false;
    }

    if (value[0].size > 200000) {
      toast({
        title: "Image Size Too Large",
        description: "Image cannot be more than 2 MB",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return false;
    }

    return true;
  };

  return (
    <>
      <IconButton
        size="sm"
        icon={<EditIcon />}
        position="relative"
        float="right"
        zIndex={2}
        m={2}
        onClick={onOpen}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={false}
        closeOnEsc={true}
        closeOnOverlayClick={true}
        isCentered={true}
        size="sm"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Image of {props.card.name}</ModalHeader>
          <ModalCloseButton />
          <form
            onSubmit={handleSubmit(onSubmit)}
            id="form"
            encType="multipart/form-data"
          >
            <ModalBody>
              <Box>
                <FormLabel htmlFor="image">Image</FormLabel>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  {...register("image", {
                    required: true,
                    validate: validateImage,
                  })}
                />
                {errors.image && errors.image.type === "required" && (
                  <Text fontSize="sm" fontWeight="semibold" color="tomato">
                    This is required
                  </Text>
                )}
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                colorScheme="blue"
                mr={3}
                isLoading={isSending}
                isLoadingText="Sending..."
              >
                Edit
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CardImageEdit;
