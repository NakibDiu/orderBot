import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    Box,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    Text,
    Image,
    HStack,
    Heading,
    Select,
} from "@chakra-ui/react";
import CartButton from "../CartButton/CartButton";
import { useCart } from "react-use-cart";

const ProductModal = ({
    isOpen,
    onClose,
    cardItems,
    clickState,
    product,
    id,
    previousItems,
}) => {
    const [previousItem, setPreviousItem] = previousItems;
    const [currentItem, setCurrentItem] = useState(
        previousItem !== null ? previousItem : cardItems[0]
    );
    const { items } = useCart();

    let showOptions = cardItems.length < 2 ? false : true;

    const count =
        items.filter((item) => item.id === currentItem.id)[0]?.quantity ?? 0;

    const changeItem = (item) => {
        setCurrentItem(item);
    };

    const selectItem = (e) => {
        let selected = e.target.value;

        cardItems.forEach((item) => {
            if (item.name === selected) {
                setCurrentItem(item);
                setPreviousItem(item);
            }
        });
    };

    // console.log(items)
    return (
        <>
            <Modal
                isCentered
                blockScrollOnMount={false}
                isOpen={isOpen}
                onClose={onClose}
                size="2xl"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <HStack mt={2} alignItems="flex-start">
                            <Box
                                display="flex"
                                flexDir="column"
                                alignItems="center"
                                flexBasis="55%"
                                mr={4}
                                h="100%"
                            >
                                <Image
                                    src={`https://orderbot.online${currentItem.image_link}`}
                                    w="xl"
                                    h="xs"
                                    fit="contain"
                                />
                                <HStack m={4}>
                                    {cardItems.map((item, index) => {
                                        return (
                                            <Box
                                                h="40px"
                                                w="40px"
                                                border="1px solid"
                                                borderColor="gray.500"
                                                p={0.5}
                                                mr={2}
                                                _hover={{
                                                    cursor: "pointer",
                                                    boxShadow: "lg",
                                                }}
                                                key={index}
                                                onClick={() => changeItem(item)}
                                                bgImage={`url(https://orderbot.online/${item.image_link})`}
                                                // bgPosition="left center"
                                                bgRepeat="no-repeat"
                                                bgSize="cover"
                                            />
                                        );
                                    })}
                                </HStack>
                            </Box>
                            <Box
                                h="350px"
                                display="flex"
                                flexDir="column"
                                justifyContent="space-around"
                                flexBasis="40%"
                            >
                                <Box>
                                    <Heading
                                        fontFamily=" Poppins, sans-serif"
                                        fontWeight="600"
                                        fontSize="21px"
                                        lineHeight="1.5"
                                        color="rgb(13, 17, 54)"
                                    >
                                        {currentItem.name}
                                    </Heading>
                                    <Text
                                        fontFamily="Lato, sans-serif"
                                        fontWeight="400"
                                        fontSize="calc(13px)"
                                        color="rgb(119, 121, 140)"
                                    >
                                        {currentItem.stock == 0 ||
                                        currentItem.stock === null
                                            ? "Out of Stock"
                                            : currentItem.stock +
                                              " Pcs Available"}
                                    </Text>
                                </Box>
                                <Box display={showOptions ? "block" : "none"}>
                                    <Select
                                        onChange={selectItem}
                                        _selected={
                                            previousItem === null
                                                ? currentItem.name
                                                : previousItem.name
                                        }
                                    >
                                        {[currentItem, ...cardItems].map(
                                            (item, index) => {
                                                return (
                                                    <option
                                                        value={item.name}
                                                        key={index}
                                                    >
                                                        {item.name}
                                                    </option>
                                                );
                                            }
                                        )}
                                    </Select>
                                </Box>
                                <Box>
                                    <Text
                                        fontFamily="Lato, sans-serif"
                                        fontWeight="400"
                                        fontSize="15px"
                                        color="rgb(66, 69, 97)"
                                        lineHeight="2"
                                    >
                                        {currentItem.about}
                                    </Text>
                                </Box>
                                <HStack justifyContent="space-between">
                                    <Text
                                        fontFamily="Lato, sans-serif"
                                        fontWeight="700"
                                        color="rgb(0, 158, 127)"
                                        fontSize="21px"
                                    >
                                        &#2547;{currentItem.price}
                                    </Text>
                                    <CartButton
                                        count={count}
                                        clickState={clickState}
                                        product={product}
                                        id={currentItem.id}
                                        isModalOpen={isOpen}
                                        selectedItem={currentItem}
                                    />
                                </HStack>
                            </Box>
                        </HStack>
                    </ModalBody>

                    {/* <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter> */}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ProductModal;
