import { Box, Divider, Flex, IconButton, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

import TitleEdit from "./TitleEdit/TitleEdit";
import PriceEdit from "./PriceEdit/PriceEdit";
import StockEdit from "./StockEdit/StockEdit";
import useLocalState from "../../../../customHooks/useLocalState";

const ItemDetail = (props) => {
  const [user] = useLocalState("user", {});

  return (
    <Box width="100%">
      <Flex direction="column">
        <Divider />
        <TitleEdit item={props.item} my="20px" />
        <PriceEdit item={props.item} />
        {user &&
        user.features &&
        user.features.map((f) => f.toLowerCase()).includes("stock") ? (
          <StockEdit item={props.item} />
        ) : null}
      </Flex>
    </Box>
  );
};

export default ItemDetail;
