import React, { useState, useEffect } from "react";

import Item from "./Item/Item";

import { AccordionButton, Box, Flex } from "@chakra-ui/react";

import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

const Items = (props) => {
  let itemsList = props.items.map((item) => {
    return (
      <Item
        key={item.id}
        item={item}
        items={props.items}
        setItems={props.setItems}
      />
    );
  });

  return (
    <Flex direction="column" align="center">
      <Accordion width="100%" allowToggle>
        <AccordionItem width="99%">
          <h3>
            <AccordionButton
              color="white"
              backgroundColor="blue.500"
              fontWeight="semibold"
              _hover={{ bg: "blue.500" }}
            >
              <Flex flex="1" textAlign="left">
                Click to edit item
              </Flex>
              <AccordionIcon />
            </AccordionButton>
          </h3>
          <AccordionPanel>{itemsList}</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};

export default Items;
