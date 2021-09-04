import { CheckIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import post from "../../../../../customFunctions/post";

const Confirm = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    if (props.isConfirmed) {
      return;
    }

    setIsLoading(true);

    const data = {
      order_id: props.order.id,
    };

    const callBack = (response) => {
      props.setIsConfirmed(true);
      setIsLoading(false);
    };

    const errorCallBack = (error) => {};

    post(`/api/user/order/confirm`, data, callBack, errorCallBack);
  };

  return (
    <Button
      colorScheme="green"
      marginRight={2}
      leftIcon={<CheckIcon />}
      variant={props.isConfirmed ? "solid" : "outline"}
      isLoading={isLoading}
      isLoadingText="Confirming..."
      onClick={handleClick}
      marginBottom={2}
      size="sm"
    >
      {props.isConfirmed ? "Confirmed" : "Confirm"}
    </Button>
  );
};

export default Confirm;
