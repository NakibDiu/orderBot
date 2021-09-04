import { Box } from "@chakra-ui/react";
import React, { useState } from "react";

import ConfirmButton from "./Confirm/Confirm";
import CancelButton from "./Cancel/Cancel";
import DeleteButton from "./Delete/Delete";
import PreparingButton from "./Preparing/Preparing";
import DeliverButton from "./Deliver/Deliver";
import SendMessageButton from "./SendMessage/SendMessage";
import useLocalState from "../../../../customHooks/useLocalState";

const Buttons = (props) => {
  const [isConfirmed, setIsConfirmed] = useState(props.order.is_confirmed);
  const [isCancelled, setIsCancelled] = useState(props.order.is_cancelled);
  const [isDeleted, setIsDeleted] = useState(props.order.is_deleted);
  const [isDelivered, setIsDelivered] = useState(props.order.is_delivered);
  const [isPreparing, setIsPreparing] = useState(props.order.is_preparing);

  const [user] = useLocalState("user", {});

  return (
    <Box
      display="flex"
      // justifyContent={["flex-start", "flex-start", "space-between"]}
      justifyContent={"flex-end"}
      alignItems="center"
      flexWrap="wrap"
      marginTop={2}
    >
      {!isCancelled ? (
        <ConfirmButton
          order={props.order}
          isConfirmed={isConfirmed}
          setIsConfirmed={setIsConfirmed}
        />
      ) : null}
      {!isConfirmed ? (
        <CancelButton
          order={props.order}
          isCancelled={isCancelled}
          setIsPreparing={setIsPreparing}
          setIsCancelled={setIsCancelled}
        />
      ) : null}
      {!isCancelled &&
      isConfirmed &&
      user &&
      user.features &&
      user.features.map((f) => f.toLowerCase()).includes("deliver") ? (
        <DeliverButton
          order={props.order}
          isDelivered={isDelivered}
          setIsDelivered={setIsDelivered}
        />
      ) : null}
      {user &&
      user.features &&
      user.features.map((f) => f.toLowerCase()).includes("custom_messaging") ? (
        <SendMessageButton order={props.order} messages={props.messages} />
      ) : null}
      <DeleteButton
        order={props.order}
        setOrders={props.setOrders}
        isDeleted={isDeleted}
        setIsDeleted={setIsDeleted}
      />
    </Box>
  );
};

export default Buttons;
