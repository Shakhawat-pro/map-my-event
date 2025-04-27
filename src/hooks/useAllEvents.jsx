import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "./useAxiosPublic";
import useAxiosSecure from "./useAxiosSecure";

const useAllEvents = (currentPage = 1, itemsPerPage = 10, filters = {}) => {
    // const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['events', currentPage, filters],
        queryFn: async () => {
            const params = new URLSearchParams({
                page: currentPage,
                itemsPerPage,
                ...filters
            });
            const res = await axiosSecure.get(`/events/adminEvents?${params}`);
            return res.data;
        },
        keepPreviousData: true,
    });

    return {
        events: data?.data?.events || [],
        totalEvents: data?.size || 0,
        totalPages: data?.data?.totalPages || 0,
        isLoading,
        refetch,
    };
};

export default useAllEvents;

