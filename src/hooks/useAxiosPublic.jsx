import axios from 'axios';
import { useMemo } from 'react';

const useAxiosPublic = () => {
  const axiosPublic = useMemo(() => {
    return axios.create({
      baseURL: "http://localhost:5000/api",
      // baseURL: "https://map-server-brown.vercel.app/api",
      // baseURL: import.meta.env.VITE_BASE_URL
    });
  }, []);

  return axiosPublic;
};

export default useAxiosPublic;
