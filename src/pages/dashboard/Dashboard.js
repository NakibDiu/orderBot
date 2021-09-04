import React, { useState, useEffect } from "react";

import { Box, Text } from "@chakra-ui/react";

import get from "../../customFunctions/get";

import useLocalState from "../../customHooks/useLocalState";
import Topbar from "../../layout/Topbar/Topbar";
import Orders from "../../components/Orders/Orders";
import Buttons from "../../components/Buttons/Buttons";

const Dashboard = (props) => {
  const [messages, setMessages] = useState([]);
  const [orders, setOrders] = useState([]);

  const [user] = useLocalState("user", {});

  useEffect(() => {
    get(
      `/api/user/orders`,
      (response) => {
        setOrders(response.data);
      },
      (error) => {}
    );

    if (
      user?.features?.map((f) => f.toLowerCase()).includes("custom_messaging")
    ) {
      const callBack = (response) => {
        setMessages(response.data);
      };

      const errorCallBack = (error) => {};

      get(`/api/user/custom-messages`, callBack, errorCallBack);
    }
  }, []);

  // console.log(user);

  return (
    <Box>
      <Topbar />
      <Box width="100%" minHeight="100vh" padding={[2, 4, 6, 8]}>
        <Text
          textAlign="center"
          fontSize="3xl"
          fontWeight="bold"
          marginBottom={2}
        >
          {user?.business_name}
        </Text>
        <Buttons
          messages={messages}
          setMessages={setMessages}
          setOrders={setOrders}
        />
        <Orders orders={orders} setOrders={setOrders} messages={messages} />
      </Box>
    </Box>
  );
};

export default Dashboard;
