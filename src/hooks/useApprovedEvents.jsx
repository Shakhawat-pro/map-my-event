import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useApprovedEvents = () => {
    const axiosPublic = useAxiosPublic();

    const { data: events = [], error, isLoading } = useQuery({
        queryKey: ['approvedEvents'],
        queryFn: async () => {
            const res = await axiosPublic.get('/events');
            return res.data.data;
        },
    });

    return [events, error, isLoading];
};

export default useApprovedEvents;