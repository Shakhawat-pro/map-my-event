import React from 'react';
import { Links, NavLink } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className='md:h-[calc(100vh-100px)] flex flex-col justify-center  items-center gap-20 mx-2'>
            <div className='mx-auto py-[40px] text-center max-md:mt-20'>
                <h1 className='text-3xl font-bold mb-4'>Looking for an event or want to post one?</h1>
                <div className='flex max-[360px]:flex-col max-[360px]:mt-5 gap-2 md:gap-5 items-center justify-center'>
                    <NavLink to={"map"}>
                        <button className='btn-grad text-white rounded-[10px] w-[170px] text-lg py-2 font-semibold hover:scale-115 cursor-pointer'>Find an event</button>
                    </NavLink>
                    <button className='rounded-[10px] bg-white border-1 border-black w-[170px] text-lg py-2 font-semibold hover:scale-115 duration-300  cursor-pointer'>Post an event</button>
                </div>

            </div>
            <div className='max-w-[1350px] mx-auto  w-full'>
                <div className="flex flex-col md:flex-row items-stretch justify-between p-4 mx-auto gap-3">
                    {/* Upcoming Event Card */}
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 md:max-w-[350px] w-full ">
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Upcoming Event</div>
                        <h2 className="text-xl font-bold text-gray-900 mb-1">EGOS 2025 - Paris</h2>
                        <p className="text-base text-gray-600">July 2–5</p>
                    </div>

                    {/* Popular Topic Card */}
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 md:max-w-[350px]   w-full ">
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Popular Topic</div>
                        <h2 className="text-xl font-bold text-gray-900 mb-1">Management & Strategy</h2>
                    </div>

                    {/* Deadline Alert Card */}
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 md:max-w-[350px]  w-full ">
                        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Deadline Alert</div>
                        <h2 className="text-xl font-bold text-gray-900 mb-1">Submit to AIMS 2025</h2>
                        <p className="text-base text-gray-600">by March 30</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;