import { Image, Box, HStack, Text, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import ProductModal from "../Modals/ProductModal";
import TruncateMarkup from "react-truncate-markup";
import CartButton from "../CartButton/CartButton";
import { useCart } from "react-use-cart";

const Product = ({
    imageUrl,
    title,
    price,
    description,
    cardItems,
    product,
    productId,
}) => {
    const [showModal, setShowModal] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [previousItem, setPreviousItem] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { items } = useCart();

    const showProduct = (e) => {
        if (e.target.nodeName !== "BUTTON") {
            setShowModal(true);
        }
        onOpen();
    };

    return (
        <Box
            rounded={8}
            bgColor="white"
            display="flex"
            flexDir="column"
            justifyContent="space-between"
            _hover={{ cursor: "pointer" }}
            onClick={showProduct}
        >
            {showModal && cardItems && cardItems[0] ? (
                <ProductModal
                    isOpen={isOpen}
                    onClose={onClose}
                    name={cardItems[0].name}
                    description={description}
                    stock={cardItems[0].stock}
                    price={cardItems[0].price}
                    image={imageUrl}
                    quantity={cardItems[0].quantity}
                    cardItems={cardItems}
                    clickState={[clicked, setClicked]}
                    product={product}
                    id={productId}
                    previousItems={[previousItem, setPreviousItem]}
                />
            ) : null}
            <Image src={imageUrl} h={52} w="full" fit="contain" />
            <Box mt={6} p={2}>
                <Text fontWeight="700" fontSize="20px">
                    {title}
                </Text>
                <TruncateMarkup lines={3}>
                    <Text mt={2} color="gray.500" fontSize="18px">
                        {description}
                    </Text>
                </TruncateMarkup>
            </Box>
            <HStack w="100%" justify="space-around" mt={6} mb={4}>
                <Text color="rgb(0, 158, 127)" fontWeight="bold">
                    ${price}
                </Text>
                <CartButton
                    clickState={[clicked, setClicked]}
                    cardItems={cardItems}
                    count={getCardItemsTotalCount(items, product.card_id)}
                    selectedItem={items.filter(item => item.card_id === product.card_id)[0]}
                    setShowModal={setShowModal}
                    product={product}
                    id={productId}
                />
            </HStack>
        </Box>
    );
};

export default Product;

const getCardItemsTotalCount = (items, cardId) => {
    let count = 0;

    items.forEach((item) => {
        if (parseInt(item.card_id) === parseInt(cardId)) {
            count += item.quantity ?? 0;
        }
    });

    return count;
};
