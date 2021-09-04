import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";

import Buttons from "./Buttons/Buttons";

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

const columnStyle = {
  textAlign: "center",
  padding: "2rem 1rem",
  margin: "0rem auto",
  maxWidth: "22ch",
};

const Order = (props) => {
  const orders = props.order.order.split("<br>").map((order) => {
    return (
      <Text key={order} color="blue.500">
        {order}
      </Text>
    );
  });

  return (
    <>
      <tr>
        <td style={columnStyle}>
          <Text>{props.order.created_at.substring(0, 10)}</Text>
          <Text fontWeight="bold">
            {props.order.created_at.substring(11, 19)}
          </Text>
        </td>
        <td style={columnStyle}>{props.index}</td>
        <td style={columnStyle}>{props.order.customer_name}</td>
        <td style={columnStyle}>
          <Box display="flex" flexDir="column" textAlign="center">
            {orders}
          </Box>
        </td>
        <td style={columnStyle}>
          <Text fontWeight="bold" fontSize={["sm", "md"]} color="green.500">
            {formatNumber(props.order.price)}
          </Text>
        </td>
        <td style={columnStyle}>{props.order.customer_mobile}</td>
        <td style={columnStyle}>{props.order.customer_address}</td>
        <td style={columnStyle}>{props.order.remarks}</td>
      </tr>
      <tr>
        <td colSpan={8}>
          <Buttons
            order={props.order}
            setOrders={props.setOrders}
            messages={props.messages}
          />
        </td>
      </tr>
    </>
    // <Box
    //     borderWidth="1px"
    //     rounded="lg"
    //     overflow="hidden"
    //     zIndex={0}
    //     height="auto"
    //     marginBottom={5}
    //     padding={5}
    //     boxShadow="0px 0px 4px 0px #2b579a"
    //     display="flex"
    //     flexWrap="wrap"
    //     flexDir="column"
    // >
    //     <Box display="flex" justifyContent="space-between">
    //         <Box
    //             // display="flex"
    //             // flexDirection="column"
    //             maxWidth="40%"
    //         >
    //             <Text fontWeight="bold">Name</Text>
    //             <Text>{props.order.customer_name}</Text>
    //             <Text fontWeight="bold">Number</Text>
    //             <Text>{props.order.customer_mobile}</Text>
    //             <Text fontWeight="bold">Address</Text>
    //             <Text>{props.order.customer_address}</Text>
    //         </Box>
    //         <Box>
    //             <Text fontWeight="bold" color="blue.700">
    //                 Order #{props.index}
    //             </Text>
    //             <Box display="flex" flexDirection="column">
    //                 {orders}
    //             </Box>
    //         </Box>
    //         <Box marginY="auto">
    //             <Text fontWeight="bold">Taka</Text>
    //             <Text fontWeight="bold" fontSize="lg" color="green.500">
    //                 {props.order.price}
    //             </Text>
    //         </Box>
    //     </Box>
    //     <Buttons
    //         order={props.order}
    //         setOrders={props.setOrders}
    //         messages={props.messages}
    //     />
    // </Box>
  );
};

export default Order;
