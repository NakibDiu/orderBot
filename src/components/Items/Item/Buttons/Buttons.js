import { Box, Flex } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

import DeleteItem from './DeleteItem/DeleteItem';

const Buttons = (props) => {

    return (
        <Box
        >
            <Flex
                justify="flex-start"
            >
                <DeleteItem
                    item={props.item}
                    items={props.items}
                    setItems={props.setItems}
                />
            </Flex>
        </Box>
    );
}

export default Buttons;
