import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useAllEvents = (currentPage = 1, itemsPerPage = 10,) => {
    const axiosPublic = useAxiosPublic();

    const { data, error, isLoading, refetch } = useQuery({
        queryKey: ['events', currentPage, ],
        queryFn: async () => {
            const res = await axiosPublic.get(`events/adminEvents?page=${currentPage}&limit=${itemsPerPage}`);
            return res.data;
        },
    });

    return {
        events: data?.data?.events || [],
        totalEvents: data?.size || 0,
        totalPages: data?.data?.totalPages || 0,
        error,
        isLoading,
        refetch
    };
};

export default useAllEvents;