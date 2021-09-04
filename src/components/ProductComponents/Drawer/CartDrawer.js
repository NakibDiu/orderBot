import React from "react";
import { RiHandbagFill } from "react-icons/ri";
import { GiShoppingCart } from "react-icons/gi";

import {
    Button,
    Input,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Box,
    Text,
    Heading,
    Image,
} from "@chakra-ui/react";
import { useCart } from "react-use-cart";
const CartDrawer = ({ isOpen, onClose, finalFocusRef,  }) => {
    const {
        updateItemQuantity,
        items,
        totalUniqueItems,
        cartTotal,
        removeItem,
        isEmpty,
    } = useCart();

    // console.log(items);

    const increaseCount = (item) => {
        updateItemQuantity(item.id, item.quantity + 1);
    };

    const decreaseCount = (item) => {
        updateItemQuantity(item.id, item.quantity - 1);
    };
    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={finalFocusRef}
                size="sm"
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="start"
                            padding="15px 25px"
                            borderBottom="1px solid rgb(241, 241, 241)"
                            fontWeight="700"
                            fontSize="15px"
                            lineHeight="1.5"
                            color="rgb(0, 158, 127)"
                        >
                            <RiHandbagFill />
                            <Text
                                paddingLeft="10px"
                                fontFamily="Lato, sans-serif"
                            >
                                {totalUniqueItems} Item
                            </Text>
                        </Box>
                    </DrawerHeader>

                    <DrawerBody>
                        {isEmpty ? (
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                flexDirection="column"
                            >
                                <GiShoppingCart size="200px" />
                                <Heading>Your Cart is Empty</Heading>
                            </Box>
                        ) : (
                            items.map((item) => {
                                return (
                                    <Box
                                        fontSize="15px"
                                        fontWeight="700"
                                        padding="15px 25px"
                                        borderBottom="1px solid rgb(247, 247, 247)"
                                        display="flex"
                                        alignItems="center"
                                        fontFamily="Lato, sans-serif"
                                    >
                                        <Box
                                            display="flex"
                                            borderRadius="200px"
                                            justifyContent="space-between"
                                            alignItems="center"
                                            overflow="hidden"
                                            flexShrink="0"
                                            w="30px"
                                            height="90px"
                                            flexDirection="column"
                                            bgColor="rgb(247, 247, 247)"
                                            color="rgb(13, 17, 54)"
                                        >
                                            <Button
                                                fontSize="25px"
                                                fontWeight="700"
                                                cursor="pointer"
                                                color="rgb(119, 121, 140)"
                                                _focus={{ border: "none" }}
                                                textAlign="center"
                                                onClick={() =>
                                                    increaseCount(item)
                                                }
                                            >
                                                +
                                            </Button>
                                            <Input
                                                type="number"
                                                value={item.quantity}
                                                step="1"
                                                variant="unstyled"
                                                textAlign="center"
                                            />
                                            <Button
                                                fontSize="25px"
                                                fontWeight="700"
                                                cursor="pointer"
                                                color="rgb(119, 121, 140)"
                                                _focus={{ border: "none" }}
                                                textAlign="center"
                                                onClick={() =>
                                                    decreaseCount(item)
                                                }
                                            >
                                                -
                                            </Button>
                                        </Box>
                                        <Box
                                            h="60px"
                                            w="60px"
                                            bgImage={`url(${item.image})`}
                                            bgPos="center"
                                            bgSize="contain"
                                            bgRepeat="no-repeat"
                                            m="0px 15px"
                                        ></Box>
                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                            ml="15px"
                                        >
                                            <Text
                                                color="rgb(13, 17, 54)"
                                                lineHeight="1.5"
                                            >
                                                {item.name}
                                            </Text>
                                            <Text
                                                color="rgb(0, 158, 127)"
                                                mt="10px"
                                                mb="10px"
                                            >
                                                &#2547;{item.price}
                                            </Text>
                                            <Text
                                                fontSize="13px"
                                                fontWeight="400"
                                                color="rgb(119, 121, 140)"
                                                mb="5px"
                                            >
                                                Quantity: {item.quantity}
                                            </Text>
                                        </Box>
                                        <Box ml="auto">
                                            <Text color="rgb(13, 17, 54)">
                                                &#2547;{" "}
                                                {item.quantity * item.price}
                                            </Text>
                                        </Box>
                                        <Box>
                                            <Button
                                                variant="unstyled"
                                                _focus={{ border: "none" }}
                                                p="5px"
                                                cursor="pointer"
                                                outline="0px"
                                                ml="15px"
                                                color="rgba(0, 0, 0, 0.25)"
                                                onClick = {() => removeItem(item.id)}
                                            >
                                                X
                                            </Button>
                                        </Box>
                                    </Box>
                                );
                            })
                        )}
                    </DrawerBody>

                    <DrawerFooter>
                        <Box
                            h="48px"
                            w="calc(100% - 30px)"
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            bgColor="rgb(0, 158, 127)"
                            cursor="pointer"
                            borderRadius="48px"
                            mb="15px"
                            ml="15px"
                            boxShadow="rgb(0 0 0 / 16%) 0px 3px 6px"
                        >
                            <Box
                                paddingLeft="30px"
                                fontFamily="Lato, sans-serif"
                                fontWeight="700"
                                fontSize="15px"
                                paddingRight="10px"
                                color="white"
                            >
                                <Text>Checkout</Text>
                            </Box>
                            <Box
                                w="auto"
                                h="44px"
                                p="0px 30px"
                                overflow="hidden"
                                display="inline-flex"
                                alignItems="center"
                                justifyContent="center"
                                color="rgb(0, 158, 127)"
                                bgColor="white"
                                mr="2px"
                                cursor="pointer"
                                borderRadius = "28px"
                            >
                                <Text
                                    textAlign="center"
                                    fontSize="25px"
                                    fontWeight="700"
                                >
                                    &#2547;{" "}{cartTotal}
                                </Text>
                            </Box>
                        </Box>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default CartDrawer;
