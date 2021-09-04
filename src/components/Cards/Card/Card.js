import React, { useState } from "react";

import { AspectRatioBox, Box, Text, Image } from "@chakra-ui/react";

import Items from "../../Items/Items";

import AboutEdit from "./CardDetail/AboutEdit/AboutEdit";
import TitleEdit from "./CardDetail/TitleEdit/TitleEdit";
import CategoryEdit from "./CardDetail/CateogryEdit/CategoryEdit";

import Buttons from "./Buttons/Buttons";

import CardImage from "./CardImage/CardImage";
import useLocalState from "../../../customHooks/useLocalState";

const Card = (props) => {
  const [category, setCategory] = useState(props.card.category);
  const [items, setItems] = useState(props.card.items);
  const [imageSource, setImageSource] = useState(props.card.image_link);

  const [user] = useLocalState("user", {});

  return (
    <Box
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      w={300}
      zIndex={0}
      height="auto"
      marginBottom={20}
      mx={[0, 4, 6, 8]}
      boxShadow="0px 0px 8px 0px #2b579a"
    >
      <CardImage
        imageSource={imageSource}
        setImageSource={setImageSource}
        card={props.card}
      />
      <Box>
        <TitleEdit card={props.card} />
        <AboutEdit card={props.card} />
        {user &&
        user.features &&
        user.features.map((f) => f.toLowerCase()).includes("category") ? (
          <CategoryEdit
            card={props.card}
            category={category}
            setCategory={setCategory}
            categories={props.categories}
          />
        ) : null}
        <Buttons
          card={props.card}
          cards={props.cards}
          setCards={props.setCards}
          items={items}
          setItems={setItems}
        />
        <Items items={items} setItems={setItems} />
      </Box>
    </Box>
  );
};

export default Card;
