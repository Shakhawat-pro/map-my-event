// hooks/useEventDetails.js
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useEventDetails = (eventId) => {
  const axiosPublic = useAxiosPublic();

  return useQuery({
    queryKey: ['eventDetails', eventId],
    queryFn: async () => {
      if (!eventId) return null;
      const res = await axiosPublic.get(`/events/${eventId}`);
      return res.data.data;
    },
    enabled: !!eventId, // Only fetch when eventId exists
    staleTime: 1000 * 60 * 5 // 5 minutes cache
  });
};

export default useEventDetails;