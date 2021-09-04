import { Box } from "@chakra-ui/react";
import React from "react";

import Order from "./Order/Order";

import { Table } from "reactstrap";

const Orders = (props) => {
  let orderList = null;

  let index = 0;

  if (props.orders) {
    orderList = props.orders.map((order) => {
      index++;
      return (
        <Order
          key={order.id}
          index={index}
          order={order}
          setOrders={props.setOrders}
          messages={props.messages}
        />
      );
    });
  }

  return (
    <Box
      marginTop={10}
      fontSize={["xs", "sm", "md"]}
      overflowX="scroll"
    >
      <Table striped bordered responsive width="100%">
        <thead
          style={{
            backgroundColor: "#343a40",
            color: "white",
            fontWeight: "bold",
          }}
        >
          <th>Time</th>
          <th>#</th>
          <th>Name</th>
          <th>Order</th>
          <th>Taka</th>
          <th>Mobile</th>
          <th>Address</th>
          <th>Remarks</th>
        </thead>
        <tbody>{orderList}</tbody>
      </Table>
    </Box>
    // <Box
    //     marginTop={15}
    // >
    //     {orderList}
    // </Box>
  );
};

export default Orders;
