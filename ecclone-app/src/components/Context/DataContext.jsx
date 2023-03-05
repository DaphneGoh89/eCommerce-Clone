import { createContext, useState, useEffect } from "react";

//----------------------------------------------------------------------------------------------
// Create DataContext
const DataContext = createContext();

export default DataContext;

//-----------------------------------------------------------------------------------------------
// Declare DataProvider
export const DataProvider = () => {
  const [customerCart, setCustomerCart] = useState(null);

  let getCustomerCart = async (e, customerId) => {
    e.preventDefault();

    try {
      let response = await axios.post("http://127.0.0.1:5005/cart/getCart", {
        customerId: customerId,
      });

      if (response.status === 200) {
        let data = response.data;
        setCustomerCart(data);
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  let contextData = { getCustomerCart, customerCart };

  return <DataContext.Provider value={contextData}></DataContext.Provider>;
};
