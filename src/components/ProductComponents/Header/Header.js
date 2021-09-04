import React from "react";
import { Search2Icon } from "@chakra-ui/icons";
import {
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
} from "@chakra-ui/react";
import { HIGH_TO_LOW, LOW_TO_HIGH, NO_FILTER } from "../../../consts";

const Header = ({ searchText, setSearchText, filter, setFilter }) => {
    const searchProduct = (e) => {
        setSearchText(e.target.value);
    };

    const filtering = (e) => {
        setFilter(e.target.value);
    };

    return (
        <HStack justify="space-evenly" m={4}>
            <InputGroup flexBasis="70%">
                <InputLeftElement children={<Search2Icon />} />
                <Input
                    type="text"
                    aria-label="searchProduct"
                    placeholder="Seach Your products from here"
                    variant="filled"
                    value={searchText}
                    onChange={searchProduct}
                />
            </InputGroup>
            <Select flexBasis="20%"  onChange={filtering}>
                <option value={NO_FILTER}>No Filter</option>
                <option value={LOW_TO_HIGH}>Low to High</option>
                <option value={HIGH_TO_LOW}>High to Low</option>
            </Select>
        </HStack>
    );
};

export default Header;
