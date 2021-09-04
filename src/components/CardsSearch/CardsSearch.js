import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import get from "../../customFunctions/get";
import useLocalState from "../../customHooks/useLocalState";

import CategoryOptions from "./CategoryOptions/CategoryOptions";

const CardsSearch = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [categoryID, setCategoryID] = useState("all");

  const [user] = useLocalState("user", {});

  const handleSearch = (categoryID) => {
    get(
      `/api/user/cards/search?name=${searchValue}&category_id=${categoryID}`,
      (response) => {
        props.setCards(response.data);
      },
      () => {}
    );
  };

  return (
    <Box>
      <Flex justifyContent="center">
        <InputGroup width="100%">
          <InputLeftElement
            children={<SearchIcon color="gray.300" />}
            cursor="pointer"
            onClick={() => {
              handleSearch(categoryID);
            }}
          />
          <Input
            placeholder="Search Cards"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              handleSearch(categoryID);
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleSearch(categoryID);
              }
            }}
          />
        </InputGroup>
        {user &&
        user.features &&
        user.features.map((f) => f.toLowerCase()).includes("category") ? (
          <CategoryOptions
            setCategoryID={setCategoryID}
            handleSearch={handleSearch}
            categories={props.categories}
            setCategories={props.setCategories}
          />
        ) : null}
      </Flex>
    </Box>
  );
};

export default CardsSearch;
