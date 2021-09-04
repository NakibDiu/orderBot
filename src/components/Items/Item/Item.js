import React, { useState, useEffect } from "react";

import { Box, Flex } from "@chakra-ui/react";

import ItemDetail from "./ItemDetail/ItemDetail";

import Buttons from "./Buttons/Buttons";

const Item = (props) => {
  return (
    <Box marginTop={3}>
      <Flex direction="column" align="center">
        <ItemDetail item={props.item} width="99%" />
      </Flex>
      <Buttons
        item={props.item}
        items={props.items}
        setItems={props.setItems}
        align="flex-start"
      />
    </Box>
  );
};

export default Item;
