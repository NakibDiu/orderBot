import React, { useState } from "react";
import Sidebar from "../../components/ProductComponents/Sidebar/Sidebar";
import Products from "../../components/ProductComponents/Products/Products";
import Header from "../../components/ProductComponents/Header/Header";
import Navbar from "../../components/ProductComponents/Navbar/Navbar";
import { Box } from "@chakra-ui/layout";
import SideCart from "../../components/ProductComponents/CartButton/SideCart";
import { CartProvider } from "react-use-cart";

const ProductsPage = () => {
    const [selectedCategoryID, setSelectedCategoryID] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [categories, setCategories] = useState([]);
    const [filter, setFilter] = useState("");

    return (
        <>
            <CartProvider>
                <Navbar />
                <Header
                    searchText={searchText}
                    setSearchText={setSearchText}
                    filter={filter}
                    setFilter={setFilter}
                />
                <Box display="flex">
                    <Sidebar
                        selectedCategoryID={selectedCategoryID}
                        setSelectedCategoryID={setSelectedCategoryID}
                        categories={categories}
                        setCategories={setCategories}
                    />
                    <Products
                        selectedCategoryID={selectedCategoryID}
                        searchText={searchText}
                        categories={categories}
                        filter={filter}
                    />
                </Box>
                <SideCart />
            </CartProvider>
        </>
    );
};

export default ProductsPage;
