import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useEventCoordinates = () => {
    const axiosPublic = useAxiosPublic();

    const { data , error, isLoading, } = useQuery({
        queryKey: ['eventCoordinates'],
        queryFn: async () => {
            const res = await axiosPublic.get('/events/coordinates');
            // console.log(res.data);
            return res.data;
        },
        staleTime: 5 * 60 * 1000 // 5 minutes
    });
    return{
        events: data?.data || [],
        error,
        isLoading,      
    }
};

export default useEventCoordinates;