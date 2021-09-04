import React from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

function EditableControls({ isEditing, onSubmit, onCancel, onEdit }) {
  return isEditing ? (
    <></>
  ) : (
    <Flex justifyContent="center">
      <IconButton size="sm" icon={<EditIcon />} onClick={onEdit} />
    </Flex>
  );
}

export default EditableControls;
