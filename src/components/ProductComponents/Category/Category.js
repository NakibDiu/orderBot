import React from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import { AiOutlineRight } from "react-icons/ai";

const Category = ({ category, selectedCategoryID, setSelectedCategoryID }) => {
    const handleClick = () => {
        // TODO:: change to category.id
        setSelectedCategoryID(category.name);
    };

    // TODO:: change to category.id
    const isSelected = selectedCategoryID === category.name;

    return (
        <Box>
            <HStack
                color={isSelected ? "rgb(0, 158, 127)" : "gray.700"}
                m={1}
                border=".5px"
                p={3}
                w="18vw"
                justify="start"
                _hover={{ cursor: "pointer" }}
                boxShadow={isSelected ? "md" : "xs"}
                onClick={handleClick}
            >
                <Box flexBasis="80%">
                    <Text fontSize="20px">{category.name}</Text>
                </Box>
                <Box>
                    <Text fontSize="20px">{<AiOutlineRight />}</Text>
                </Box>
            </HStack>
        </Box>
    );
};

export default Category;
