import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useApprovedEvents = (filters = {}, page = 1, limit = 10) => {
    const axiosPublic = useAxiosPublic();

    const { data: response = {}, error, isLoading } = useQuery({
        queryKey: ['approvedEvents', filters, page, limit],
        queryFn: async () => {
            // Convert filters to query params
            const params = new URLSearchParams({
                page,
                limit
            });

            // Add filter params
            Object.entries(filters).forEach(([key, value]) => {
                if (value) {
                    if (Array.isArray(value)) {
                        value.forEach(item => params.append(key, item));
                    } else {
                        params.append(key, value);
                    }
                }
            });

            const res = await axiosPublic.get(`/events?${params.toString()}`);
            return res.data;
        },
        keepPreviousData: true // Smooth pagination transitions
    });

    return { 
        size : response.size || 0,
        events: response.data || [], 
        pagination: response.pagination || {},
        error, 
        isLoading 
    };
};

export default useApprovedEvents;