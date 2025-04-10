import React from 'react';

const AdminHome = () => {
    const dummyStats = [
        { title: 'Total Users', value: 1254, change: '+12%' },
        { title: 'Total Events', value: 342, change: '+5%' },
        { title: 'Active Events', value: 128, change: '-3%' },
        { title: 'Revenue', value: '$12,540', change: '+8%' }
    ];

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {dummyStats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-gray-500">{stat.title}</h3>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                            {stat.change} from last month
                        </p>
                    </div>
                ))}
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map(item => (
                        <div key={item} className="border-b pb-3">
                            <p className="text-gray-600">User #{item} created a new event</p>
                            <p className="text-sm text-gray-400">2 hours ago</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminHome;