// hooks/useAllUsers.js

import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useAllUsers = (page = 1, filters = {}, limit = 5) => {
  const axiosSecure = useAxiosSecure();

  const fetchUsers = async () => {
    const params = new URLSearchParams({
      page,
      limit,
      ...filters,
    }).toString();

    const res = await axiosSecure.get(`/users?${params}`);
    return res.data;
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['users', page, filters, limit],
    queryFn: fetchUsers,
    keepPreviousData: true
  });

  return {
    users: data?.data?.users || [],
    totalUsers: data?.size || 0,
    totalPages: data?.data?.totalPages || 0,
    currentPage: data?.data?.currentPage || 1,
    isLoading,
    refetch,
  };
};

export default useAllUsers;
