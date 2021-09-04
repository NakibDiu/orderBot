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
  const [name, setName] = useState(props.card.name);
  const toast = useToast();

  const initialName = props.card.name;

  const handleSubmit = () => {
    if (name === props.card.name) return;

    if (name === "") {
      setName(initialName);
      return;
    }

    const data = {
      name: name,
      card_id: props.card.id,
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

    post(`/api/user/card/update`, data, callBack, errorCallBack);
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
          <EditablePreview
            fontSize={["18px", "20px", "22px", "22px"]}
            fontWeight="semibold"
            marginLeft={2}
            my={5}
          />
          <EditableInput width="95%" mx="auto" />
          <EditableControls {...props} />
        </Flex>
      )}
    </Editable>
  );
};

export default TitleEdit;
