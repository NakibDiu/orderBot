import React, { useEffect } from "react";
import axios from "axios";
import { VStack, HStack, Text, Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Category from "../Category/Category";
import PerfectScrollbar from "react-perfect-scrollbar";
import { AiOutlineRight } from "react-icons/ai";

const Sidebar = ({
    selectedCategoryID,
    setSelectedCategoryID,
    categories,
    setCategories,
}) => {
    const { shopId } = useParams();

    useEffect(() => {
        axios
            .get(
                `https://orderbot.online/api/external/user/${shopId}/categories`
            )
            .then((res) => {
                setCategories(Object.values(res.data));
                // console.log(res.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [shopId]);

    const handleClick = () => {
        setSelectedCategoryID(-1);
    };

    const isClicked = selectedCategoryID === -1;
    let isNull = false;
    if (categories.length === 0) isNull = true;

    return (
        <VStack flexBasis="20%" display={isNull ? "none" : "show"}>
            <PerfectScrollbar>
                <HStack
                    onClick={handleClick}
                    color={isClicked ? "rgb(0, 158, 127)" : "gray.700"}
                    m={1}
                    border=".5px"
                    p={3}
                    w="18vw"
                    justify="start"
                    _hover={{ cursor: "pointer" }}
                    boxShadow={isClicked ? "md" : "xs"}
                >
                    <Box flexBasis = "80%">
                        <Text fontSize="20px">All</Text>
                    </Box>
                    <Box>
                        <Text fontSize="20px">{<AiOutlineRight />}</Text>
                    </Box>
                </HStack>
                {categories.map((cats) => {
                    return (
                        <Category
                            category={cats}
                            key={cats.id}
                            selectedCategoryID={selectedCategoryID}
                            setSelectedCategoryID={setSelectedCategoryID}
                        />
                    );
                })}
            </PerfectScrollbar>
        </VStack>
    );
};

export default Sidebar;
