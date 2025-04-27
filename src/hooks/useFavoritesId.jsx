import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useFavoritesId = (email) => {
    const axiosPublic = useAxiosPublic()

    const { data = [], refetch } = useQuery({
        queryKey: ['favorites', email],
        queryFn: async () => {
            const response = await axiosPublic.get(`/users/${email}/favoritesIds`);
            return response.data.data;
        },
        enabled: !!email, // prevents the query from running if email is falsy
    });

    return {
        favoritesId: data,
        favoritesId_refetch: refetch,
    };
}
export default useFavoritesId;


