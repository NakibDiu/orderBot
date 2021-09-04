import { CloseIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import post from "../../../../../customFunctions/post";

const Cancel = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    if (props.isCancelled) {
      return;
    }

    setIsLoading(true);

    const data = {
      order_id: props.order.id,
    };

    const callBack = (response) => {
      props.setIsCancelled(true);
      props.setIsPreparing(false);
      setIsLoading(false);
    };

    const errorCallBack = (error) => {};

    post(`/api/user/order/cancel`, data, callBack, errorCallBack);
  };

  return (
    <Button
      colorScheme="orange"
      marginRight={2}
      size="sm"
      leftIcon={<CloseIcon />}
      variant={props.isCancelled ? "solid" : "outline"}
      isLoading={isLoading}
      isLoadingText="Cancelling..."
      onClick={handleClick}
      marginBottom={2}
    >
      {props.isCancelled ? "Cancelled" : "Cancel"}
    </Button>
  );
};

export default Cancel;
