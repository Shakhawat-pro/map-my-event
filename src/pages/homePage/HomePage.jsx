import React from 'react';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';


const HomePage = () => {
  const axiosPublic = useAxiosPublic();


  const { data: deadlines, isLoading: deadlinesLoading } = useQuery({
    queryKey: ['deadlines'],
    queryFn: async () => {
      const res = await axiosPublic.get('/homePage/deadlines');
      return res.data.data;
    },
    staleTime: 5 * 60 * 1000 // 5 minutes
  });

  const { data: upcomingEvents, isLoading: eventsLoading } = useQuery({
    queryKey: ['upcomingEvents'],
    queryFn: async () => {
      const res = await axiosPublic.get('/homePage/upcoming-events');
      return res.data.data;
    },
    staleTime: 5 * 60 * 1000 // 5 minutes
  });

  const { data: topics, isLoading: topicsLoading } = useQuery({
    queryKey: ['topics'],
    queryFn: async () => {
      const res = await axiosPublic.get('/homePage/popular-topics');
      return res.data.data;
    },
    staleTime: 5 * 60 * 1000 // 5 minutes
  });

  const loading = deadlinesLoading || eventsLoading || topicsLoading;


  return (
    <div className='md:h-[calc(100vh-100px)] flex flex-col justify-center  items-center gap-20 mx-2'>
      <div className='mx-auto py-[40px] text-center max-md:mt-20'>
        <h1 className='text-3xl font-bold mb-4'>
          Looking for an event or want to post one?
        </h1>
        <div className='flex max-[360px]:flex-col max-[360px]:mt-5 gap-2 md:gap-5 items-center justify-center'>
          <NavLink to={"map"}>
            <button className='btn-grad text-white rounded-[10px] w-[170px] text-lg py-2 font-semibold hover:scale-115 cursor-pointer'>
              Find an event
            </button>
          </NavLink>
          <button className='rounded-[10px] bg-white border-1 border-black w-[170px] text-lg py-2 font-semibold hover:scale-115 duration-300 cursor-pointer'>
            Post an event
          </button>
        </div>
      </div>

      <div className='max-w-[1350px] mx-auto w-full'>
        <div className="flex flex-col md:flex-row items-stretch justify-between p-4 mx-auto gap-3">
          {/* Upcoming Event Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 md:max-w-[350px] w-full">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
              Upcoming Event
            </div>
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              autoplay={{ delay: 2000 }}
              modules={[Autoplay, Pagination]}
              className="mt-4"
            >
              {loading ? (
                <SwiperSlide className="flex justify-center items-center">
                  <div className="flex flex-col gap-4">
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                  </div>
                </SwiperSlide>
              ) : (
                upcomingEvents.map((item, index) => (
                  <SwiperSlide key={index}>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h2>
                    <p className="text-base text-gray-600">{item.date}</p>
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          </div>

          {/* Popular Topic Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 md:max-w-[350px] w-full">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
              Popular Topic
            </div>
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              autoplay={{ delay: 2200 }}
              modules={[Autoplay]}
              className="mt-4"
            >
              {loading ? (
                <SwiperSlide className="flex justify-center items-center">
                  <div className="flex flex-col gap-4">
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                  </div>
                </SwiperSlide>
              ) : (
                topics.map((item, index) => (
                  <SwiperSlide key={index}>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h2>
                  </SwiperSlide>
                ))
              )}
            </Swiper>
          </div>

          {/* Deadline Alert Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 md:max-w-[350px] w-full">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
              Deadline Alert
            </div>
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              autoplay={{ delay: 2500 }}
              modules={[Autoplay]}
              className="mt-4"
            >
              {loading ? (
                <SwiperSlide className="flex justify-center items-center">
                  <div className="flex flex-col gap-4">
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                  </div>
                </SwiperSlide>
              ) : (
                deadlines.map((item, index) => (
                  <SwiperSlide key={index} className="mb-4">
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{item.title}</h2>
                    <p className="text-base text-gray-600">{item.deadline}</p>
                  </SwiperSlide>
                )))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
