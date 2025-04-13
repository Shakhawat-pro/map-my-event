import React, { useState } from 'react';
import SectionTitle from '../../components/SectionTitle';
import { FiEdit } from 'react-icons/fi';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const ManageHomePage = () => {
    const axiosPublic = useAxiosPublic();

    const [modalOpen, setModalOpen] = useState(false);
    const [newItemTitle, setNewItemTitle] = useState('');
    const [newItemDate, setNewItemDate] = useState('');
    const [modalType, setModalType] = useState('');

    // Fetch Deadline Data
    const { data: deadlines = [], refetch: refetchDeadlines } = useQuery({
        queryKey: ['deadlines'],
        queryFn: async () => {
            const res = await axiosPublic.get('/homePage/deadlines');
            return res.data.data;
        }
    });

    // Fetch Upcoming Events
    const { data: upcomingEvents = [], refetch: refetchEvents } = useQuery({
        queryKey: ['upcomingEvents'],
        queryFn: async () => {
            const res = await axiosPublic.get('/homePage/upcoming-events');
            return res.data.data;
        }
    });

    // Fetch Popular Topics
    const { data: popularTopics = [], refetch: refetchTopics } = useQuery({
        queryKey: ['popularTopics'],
        queryFn: async () => {
            const res = await axiosPublic.get('/homePage/popular-topics');
            return res.data.data;
        }
    });

    const openModal = (type) => {
        setModalType(type);
        setNewItemTitle('');
        setModalOpen(true);
    };

    const handleSubmit = async () => {
        if (!newItemTitle) return Swal.fire({
            title: "Error",
            text: "Please enter a title",
            icon: "error"
        });

        let endpoint = '';
        if (modalType === 'upcomingEvents') endpoint = '/homePage/upcoming-events';
        else if (modalType === 'deadlines') endpoint = '/homePage/deadlines';
        else if (modalType === 'popularTopics') endpoint = '/homePage/popular-topics';

        try {
            const payload = { title: newItemTitle, date: newItemDate };
            const res = await axiosPublic.post(endpoint, payload);
            if (res.data.success) {
                Swal.fire({
                    title: "Success!",
                    text: "Added successfully",
                    icon: "success"
                });
                if (modalType === 'upcomingEvents') refetchEvents();
                else if (modalType === 'deadlines') refetchDeadlines();
                else if (modalType === 'popularTopics') refetchTopics();

                setModalOpen(false);
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error",
                text: "Failed to add",
                icon: "error"
            });
        }
    };


    const handleDelete = async (id, type) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });
        if (!result.isConfirmed) return;

        let endpoint = '';
        if (type === 'upcomingEvents') endpoint = `/homePage/upcoming-events/${id}`;
        else if (type === 'deadlines') endpoint = `/homePage/deadlines/${id}`;
        else if (type === 'popularTopics') endpoint = `/homePage/popular-topics/${id}`;

        try {
            const res = await axiosPublic.delete(endpoint);
            if (res.data.success) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Item has been deleted.",
                    icon: "success"
                });
                if (type === 'upcomingEvents') refetchEvents();
                else if (type === 'deadlines') refetchDeadlines();
                else if (type === 'popularTopics') refetchTopics();
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error",
                text: "Failed to delete",
                icon: "error"
            });
        }
    };

    return (
        <div className='max-w-screen-xl w-10/12 mx-auto'>
            {/* Upcoming Events */}
            <SectionTitle heading={"Upcoming Event"} subHeading={"Manage All Upcoming Events"} />
            <div className="shadow-2xl p-5 rounded-md mb-10 border-2 border-base-200">
                <div className="flex justify-end mb-2">
                    <button onClick={() => openModal('upcomingEvents')} className="btn btn-outline btn-primary">
                        <FiEdit className='text-lg' /> Add Topic
                    </button>
                </div>
                <div className="overflow-x-auto rounded-t-lg font-semibold">
                    <table className="table table-zebra">
                        <thead>
                            <tr className="bg-gradient-to-r from-primary to-secondary text-white uppercase inter">
                                <th></th>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {upcomingEvents.map((event, index) => (
                                <tr key={event._id}>
                                    <th>{index + 1}</th>
                                    <td>{event.title}</td>
                                    <td>{event.date || '-'}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(event._id, 'upcomingEvents')}
                                            className="btn btn-outline text-red-600 btn-sm font-semibold"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Deadlines */}
            <SectionTitle heading={"Deadline"} subHeading={"Manage All Events Deadline"} />
            <div className="shadow-2xl p-5 rounded-md mb-10 border-2 border-base-200">
                <div className="flex justify-end mb-2">
                    <button onClick={() => openModal('deadlines')} className="btn btn-outline btn-primary">
                        <FiEdit className='text-lg' /> Add Topic
                    </button>
                </div>
                <div className="overflow-x-auto rounded-t-lg font-semibold">
                    <table className="table table-zebra">
                        <thead>
                            <tr className="bg-gradient-to-r from-primary to-secondary text-white uppercase inter">
                                <th></th>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deadlines.map((deadline, index) => (
                                <tr key={deadline._id}>
                                    <th>{index + 1}</th>
                                    <td>{deadline.title}</td>
                                    <td>{deadline.deadline || '-'}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(deadline._id, 'deadlines')}
                                            className="btn btn-outline text-red-600 btn-sm font-semibold"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Popular Topics */}
            <SectionTitle heading={"Popular Topic"} subHeading={"Manage All Popular Topic"} />
            <div className="shadow-2xl p-5 rounded-md mb-10 border-2 border-base-200">
                <div className="flex justify-end mb-2">
                    <button onClick={() => openModal('popularTopics')} className="btn btn-outline btn-primary">
                        <FiEdit className='text-lg' /> Add Topic
                    </button>
                </div>
                <div className="overflow-x-auto rounded-t-lg font-semibold">
                    <table className="table table-zebra">
                        <thead>
                            <tr className="bg-gradient-to-r from-primary to-secondary text-white uppercase inter">
                                <th></th>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {popularTopics.map((topic, index) => (
                                <tr key={topic._id}>
                                    <th>{index + 1}</th>
                                    <td>{topic.title}</td>
                                    <td>-</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(topic._id, 'popularTopics')}
                                            className="btn btn-outline text-red-600 btn-sm font-semibold"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for Adding Item */}
            {modalOpen && (
                <div className="fixed inset-0 bg-[#02020293]  flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <h3 className="text-xl font-semibold mb-4 capitalize">Add New {modalType.replace(/([A-Z])/g, ' $1')}</h3>

                        <input
                            type="text"
                            placeholder="Enter Title"
                            className="input input-bordered w-full mb-4"
                            value={newItemTitle}
                            onChange={(e) => setNewItemTitle(e.target.value)}
                        />

                        {/* Conditionally render the date input for specific modal types */}
                        {(modalType === 'upcomingEvents' || modalType === 'deadlines') && (
                            <input
                                type="text"
                                placeholder="Enter Date (e.g. 12 April 2025)"
                                className="input input-bordered w-full mb-4"
                                value={newItemDate}
                                onChange={(e) => setNewItemDate(e.target.value)}
                            />
                        )}


                        <div className="flex justify-end gap-3">
                            <button onClick={() => setModalOpen(false)} className="btn btn-outline">Cancel</button>
                            <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ManageHomePage;
