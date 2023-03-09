import React from "react";
import OrderTableLine from "./OrderTableLine";

const dummyOrders = [
  {
    orderId: 1,
    orderDate: "9/3/2023",
    customerId: 1,
    customerName: "Daphne Goh", // firstName + lastName,
    orderQty: 2,
    orderCurrency: "SGD",
    orderAmount: 100,
    shiptoCountry: "SG",
    shiptoPostal: "670516",
    orderStatus: "O",
    // orderDetails: [""]
  },
  {
    orderId: 1,
    orderDate: "9/3/2023",
    customerId: 1,
    customerName: "Daphne Goh", // firstName + lastName,
    orderQty: 2,
    orderCurrency: "SGD",
    orderAmount: 100,
    shiptoCountry: "SG",
    shiptoPostal: "670516",
    orderStatus: "O",
    // orderDetails: [""]
  },
  {
    orderId: 1,
    orderDate: "9/3/2023",
    customerId: 1,
    customerName: "Daphne Goh", // firstName + lastName,
    orderQty: 2,
    orderCurrency: "SGD",
    orderAmount: 100,
    shiptoCountry: "SG",
    shiptoPostal: "670516",
    orderStatus: "O",
    // orderDetails: [""]
  },
];

const OrderTable = () => {
  return (
    <table className="text-xxs px-1 my-5 w-full">
      <thead>
        <tr className="border-b-[1px] border-t-[1px] text-fontDarkGrey">
          <th className="py-2">Mark Delivered</th>
          <th>Order ID</th>
          <th>Date</th>
          <th>Customer Name</th>
          <th>Order Qty</th>
          <th>Order Amount</th>
          <th>Country</th>
          <th>Postal</th>
          <th>Order Status</th>
        </tr>
      </thead>

      <tbody>
        {dummyOrders.map((order, index) => {
          return <OrderTableLine {...order} key={index} />;
        })}
      </tbody>
    </table>
  );
};

export default OrderTable;
