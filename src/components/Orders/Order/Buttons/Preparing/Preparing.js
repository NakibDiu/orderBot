import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import post from "../../../../../customFunctions/post";

const Preparing = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    if (props.isCancelled) {
      return;
    }

    setIsLoading(true);

    const data = {
      order_id: props.order.id,
      state: true,
    };

    const callBack = (response) => {
      props.setIsPreparing(true);
      setIsLoading(false);
    };

    const errorCallBack = (error) => {};

    post(`/api/user/order/is-preparing`, data, callBack, errorCallBack);
  };

  return (
    <Button
      colorScheme="blue"
      marginRight={2}
      size="sm"
      leftIcon="repeat"
      variant="outline"
      isLoading={isLoading}
      isLoadingText="Cancelling..."
      onClick={handleClick}
      marginBottom={2}
    >
      {props.isPreparing ? "Preparing" : "Start Preparing"}
    </Button>
  );
};

export default Preparing;
