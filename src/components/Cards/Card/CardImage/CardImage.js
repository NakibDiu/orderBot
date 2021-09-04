import { AspectRatio, Box, Image } from "@chakra-ui/react";
import React from "react";
import url from "../../../../url";

import CardImageEdit from "./CardImageEdit/CardImageEdit";

const CardImage = (props) => {
  // console.log(props.imageSource);
  return (
    <Box position="relative">
      <CardImageEdit card={props.card} setImageSource={props.setImageSource} />
      <AspectRatio ratio={1 / 1}>
        <Image
          src={`${url}${props.imageSource}`}
          key={`${url}${props.imageSource}`}
          zIndex={0}
          alt="Card Image"
          objectFit="cover"
        />
      </AspectRatio>
    </Box>
  );
};

export default CardImage;
