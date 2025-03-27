import React from 'react';
import { Links, NavLink } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <div className='relative'>
                <img className='w-full h-[300px] z-0 object-cover object-center' loading='eager' src="https://cdn.hellobio.com/media/amasty/blog/cache/T/e/648/339/Ten_Science_Conferences_to_Attend_18_.png" alt="" srcset="" />
                <div className='absolute top-8/12 left-1/2 -translate-x-1/2 z-10 bg-white max-w-xl w-full rounded-4xl shadow-2xl mx-auto py-[40px] text-center flex flex-col gap-3 items-center justify-center'>
                    <h1 className='text-xl font-bold mb-3'>Looking for an event or want to post one?</h1>
                    <NavLink to={"map"}>
                        <button className='btn-grad text-white rounded-full w-[170px] text-lg py-2 font-semibold hover:scale-115 cursor-pointer'>Find an event</button>
                    </NavLink>
                    <hr className='w-10 border-3 border-base-300' />
                    <button className='rounded-full bg-white border-1 border-black w-[170px] text-lg py-2 font-semibold hover:scale-105 cursor-pointer'>Post an event</button>
                </div>

            </div>

        </div>
    );
};

export default HomePage;