import React, { useState, useEffect } from "react";
import Product from "../Product/Product";
import { Box, Grid, Heading } from "@chakra-ui/react";
import axiosInstance from "../../../utils/axiosInterceptor";
import { useParams } from "react-router-dom";
import { LOW_TO_HIGH, NO_FILTER } from "../../../consts";

const Products = ({
    selectedCategoryID,
    searchText,
    categories,
    filter,
}) => {
    const [products, setProducts] = useState([]);
    const [immutableProducts, setImmutableProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { shopId } = useParams();

    useEffect(() => {
        setIsLoading(true);
        axiosInstance
            .get(`https://www.orderbot.online/api/user/${shopId}/cards`)
            .then((response) => {
                var object = Object.values(response.data);
                object.forEach((data) => {
                    data.id = data.items[0].id;
                    data.price = data.items[0].price;
                });
                // console.log(object)
                setProducts(object);
                setImmutableProducts(object);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error);
            });
    }, [shopId]);

    useEffect(() => {
        setProducts(
            immutableProducts.filter((product) => {
                // TODO:: change to category.id
                return product.category === selectedCategoryID;
            })
        );
        if (selectedCategoryID === -1) {
            setProducts(immutableProducts);
        }
    }, [selectedCategoryID]);

    useEffect(() => {
        if (searchText === "") {
            setProducts(immutableProducts);
        }

        setProducts(
            immutableProducts.filter((product) => {
                // console.log(product);
                return product.name.toLowerCase().includes(searchText);
            })
        );
    }, [searchText]);

    useEffect(() => {
        if (filter === NO_FILTER) {
            setProducts(immutableProducts);
        } else if (filter === LOW_TO_HIGH) {
            setProducts(
                [...products].sort((a, b) => {
                    return a.items[0].price - b.items[0].price;
                })
            );
        } else {
            setProducts(
                [...products].sort((a, b) => {
                    return b.items[0].price - a.items[0].price;
                })
            );
        }
    }, [filter]);

    if (isLoading)
        return (
            <Box
                w="full"
                h="50vh"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Heading textAlign="center">Wait a bit...</Heading>
            </Box>
        );

    if (products.length === 0)
        return (
            <Box
                w="full"
                h="50vh"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Heading textAlign="center">No Products Available</Heading>
            </Box>
        );

    return (
        <Box
            mt={0}
            bgColor="gray.200"
            flexBasis={categories.length === 0 ? "100%" : "80%"}
        >
            <Grid
                templateColumns="repeat(auto-fill, 15rem)"
                gap={2}
                justifyContent="space-around"
                mt={4}
            >
                {products.map((product) => {
                    return (
                        <Product
                            productId={product.id}
                            imageUrl={product.image}
                            price={product.items[0].price}
                            title={product.name}
                            description={product.about}
                            cardItems={product.items}
                            product={product}
                        />
                    );
                })}
            </Grid>
        </Box>
    );
};
export default Products;
