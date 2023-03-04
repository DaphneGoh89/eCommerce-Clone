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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  //------------------------------------------------------
  // fetchData function
  const fetchData = async (endpoint, requestOption) => {
    try {
      const response = await axios(endpoint, requestOption);
      setData(response.data);
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
  return { data, error, loading, fetchData };
};
