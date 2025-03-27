import React from 'react';
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiExternalLink } from 'react-icons/fi';
import { IoLocationOutline } from "react-icons/io5";

const EventCard = () => {
    return (
        <div className="flex flex-col lg:flex-row justify-between gap-2 border-1 border-base-300 rounded-2xl shadow-sm overflow-hidden p-4">
            {/* <img className="h-20 w-20 rounded-full object-cover" src={`/conImg.png`} alt="Event" /> */}
            <div className='bg-[#f1e8fc] w-28 h-[70px] flex items-center justify-center rounded-full '>
                <FaRegCalendarAlt className="text-2xl text-[#8642d4]" />
            </div>
            <div>
                <div className='flex justify-between'>
                    <div>
                        <h1 className="text-xl font-bold text-gray-800 ">AIMS Conference 2025</h1>
                        <ul className="space-y-1">
                            <li className="flex items-center">
                                <li className="ml-2 flex items-center justify-center gap-2 text-gray-700"><FaRegCalendarAlt />July 2–5, 2025</li>
                            </li>
                            <li className="flex items-center">
                                <span className="ml-2 flex items-center justify-center gap-1 text-gray-700"><IoLocationOutline className="text-xl -ml-[1px]" />Paris, University Dauphine</span>
                            </li>
                        </ul>
                    </div>
                    <div className='space-y-2 flex items-center justify-center  h-fit gap-2 max-lg:hidden'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#8642d4" viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>

                        <button className="px-4 py-2 bg-white text-black border-1 border-base-300  shadow-xs flex flex-row items-center justify-center gap-1 rounded-lg">
                            More info <FiExternalLink />
                        </button>
                    </div>
                </div>
                <p className="text-gray-600 my-2">
                    The annual AIMS conference brings together scholars and professionals to discuss the latest research in strategic management, sustainability, and innovation.
                </p>
                <div className="flex flex-wrap md: gap-1">
                    <span className="px-3 py-1 bg-[#f1e8fc] text-[#6810cc] font-medium rounded-full text-sm">Strategy</span>
                    <span className="px-3 py-1 bg-[#dfeafd] text-[#0028ee] font-medium rounded-full text-sm">Sustainability</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 font-medium rounded-full text-sm">Academic</span>
                </div>
                <div className='space-y-2 flex flex-row-reverse items-center mt-3  h-fit gap-2 lg:hidden'>
                        <button className="px-4 py-2 bg-white text-black border-1 border-base-300  shadow-xs flex flex-row items-center justify-center gap-1 rounded-lg">
                            More info <FiExternalLink />
                        </button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#8642d4" viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                    </div>
            </div>

        </div>
    );
};

export default EventCard;