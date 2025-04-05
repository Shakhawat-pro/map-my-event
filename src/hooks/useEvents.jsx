// get all approved event data from the server  

import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useEvents = () => {
    const axiosPublic = useAxiosPublic();
    const { data: events = [], error, isLoading } = useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            const res = await axiosPublic.get('/events');
            return res.data;
        },
    })
    return [events, error, isLoading]
};

export default useEvents;