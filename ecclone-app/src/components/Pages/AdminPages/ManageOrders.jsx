import React from "react";
import SearchOrderForm from "./ManageOrder/SearchOrderForm";
import OrderTable from "./ManageOrder/OrderTable";

const ManageOrders = () => {
  return (
    <div className="py-4 grid grid-cols-5  justify-center mx-auto space-x-5 max-w-[1300px]">
      <div className="">
        <SearchOrderForm />
      </div>
      <div className="col-span-4">
        <OrderTable />
      </div>
    </div>
  );
};

export default ManageOrders;
