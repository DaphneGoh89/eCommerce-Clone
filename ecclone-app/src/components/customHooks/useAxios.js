import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:5005";

export const useAxios = (axiosParam) => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async (params) => {
    try {
      const result = await axios.request(params);
      setResponse(result.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(axiosParam);
  }, []);

  return { response, error, loading, fetchData };
};
