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

import DeleteCategory from "./DeleteCategory/DeleteCategory";
import post from "../../../customFunctions/post";
import { EditIcon } from "@chakra-ui/icons";

const Category = (props) => {
  const [name, setName] = useState(props.category.name);

  const toast = useToast();

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
        <DeleteCategory
          category={props.category}
          setCards={props.setCards}
          setCategories={props.setCategories}
        />
      </Flex>
    );
  }

  const initialName = props.category.name;

  const handleSubmit = () => {
    if (name === props.category.name) return;

    if (name === "") {
      setName(initialName);
      return;
    }

    const data = {
      name: name,
      category_id: props.category.id,
    };

    const callBack = (response) => {
      props.setCategories((state) => {
        let categories = [...state];

        categories = categories.map((category) => {
          if (category.id === response.data.id) {
            category.name = response.data.name;
          }
          return category;
        });

        return categories;
      });

      props.setCards((state) => {
        let cards = [...state];

        cards = cards.map((card) => {
          if (card.category.id === response.data.id) {
            card.category.name = response.data.name;
          }
          return card;
        });

        return cards;
      });

      toast({
        title: "Category Name Editted",
        description: `The name previously was "${initialName}"`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    };

    const errorCallBack = (error) => {
      return;
    };

    post(`/api/user/category/edit`, data, callBack, errorCallBack);
  };

  return (
    <Editable
      value={name}
      onChange={(e) => setName(e)}
      defaultValue={props.category.name}
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

export default Category;
