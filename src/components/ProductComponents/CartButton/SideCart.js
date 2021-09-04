import React from "react";
import { Box, Text, useDisclosure } from "@chakra-ui/react";
import { RiHandbagFill } from "react-icons/ri";
import { useCart } from "react-use-cart";
import CartDrawer from "../Drawer/CartDrawer";

const SideCart = ({}) => {
    const { onOpen, isOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    const { totalUniqueItems, cartTotal } = useCart();

    const openDrawer = () => {
        onOpen();
    };

    return (
        <Box
            bgColor="rgb(0, 158, 127)"
            height="auto"
            width="auto"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            borderRadius="6px 0px 0px 6px"
            cursor="pointer"
            position="fixed"
            right="0px"
            top="50%"
            mt="-46px"
            zIndex="99"
            onClick={openDrawer}
            ref={btnRef}
        >
            {onOpen ? (
                <CartDrawer
                    isOpen={isOpen}
                    onClose={onClose}
                    finalFocusRef={btnRef}
                />
            ) : null}
            <Box
                fontFamily="Lato, sans-serif"
                fontSize="13px"
                fontWeight="700"
                color="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                padding="15px 10px"
            >
                <RiHandbagFill />
                <Text ml={2}>{totalUniqueItems} Items</Text>
            </Box>
            <Box
                width="auto"
                height="35px"
                minW="80px"
                overflow="hidden"
                borderRadius="6px"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                fontFamily="Lato, sans-serif"
                fontSize="13px"
                fontWeight="700"
                m="0px 10px 10px"
                bgColor="white"
                color="rgb(0, 158, 127)"
            >
                <span>&#2547; {cartTotal}</span>
            </Box>
        </Box>
    );
};

export default SideCart;
