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
import post from "../../../customFunctions/post";
import { AddIcon } from "@chakra-ui/icons";

const AddOrder = (props) => {
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

  const onSubmit = (data) => {
    setIsSubmitting(true);

    const fd = new FormData();
    fd.append("type", "POST");
    fd.append("contentType", false);
    fd.append("processData", false);
    fd.append("order", data.order);
    fd.append("price", data.price);
    fd.append("customer_name", data.customer_name);
    fd.append("customer_address", data.customer_address);
    fd.append("customer_mobile", data.customer_mobile);
    fd.append("remarks", data.remarks);

    const callBack = (response) => {
      setIsSubmitting(false);
      onToggle(false);
      props.setOrders((state) => {
        let orders = [...state];

        orders.unshift(response.data);

        return orders;
      });
    };

    const errorCallBack = (error) => {};

    post(`/api/user/order/add`, fd, callBack, errorCallBack);
  };

  return (
    <>
      <Button
        ref={btnRef}
        leftIcon={<AddIcon />}
        colorScheme="green"
        onClick={onOpen}
        marginTop={2}
      >
        Create New Order
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
            Create a new order
          </DrawerHeader>
          <form onSubmit={handleSubmit(onSubmit)} id="form">
            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <FormLabel htmlFor="order">Order</FormLabel>
                  <Textarea
                    {...register("order", {
                      required: true,
                    })}
                    id="order"
                    name="order"
                    placeholder="Please enter order name"
                  />
                  {errors.order && errors.order.type === "required" && (
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

                <Box>
                  <FormLabel htmlFor="customer_name">Customer Name</FormLabel>
                  <Input
                    {...register("customer_name", {
                      required: true,
                    })}
                    id="customer_name"
                    name="customer_name"
                    placeholder="Please enter customer name"
                  />
                  {errors.customer_name &&
                    errors.customer_name.type === "required" && (
                      <Text fontSize="sm" fontWeight="semibold" color="tomato">
                        This is required
                      </Text>
                    )}
                </Box>

                <Box>
                  <FormLabel htmlFor="customer_address">
                    Customer Address
                  </FormLabel>
                  <Textarea
                    {...register("customer_address", {
                      required: true,
                    })}
                    id="customer_address"
                    name="customer_address"
                    placeholder="Please enter customer address"
                  />
                  {errors.customer_address &&
                    errors.customer_address.type === "required" && (
                      <Text fontSize="sm" fontWeight="semibold" color="tomato">
                        This is required
                      </Text>
                    )}
                </Box>
                <Box>
                  <FormLabel htmlFor="customer_mobile">
                    Customer Mobile
                  </FormLabel>
                  <Input
                    {...register("customer_mobile", {
                      required: true,
                    })}
                    id="customer_mobile"
                    name="customer_mobile"
                    placeholder="Please enter customer mobile"
                  />
                  {errors.customer_mobile &&
                    errors.customer_mobile.type === "required" && (
                      <Text fontSize="sm" fontWeight="semibold" color="tomato">
                        This is required
                      </Text>
                    )}
                </Box>

                <Box>
                  <FormLabel htmlFor="remarks">Remarks</FormLabel>
                  <Textarea
                    {...register("remarks")}
                    name="remarks"
                    placeholder="Enter remarks if any"
                  />
                </Box>
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
                loadingText="Adding Order"
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

export default AddOrder;
