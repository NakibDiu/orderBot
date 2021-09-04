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
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import useLocalState from "../../customHooks/useLocalState";
import post from "../../customFunctions/post";
import { AddIcon } from "@chakra-ui/icons";

const AddCategory = (props) => {
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
    if (!user?.features?.map((f) => f.toLowerCase()).includes("category")) {
      return;
    }

    const payloadData = {
      name: data.name,
    };

    const callBack = (response) => {
      setIsSubmitting(false);

      // checking if name already exists
      if (response.data.message === "already_exists") {
        toast({
          title: "Category Already Exists",
          description: "",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        return;
      }

      props.setCategories((state) => {
        let categories = [...state];
        categories.unshift(response.data);
        return categories;
      });

      onToggle(false);
      toast({
        title: "Category Added",
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

    post(`/api/user/category/add`, payloadData, callBack, errorCallBack);
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
        Create Category
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
            Create a new category
          </DrawerHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <DrawerBody>
              <Box>
                <FormLabel htmlFor="name">Title</FormLabel>
                <Input
                  {...register("name", {
                    required: true,
                  })}
                  id="name"
                  name="name"
                  placeholder="Category Name"
                />
                {errors.name && errors.name.type === "required" && (
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

export default AddCategory;
