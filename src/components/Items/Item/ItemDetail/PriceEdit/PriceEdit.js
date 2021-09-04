import React, { useState, useEffect } from "react";
import { Editable, EditableInput, EditablePreview, Flex, IconButton, Popover, Text, useToast } from "@chakra-ui/react";

import EditableControls from '../EditableControls';
import post from "../../../../../customFunctions/post";

const TitleEdit = (props) => {
    const [price, setPrice] = useState(props.item.price)
    const toast = useToast()

    const initialPrice = props.item.price;

    const handleSubmit = () => {
        if (price === props.item.price) return;

        if (price === '') {
            setPrice(initialPrice)
            return;
        }

        const data = {
            price: price,
            item_id: props.item.id
        }

        const callBack = response => {
            toast({
                title: "Title Editted",
                description: `The price previously was "${initialPrice}"`,
                status: "success",
                duration: 3000,
                isClosable: true,
                position: 'top',
            })
        }

        const errorCallBack = error => {
            setPrice(initialPrice)
        }

        post(
            `/api/user/item/update`,
            data,
            callBack,
            errorCallBack,
        )

    }

    return (
        <Editable
            value={price}
            onChange={e => setPrice(e)}
            isPreviewFocusable={false}
            submitOnBlur={true}
            onSubmit={() => {
                handleSubmit()
            }}
            fontWeight="semibold"
            my="5px"
        >
            {props => (
                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    flexWrap="nowrap"
                >
                    <Text
                        fontWeight={400}
                    >Price </Text>
                    <EditablePreview
                        marginRight="20px"
                    />
                    <EditableInput
                        width="80%"
                        type="number"
                    />
                    <EditableControls {...props} />
                </Flex>
            )

            }
        </Editable>
    );
}

export default TitleEdit;
