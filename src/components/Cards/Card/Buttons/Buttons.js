import { Box, Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

import DeleteCard from "./DeleteCard/DeleteCard";
import AddCardItem from "../../../AddCardItem/AddCardItem";
import useLocalState from "../../../../customHooks/useLocalState";

const Buttons = (props) => {
  const [user] = useLocalState("user", {});

  return (
    <Box marginY={3} marginX={3}>
      <Flex justify="space-around" alignItems="center">
        <DeleteCard
          card={props.card}
          cards={props.cards}
          setCards={props.setCards}
        />
        {user &&
        user.features &&
        user.features.map((f) => f.toLowerCase()).includes("add_card_item") ? (
          <AddCardItem
            card={props.card}
            items={props.items}
            setItems={props.setItems}
          />
        ) : null}
      </Flex>
    </Box>
  );
};

export default Buttons;
