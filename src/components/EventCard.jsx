import React from 'react';
import Swal from "sweetalert2";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiExternalLink } from 'react-icons/fi';
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event, setSelectedEvent }) => {
    const navigate = useNavigate();

    
    const handleClick = () => {
        if (event.format === "Online" || !event.coordinates) {
            Swal.fire({
                icon: "warning",
                title: "Event Location Not Available",
                text: "This event is online or does not have a valid location.",
                buttonsStyling: false,
                confirmButtonText: `<span class="text-white btn-grad  btn  rounded-md hover:scale-110  ">OK</span>`,

            });
        } else {
            
            setSelectedEvent(event);
        }
    };
    
    const handleNavigate = (id) => {
        navigate(`/event/${id}`)
    }


    const formatEventDates = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        // console.log(start);


        // If same exact date (single-day event)
        if (startDate === endDate) {
            return start.toLocaleString('default', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
        }

        // If same month and year
        if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
            const month = start.toLocaleString('default', { month: 'long' });
            const startDay = start.getDate();
            const endDay = end.getDate();
            const year = start.getFullYear();
            return `${month} ${startDay}–${endDay}, ${year}`;
        }

        // Different months or years - format differently
        return `${start.toLocaleDateString()} – ${end.toLocaleDateString()}`;
    };

    return (
        <div onClick={handleClick} className="flex flex-col lg:flex-row justify-between gap-2 border-1 border-base-300 rounded-2xl shadow-sm overflow-hidden p-4 w-full bg-white hover:shadow-lg transition duration-300 ease-in-out cursor-pointer ">
            {/* <img className="h-20 w-20 rounded-full object-cover" src={`/conImg.png`} alt="Event" /> */}
            {/* <div className='bg-[#f1e8fc] w-28 h-[70px] flex items-center justify-center rounded-full '>
                <FaRegCalendarAlt className="text-2xl text-[#8642d4]" />
            </div> */}
            <div className='2 w-full'>
                <div className='flex justify-between w-full'>
                    <div>
                        <span className={`px-2.5 py-1 rounded-full text-xs border-1 font-semibold flex items-center gap-1 w-fit min-[450px]:hidden mb-3 ${event.statusBadge === "Upcoming"
                            ? "bg-blue-50/80 text-blue-700"
                            : event.statusBadge === "Closing Soon"
                                ? "bg-amber-50/80 text-amber-700"
                                : "bg-green-50/80 text-green-700"
                            }`}>
                            {event.statusBadge === "Upcoming" && (
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                            )}
                            {event.statusBadge === "Closing Soon" && (
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                            )}
                            {event.statusBadge === "New" && (
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            )}
                            {event.statusBadge}
                        </span>
                        <h1 className="text-xl font-bold text-gray-800 ">{event.title}</h1>
                        <ul className="space-y-1 mt-2">
                            <li className="flex items-center">
                                <span className="max-[350px]:ml-1 ml-2 flex items-center justify-center gap-2 text-gray-700"><FaRegCalendarAlt />
                                    {event?.startDate
                                        ? formatEventDates(event.startDate, event.endDate || event.startDate)
                                        : 'Date not available'}
                                    <span className={`px-2.5 py-1 rounded-full text-xs border-1 font-semibold flex items-center gap-1 max-[450px]:hidden ${event.statusBadge === "Upcoming"
                                        ? "bg-blue-50/80 text-blue-700"
                                        : event.statusBadge === "Closing Soon"
                                            ? "bg-amber-50/80 text-amber-700"
                                            : "bg-green-50/80 text-green-700"
                                        }`}>
                                        {event.statusBadge === "Upcoming" && (
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                        {event.statusBadge === "Closing Soon" && (
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                        {event.statusBadge === "New" && (
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                        {event.statusBadge}
                                    </span>
                                </span>
                            </li>
                            <li className="flex items-center">
                                <span className="max-[350px]:ml-1 ml-1.5 flex items-center justify-center gap-1 text-gray-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                                    {event.location} ({event.format})</span>
                            </li>
                        </ul>
                    </div>
                    <div className='space-y-2 flex items-center justify-center  h-fit gap-2 max-lg:hidden'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#8642d4" viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>

                        <button
                            onClick={() => handleNavigate(event._id)}
                            className="whitespace-nowrap px-4 py-2 bg-white text-black border-1 border-base-300 shadow-xs flex flex-row items-center justify-center gap-1 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer hover:border-black hover:shadow-xl"
                        >
                            More info <FiExternalLink />
                        </button>
                    </div>
                </div>
                <p className="text-gray-600 my-2 ml-1">
                    {event.description.length > 100 ? `${event.description.slice(0, 100)}...` : event.description}
                </p>
                <div className="flex flex-wrap gap-1">
                    {event?.tags?.map((tag, index) => {
                        // Color classes based on position
                        const colorClasses = [
                            'bg-[#f1e8fc] text-[#6810cc]', // (first tag)
                            'bg-[#dfeafd] text-[#0028ee]', // (second tag)
                            'bg-gray-100 text-gray-700'     //  (third tag)
                        ];
                        // Use modulo to cycle through colors if more than 3 tags
                        const colorClass = colorClasses[index % colorClasses.length];
                        return (
                            <span
                                key={index}
                                className={`px-3 py-1 ${colorClass} font-medium rounded-full text-sm`}>
                                {tag}
                            </span>
                        );
                    })}
                </div>
                <div className='space-y-2 flex flex-row  items-center h-fit gap-2 lg:hidden mt-5'>
                    <button
                        onClick={() => handleNavigate(event._id)}
                        className="px-4 py-2 m-0 bg-white text-black border-1 border-base-300 shadow-xs flex flex-row items-center justify-center gap-1 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer hover:border-black hover:shadow-xl"
                    >
                        More info <FiExternalLink />
                    </button>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#8642d4" viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className="size-7 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                </div>
            </div>

        </div>
    );
};

export default EventCard;