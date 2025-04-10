import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useAllUsers = (page = 1, limit = 5) => {
    const axiosPublic = useAxiosPublic()
    const fetchUsers = async () => {
        const res = await axiosPublic.get(`/users?page=${page}&limit=${limit}`);
        return res.data;
    };

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['users', page, limit],
        queryFn: fetchUsers,
        keepPreviousData: true
    });

    return {
        users: data?.data.users|| [],
        totalUsers: data?.size || 0,
        totalPages: data?.data?.totalPages || 0,
        currentPage: data?.data?.currentPage || 1,
        isLoading,
        refetch
    };
};

export default useAllUsers;