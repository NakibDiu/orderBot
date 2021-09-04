import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

import get from "../../customFunctions/get";
import usePromiseOnMount from "../../customHooks/usePromiseOnMount";

import Card from "./Card/Card";
import AddCard from "../AddCard/AddCard";
import CardsSearch from "../CardsSearch/CardsSearch";
import Categories from "../Categories/Categories";
import AddCategory from "../AddCategory/AddCategory";
import useLocalState from "../../customHooks/useLocalState";

const Cards = (props) => {
  const [cards, setCards] = useState([]);

  const [categories, setCategories] = useState([]);

  const [user] = useLocalState("user", {});

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    get(
      `/api/user/cards`,
      (response) => {
        setCards(response.data);
        setIsLoading(false);
      },
      () => {
        setIsLoading(false);
      }
    );

    // checking if user has category feature
    if (user?.features?.map((f) => f.toLowerCase()).includes("category")) {
      get(
        "/api/user/categories",
        (response) => {
          setCategories(response.data);
        },
        () => {}
      );
    }

    return () => {
      setCards([]);
    };
  }, [user?.features]);

  let cardsList = null;

  if (cards && cards.length > 0) {
    cardsList = cards.map((card) => {
      return (
        <Card
          key={card.id}
          card={card}
          cards={cards}
          setCards={setCards}
          categories={categories}
        />
      );
    });
  }

  return (
    <Box width="100%">
      <CardsSearch
        setCards={setCards}
        categories={categories}
        setCategories={setCategories}
      />
      <Box
        position="sticky"
        top="0"
        zIndex={3}
        backgroundColor="rgba(255, 255, 255, 0.8)"
        paddingBottom={1}
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          mt={4}
          mb={6}
        >
          <AddCard
            cards={cards}
            setCards={setCards}
            categories={categories}
            setCategories={setCategories}
          />
          {user &&
          user.features &&
          user.features.map((f) => f.toLowerCase()).includes("category") ? (
            <>
              <Categories
                categories={categories}
                setCategories={setCategories}
                setCards={setCards}
              />
              <AddCategory setCategories={setCategories} />
            </>
          ) : null}
        </Flex>
      </Box>
      <Flex justify="space-around" alignItems="flex-start" flexWrap="wrap">
        {isLoading ? (
          <Text fontWeight="bold" fontSize="3xl" margin="5rem">
            Loading Your Cards...
          </Text>
        ) : (
          cardsList
        )}
      </Flex>
    </Box>
  );
};

export default Cards;
