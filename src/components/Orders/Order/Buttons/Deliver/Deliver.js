import { RepeatIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import post from "../../../../../customFunctions/post";

const Deliver = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    if (props.isDelivered) {
      return;
    }

    setIsLoading(true);

    const data = {
      order_id: props.order.id,
    };

    const callBack = (response) => {
      props.setIsDelivered(true);
      setIsLoading(false);
    };

    const errorCallBack = (error) => {};

    post(`/api/user/order/deliver`, data, callBack, errorCallBack);
  };
  return (
    <Button
      colorScheme="yellow"
      marginRight={2}
      size="sm"
      leftIcon={<RepeatIcon />}
      variant={props.isDelivered ? "solid" : "outline"}
      isLoading={isLoading}
      isLoadingText="Delivering..."
      onClick={handleClick}
      marginBottom={2}
    >
      {props.isDelivered ? "Delivered" : "Deliver"}
    </Button>
  );
};

export default Deliver;
