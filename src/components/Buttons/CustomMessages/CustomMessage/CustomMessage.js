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

import DeleteCustomMessage from "./DeleteCustomMessage/DeleteCustomMessage";
import post from "../../../../customFunctions/post";
import { EditIcon } from "@chakra-ui/icons";

const CustomMessage = (props) => {
  const [name, setName] = useState(props.message.message);

  const toast = useToast();

  // function EditableControls({ isEditing, onSubmit, onCancel, onEdit }) {
  function EditableControls({ isEditing, onSubmit, onCancel, onRequestEdit }) {
    return isEditing ? (
      <></>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          size="sm"
          icon={<EditIcon />}
          onClick={onRequestEdit}
          mx={2}
        />
        <DeleteCustomMessage
          message={props.message}
          setMessages={props.setMessages}
        />
      </Flex>
    );
  }

  const initialName = props.message.message;

  const handleSubmit = () => {
    if (name === props.message.message) return;

    if (name === "") {
      setName(initialName);
      return;
    }

    const data = {
      message: name,
      custom_message_id: props.message.id,
    };

    const callBack = (response) => {
      props.setMessages((state) => {
        let messages = [...state];

        messages = messages.map((message) => {
          if (message.id === response.data.id) {
            message.message = response.data.message;
          }
          return message;
        });

        return messages;
      });

      toast({
        title: "Messages Editted",
        description: `The message previously was "${initialName}"`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    };

    const errorCallBack = (error) => {
      return;
    };

    post(`/api/user/custom-message/update`, data, callBack, errorCallBack);
  };

  return (
    <Editable
      value={name}
      onChange={(e) => setName(e)}
      defaultValue={props.message.message}
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

export default CustomMessage;
