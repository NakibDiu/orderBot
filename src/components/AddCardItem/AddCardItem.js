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
import useLocalState from "../../customHooks/useLocalState";
import post from "../../customFunctions/post";
import { AddIcon } from "@chakra-ui/icons";

const AddCardItem = (props) => {
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

  const [user] = useLocalState("user");

  const onSubmit = (data) => {
    setIsSubmitting(true);

    const fd = new FormData();
    fd.append("type", "POST");
    fd.append("name", data.name);
    fd.append("about", data.about);
    fd.append("price", data.price);
    fd.append("card_id", props.card.id);

    // checking if user has stock feature
    if (user?.features?.map((f) => f.toLowerCase()).includes("stock")) {
      fd.append("stock", data.stock);
    }

    const callBack = (response) => {
      setIsSubmitting(false);
      onToggle(false);
      toast({
        title: "Item Added",
        description: "",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      props.setItems(() => {
        let items = [...props.items];
        items.unshift(response.data.item);
        return items;
      });
    };

    const errorCallBack = (error) => {
      return;
    };

    post(`/api/user/card/item/add`, fd, callBack, errorCallBack);
  };

  return (
    <>
      <Button
        ref={btnRef}
        leftIcon={<AddIcon />}
        colorScheme="teal"
        onClick={onOpen}
        size="sm"
      >
        Add Card Item
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
          <DrawerHeader borderBottomWidth="1px">
            Create a new card item of {props.card.name}
          </DrawerHeader>
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
                    defaultValue={props.card.name}
                  />
                  {errors.name && errors.name.type === "required" && (
                    <Text fontSize="sm" fontWeight="semibold" color="tomato">
                      This is required
                    </Text>
                  )}
                </Box>

                <Box>
                  <FormLabel htmlFor="desc">About</FormLabel>
                  <Textarea
                    {...register("about", { required: true })}
                    name="about"
                    placeholder="Enter a description of the product"
                    defaultValue={props.card.about}
                  />
                  {errors.about && errors.about.type === "required" && (
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
                user.features.map((f) => f.toLowerCase()).includes("stock") ? (
                  <Box>
                    <FormLabel htmlFor="stock">Stock</FormLabel>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      {...register("stock", {
                        required: true,
                      })}
                      min="0"
                      placeholder="Please enter the price"
                    />
                    {errors.stock && errors.stock.type === "required" && (
                      <Text fontSize="sm" fontWeight="semibold" color="tomato">
                        This is required
                      </Text>
                    )}
                  </Box>
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
                loadingText="Adding Card Item"
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

export default AddCardItem;
