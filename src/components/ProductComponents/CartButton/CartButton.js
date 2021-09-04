import React, { useEffect, useState } from "react";
import { Box, Button, Input } from "@chakra-ui/react";
import { RiHandbagFill } from "react-icons/ri";
import { useCart } from "react-use-cart";

const CartButton = ({ count, product, id, isModalOpen, selectedItem }) => {
    const [clicked, setClicked] = useState(false);
    const { addItem, updateItemQuantity, items, totalItems } = useCart();

    const showCart = () => {
        if (isModalOpen === undefined) {
            addItem(product.items[0]);
        } else {
            addItem(selectedItem);
        }

        setClicked(true);
    };

    const increaseCount = () => {
        updateItemQuantity(selectedItem?.id, selectedItem?.quantity + 1);
    };

    const decreaseCount = () => {
        updateItemQuantity(selectedItem?.id, selectedItem?.quantity - 1);
    };

    return (
        <>
            {count < 1 || totalItems <= 0 ? (
                <Box>
                    <Button
                        variant="outline"
                        color="rgb(0, 158, 127)"
                        leftIcon={<RiHandbagFill />}
                        _hover={{ color: "white", bgColor: "rgb(0, 158, 127)" }}
                        key={id}
                        onClick={showCart}
                    >
                        Cart
                    </Button>
                </Box>
            ) : null}
            <Box
                bgColor="rgb(0, 158, 127)"
                color="white"
                flexBasis="45%"
                alignItems="center"
                justifyContent="space-between"
                spacing="10px"
                borderRadius="md"
                mr={2}
                display={count >= 1 && totalItems > 0 ? "flex" : "none"}
            >
                <Button
                    variant="unstyled"
                    _focus={{ border: "none" }}
                    fontSize="20px"
                    fontWeight="600"
                    onClick={increaseCount}
                >
                    +
                </Button>
                <Input
                    type="number"
                    step="1"
                    variant="unstyled"
                    min="0"
                    value={count}
                    textAlign="center"
                />
                <Button
                    variant="unstyled"
                    _focus={{ border: "none" }}
                    fontSize="20px"
                    fontWeight="600"
                    onClick={decreaseCount}
                >
                    -
                </Button>
            </Box>
        </>
    );
};

export default CartButton;
