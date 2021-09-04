import { Box, Flex, useDisclosure } from "@chakra-ui/react";
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
  Stack,
  FormLabel,
  Input,
  Textarea,
  Text,
  useToast,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";

import useLocalState from "../../../customHooks/useLocalState";
import post from "../../../customFunctions/post";
import { AddIcon } from "@chakra-ui/icons";

const AddCustomMessage = (props) => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const firstField = React.useRef();
  const btnRef = React.useRef();

  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [user] = useLocalState("user", {});

  const onSubmit = (data) => {
    // // console.log(data);

    setIsSubmitting(true);

    // additional authorization
    if (
      !user?.features?.map((f) => f.toLowerCase()).includes("custom_messaging")
    ) {
      return;
    }

    const payloadData = {
      message: data.message,
    };

    const callBack = (response) => {
      setIsSubmitting(false);

      // checking if name already exists
      if (response.data.message === "already_exists") {
        toast({
          title: "Message Already Exists",
          description: "",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        return;
      }

      props.setMessages((state) => {
        let messages = [...state];
        messages.unshift(response.data);
        return messages;
      });

      onToggle(false);
      toast({
        title: "Message Added",
        description: "",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    };

    const errorCallBack = (error) => {
      return;
    };

    post(
      `/api/user/custom-message/store`,
      payloadData,
      callBack,
      errorCallBack
    );
  };

  return (
    <>
      <Button
        ref={btnRef}
        leftIcon={<AddIcon />}
        colorScheme="teal"
        variant="outline"
        onClick={onOpen}
        marginLeft={4}
        marginTop={2}
      >
        Create Custom Message
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        finalFocusRef={btnRef}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Create a new message
          </DrawerHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <DrawerBody>
              <Box>
                <FormLabel htmlFor="message">Message</FormLabel>
                <Input
                  ref={register("message", {
                    required: true,
                  })}
                  id="message"
                  name="message"
                  placeholder="Message"
                />
                {errors.message && errors.message.type === "required" && (
                  <Text fontSize="sm" fontWeight="semibold" color="tomato">
                    This is required
                  </Text>
                )}
              </Box>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                type="submit"
                isLoading={isSubmitting}
                loadingText="Adding Category"
              >
                Add
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddCustomMessage;
