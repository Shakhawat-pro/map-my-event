import axios from 'axios';
import React from 'react';

const useAxiosPublic = () => {
    const axiosPublic = axios.create({
        baseURL: "http://localhost:5000/api",
        // baseURL: import.meta.env.VITE_BASE_URL
    });

    return axiosPublic
};

export default useAxiosPublic;