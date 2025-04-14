import axios from 'axios';

const useAxiosPublic = () => {
    const axiosPublic = axios.create({
        baseURL: "http://localhost:5000/api",
        // baseURL: "https://map-server-brown.vercel.app/api",
        // baseURL: import.meta.env.VITE_BASE_URL
    });

    return axiosPublic
};

export default useAxiosPublic;