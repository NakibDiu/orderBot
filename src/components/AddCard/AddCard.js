import { Box, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
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

import Categories from "./Categories/Categories";
import useLocalState from "../../customHooks/useLocalState";
import post from "../../customFunctions/post";
import { AddIcon } from "@chakra-ui/icons";

const AddCard = (props) => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const firstField = React.useRef();
  const btnRef = React.useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();

  const [user] = useLocalState("user", {});

  const onSubmit = (data) => {
    setIsSubmitting(true);

    const fd = new FormData();
    fd.append("image", data.image[0]);
    fd.append("type", "POST");
    fd.append("contentType", false);
    fd.append("processData", false);
    fd.append("name", data.name);
    fd.append("about", data.about);
    fd.append("price", data.price);

    // checking if user has category feature
    if (user?.features?.map((f) => f.toLowerCase()).includes("category")) {
      fd.append("category_id", data.category);
    }

    const callBack = (response) => {
      setIsSubmitting(false);
      onToggle(false);
      toast({
        title: "Card Added",
        description: "",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      props.setCards(() => {
        let cards = [...props.cards];
        cards.push(response.data.card);
        return cards;
      });
    };

    const errorCallBack = (error) => {
      return;
    };

    post(`/api/user/card/add`, fd, callBack, errorCallBack, true);
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
        position: "top-right",
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
      <Button
        ref={btnRef}
        leftIcon={<AddIcon />}
        colorScheme="teal"
        onClick={onOpen}
        marginTop={2}
      >
        Add Card / New Item
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        finalFocusRef={btnRef}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent overflowY="scroll">
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Create a new card</DrawerHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            id="form"
            encType="multipart/form-data"
          >
            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <FormLabel htmlFor="name">Title</FormLabel>
                  <Input
                    {...register("name", {
                      required: true,
                    })}
                    id="name"
                    name="name"
                    placeholder="Please enter card title"
                  />
                  {errors.name && errors.name.type === "required" && (
                    <Text fontSize="sm" fontWeight="semibold" color="tomato">
                      This is required
                    </Text>
                  )}
                </Box>

                <Box>
                  <FormLabel htmlFor="about">About</FormLabel>
                  <Textarea
                    {...register("about", { required: true })}
                    name="about"
                    placeholder="Enter a description of the product"
                  />
                  {errors.about && errors.about.type === "required" && (
                    <Text fontSize="sm" fontWeight="semibold" color="tomato">
                      This is required
                    </Text>
                  )}
                </Box>

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

                <Box>
                  <FormLabel htmlFor="price">Price</FormLabel>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    {...register("price", {
                      required: true,
                    })}
                    min="0"
                    placeholder="Please enter the price"
                  />
                  {errors.price && errors.price.type === "required" && (
                    <Text fontSize="sm" fontWeight="semibold" color="tomato">
                      This is required
                    </Text>
                  )}
                </Box>

                {user &&
                user.features &&
                user.features
                  .map((f) => f.toLowerCase())
                  .includes("category") ? (
                  <Categories
                    register={register}
                    categories={props.categories}
                    setCategories={props.setCategories}
                  />
                ) : null}
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isSubmitting}
                loadingText="Adding Card"
              >
                Submit
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AddCard;
