import React, { useEffect, useState } from 'react';
import { FaUsers, FaCalendarCheck, FaCalendarTimes, FaCalendarAlt, FaClock, FaCheckCircle, FaTimesCircle, FaHourglassHalf } from 'react-icons/fa';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const AdminHome = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosPublic = useAxiosPublic()

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axiosPublic.get('admin/dashboard-stats');
                setStats(response.data.stats);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch dashboard statistics');
                setLoading(false);
            }
        };

        fetchStats();
    }, [axiosPublic]);

    if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>;
    if (error) return <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert"><p>{error}</p></div>;
    if (!stats) return null;

    // Helper function to create stat cards
    const StatCard = ({ icon, title, value, bgColor, textColor }) => (
        <div className={`rounded-lg shadow-md p-6 ${bgColor} ${textColor} flex flex-col`}>
            <div className="flex items-center mb-4">
                <div className="mr-3 text-2xl">
                    {icon}
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <p className="text-3xl font-bold">{value}</p>
        </div>
    );

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
            
            {/* Overview Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard 
                    icon={<FaUsers className="text-blue-500" />} 
                    title="Total Users" 
                    value={stats.users.total} 
                    bgColor="bg-white" 
                    textColor="text-gray-800" 
                />
                <StatCard 
                    icon={<FaCalendarAlt className="text-green-500" />} 
                    title="Total Events" 
                    value={stats.events.total} 
                    bgColor="bg-white" 
                    textColor="text-gray-800" 
                />
                <StatCard 
                    icon={<FaCalendarCheck className="text-purple-500" />} 
                    title="Approved Events" 
                    value={stats.events.approved} 
                    bgColor="bg-white" 
                    textColor="text-gray-800" 
                />
            </div>

            {/* Events Breakdown */}
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Events Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard 
                        icon={<FaHourglassHalf className="text-yellow-500" />} 
                        title="Pending" 
                        value={stats.events.pending} 
                        bgColor="bg-yellow-50" 
                        textColor="text-yellow-800" 
                    />
                    <StatCard 
                        icon={<FaTimesCircle className="text-red-500" />} 
                        title="Rejected" 
                        value={stats.events.rejected} 
                        bgColor="bg-red-50" 
                        textColor="text-red-800" 
                    />
                    <StatCard 
                        icon={<FaClock className="text-blue-500" />} 
                        title="Upcoming" 
                        value={stats.events.upcoming} 
                        bgColor="bg-blue-50" 
                        textColor="text-blue-800" 
                    />
                    <StatCard 
                        icon={<FaCheckCircle className="text-green-500" />} 
                        title="New (7 days)" 
                        value={stats.events.new} 
                        bgColor="bg-green-50" 
                        textColor="text-green-800" 
                    />
                </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                    icon={<FaCalendarTimes className="text-gray-500" />} 
                    title="Ended Events" 
                    value={stats.events.ended} 
                    bgColor="bg-gray-50" 
                    textColor="text-gray-800" 
                />
                <StatCard 
                    icon={<FaClock className="text-orange-500" />} 
                    title="Closing Soon" 
                    value={stats.events.closingSoon} 
                    bgColor="bg-orange-50" 
                    textColor="text-orange-800" 
                />
                <StatCard 
                    icon={<FaUsers className="text-indigo-500" />} 
                    title="Admin Users" 
                    value={stats.users.admin} 
                    bgColor="bg-indigo-50" 
                    textColor="text-indigo-800" 
                />
            </div>
        </div>
    );
};

export default AdminHome;