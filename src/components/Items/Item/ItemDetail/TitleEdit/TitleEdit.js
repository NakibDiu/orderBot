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

const TitleEdit = (props) => {
  const [name, setName] = useState(props.item.name);
  const toast = useToast();

  const initialName = props.item.name;

  const handleSubmit = () => {
    if (name === props.item.name) return;

    if (name === "") {
      setName(initialName);
      return;
    }

    const data = {
      name: name,
      item_id: props.item.id,
    };

    const callBack = (response) => {
      toast({
        title: "Title Editted",
        description: `The title previously was "${initialName}"`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    };

    const errorCallBack = (error) => {
      setName(initialName);
    };

    post(`/api/user/item/update`, data, callBack, errorCallBack);
  };

  return (
    <Editable
      value={name}
      onChange={(e) => setName(e)}
      isPreviewFocusable={false}
      submitOnBlur={true}
      onSubmit={() => {
        handleSubmit();
      }}
      fontWeight="semibold"
      mt="5px"
      mb="5px"
    >
      {(props) => (
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flexWrap="nowrap"
        >
          <Text fontWeight={400}>Name</Text>
          <EditablePreview />
          <EditableInput width="80%" />
          <EditableControls {...props} />
        </Flex>
      )}
    </Editable>
  );
};

export default TitleEdit;
