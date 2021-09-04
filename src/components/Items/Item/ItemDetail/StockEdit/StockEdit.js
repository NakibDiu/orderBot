import React, { useState, useEffect } from "react";
import {
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";

import EditableControls from "../EditableControls";
import post from "../../../../../customFunctions/post";

const StockEdit = (props) => {
  const [stock, setStock] = useState(props.item.stock);
  const toast = useToast();

  const initialStock = props.item.stock;

  const handleSubmit = () => {
    if (stock === props.item.stock) return;

    if (stock === "") {
      setStock(initialStock);
      return;
    }

    const data = {
      stock: stock,
      item_id: props.item.id,
    };

    const callBack = (response) => {
      toast({
        title: "Stock Editted",
        description: `The stock previously was "${initialStock}"`,
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
    };

    const errorCallBack = (error) => {
      setStock(initialStock);
    };

    post(`/api/user/item/update`, data, callBack, errorCallBack, "token");
  };

  return (
    <Editable
      value={stock}
      onChange={(e) => setStock(e)}
      isPreviewFocusable={false}
      submitOnBlur={true}
      onSubmit={() => {
        handleSubmit();
      }}
      fontWeight="semibold"
      my="5px"
    >
      {(props) => (
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flexWrap="nowrap"
        >
          <Text fontWeight={400}>Stock </Text>
          <EditablePreview marginRight="20px" />
          <EditableInput width="80%" type="number" />
          <EditableControls {...props} />
        </Flex>
      )}
    </Editable>
  );
};

export default StockEdit;
