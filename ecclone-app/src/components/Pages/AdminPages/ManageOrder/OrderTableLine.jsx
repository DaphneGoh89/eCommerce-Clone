import React from "react";

const OrderTableLine = ({
  orderId,
  orderDate,
  customerId,
  customerName,
  orderQty,
  orderCurrency,
  orderAmount,
  shiptoCountry,
  shiptoPostal,
  orderStatus,
}) => {
  return (
    <tr className="odd:bg-gray-200 py-2">
      <td className="text-center py-2">
        <input type="checkbox"></input>
      </td>
      <td className="text-center">{orderId}</td>
      <td className="text-center">{orderDate}</td>
      <td>{customerName}</td>
      <td className="text-center">{orderQty}</td>
      <td className="text-right">{orderAmount}</td>
      <td className="text-center">{shiptoCountry}</td>
      <td className="text-center">{shiptoPostal}</td>
      <td className="text-center">{orderStatus}</td>
    </tr>
  );
};

export default OrderTableLine;
