import React, { useState } from "react";
import {
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  useToast,
} from "@chakra-ui/react";

import EditableControls from "../EditableControls";

import post from "../../../../../customFunctions/post";

const TitleEdit = (props) => {
  const [about, setAbout] = useState(props.card.about);
  const toast = useToast();

  const initalAbout = props.card.about;

  const handleSubmit = () => {
    if (about === props.card.about) return;

    if (about === "") {
      setAbout(initalAbout);
      return;
    }

    const data = {
      about: about,
      card_id: props.card.id,
    };

    const callBack = (response) => {
      toast({
        about: "Title Editted",
        description: `The about previously was "${initalAbout}"`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    };

    const errorCallBack = (error) => {
      setAbout(initalAbout);
    };

    post(`/api/user/card/update`, data, callBack, errorCallBack);
  };

  return (
    <Editable
      value={about}
      onChange={(e) => setAbout(e)}
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
            fontSize={["16px", "18px", "20px", "20px"]}
            marginLeft={2}
            my={5}
            fontWeight="light"
          />
          <EditableInput width="95%" mx="auto" />
          <EditableControls {...props} />
        </Flex>
      )}
    </Editable>
  );
};

export default TitleEdit;
