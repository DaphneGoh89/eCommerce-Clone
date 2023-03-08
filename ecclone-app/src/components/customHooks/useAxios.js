import { useState, useEffect } from "react";
import axios from "axios";

//--------------------------------------------------------------------------
// Declare axios default baseURL
//--------------------------------------------------------------------------
axios.defaults.baseURL = "http://127.0.0.1:5005";

//--------------------------------------------------------------------------
// useAxios hook
//--------------------------------------------------------------------------
export const useAxios = (endpoint, requestOption) => {
  //------------------------------------------------------
  // States
  const [data, setData] = useState([]);
  const [actionResponse, setActionResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  //------------------------------------------------------
  // fetchData function
  const fetchData = async (endpoint, requestOption) => {
    setLoading(true);
    //setActionResponse(null);
    setError(null);

    try {
      const response = await axios(endpoint, requestOption);
      if (requestOption.method === "POST" || requestOption.method === "GET") {
        setData(response.data);
      } else {
        setActionResponse(response.data);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(endpoint, requestOption);
  }, []);

  //--------------------------------------------------------
  // Return
  return { data, actionResponse, error, loading, fetchData };
};
