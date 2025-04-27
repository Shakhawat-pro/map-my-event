import { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import useAllEvents from "../../hooks/useAllEvents";
import { FaTrashAlt, FaCalendarAlt, FaEye, FaCheck, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageEvents = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [titleFilter, setTitleFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [badgeFilter, setBadgeFilter] = useState('');
    const { events, totalEvents, totalPages, isLoading, refetch } = useAllEvents(currentPage, 10, { title: titleFilter, status: statusFilter, statusBadge: badgeFilter });

    console.log(totalEvents);



    const axiosSecure = useAxiosSecure();


    const handleSuccess = () => {
        refetch(); // Always refetch after successful operation
    };

    const approveEvent = (event) => {
        Swal.fire({
            title: "Approve this event?",
            text: "This will make the event visible to all users",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, approve it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/events/approve/${event._id}`)
                    .then(res => {
                        if (res.data.success) {
                            handleSuccess();
                            Swal.fire({
                                title: "Approved!",
                                text: "The event has been approved.",
                                icon: "success"
                            });
                            refetch();
                        } else {
                            Swal.fire({
                                title: "Error",
                                text: res.data.message || "Failed to approve event",
                                icon: "error"
                            });
                        }
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error",
                            text: error.response?.data?.message || "Failed to approve event",
                            icon: "error"
                        });
                    });
            }
        });
    };

    const rejectEvent = (event) => {
        Swal.fire({
            title: "Reject this event?",
            text: "This will remove the event from the system",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reject it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/events/reject/${event._id}`)
                    .then(res => {
                        if (res.data.success) {
                            handleSuccess();
                            Swal.fire({
                                title: "Rejected!",
                                text: "The event has been removed.",
                                icon: "success"
                            });
                            refetch();
                        } else {
                            Swal.fire({
                                title: "Error",
                                text: res.data.message || "Failed to reject event",
                                icon: "error"
                            });
                        }
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error",
                            text: error.response?.data?.message || "Failed to reject event",
                            icon: "error"
                        });
                    });
            }
        });
    };

    const deleteEvent = (id) => {
        Swal.fire({
            title: "Delete this event?",
            text: "This cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/events/${id}`)
                    .then(res => {
                        if (res.data.success) {
                            handleSuccess();
                            Swal.fire({
                                title: "Deleted!",
                                text: "The event has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        } else {
                            Swal.fire({
                                title: "Error",
                                text: res.data.message || "Failed to delete event",
                                icon: "error"
                            });
                        }
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error",
                            text: error.response?.data?.message || "Failed to delete event",
                            icon: "error"
                        });
                    });
            }
        });
    };

    const updateStatusBadge = (eventId, newStatus) => {
        axiosSecure.patch(`/events/statusBadge/${eventId}`, { statusBadge: newStatus })
            .then(res => {
                console.log(res);
                
                if (res.status == 200) {
                    handleSuccess();
                    Swal.fire({
                        title: 'Updated!',
                        text: `Status badge changed to "${newStatus}"`,
                        icon: 'success',
                    });
                    refetch();
                } else {
                    Swal.fire({
                        title: "Error",
                        text: res.data.message || "Failed to update status badge",
                        icon: "error"
                    });
                }
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error",
                    text: error.response?.data?.message || "Failed to update status badge",
                    icon: "error"
                });
            });
    };


    const viewEvent = (id) => {
        // console.log(`Viewing event ${id}`);
        navigate(`/event/${id}`)
        // TODO: Implement view functionality
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="max-w-screen-xl p-3 sm:w-10/12 mx-auto">
            <SectionTitle heading={"All Events"} subHeading={'Manage all events'}></SectionTitle>
            <div className="shadow-2xl p-5 rounded-md mb-10">

                <div className="sm:text-2xl md:text-4xl my-6 font-bold cinzel text-center ">
                    <div className="space-y-2">
                        <h2>Total Events: {totalEvents}</h2>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 mt-5">
                        <input
                            type="text"
                            placeholder="Search by Title"
                            value={titleFilter}
                            onChange={(e) => { setTitleFilter(e.target.value); setCurrentPage(1); }}
                            className="input input-bordered w-full max-w-xs"
                        />
                        <select
                            value={statusFilter}
                            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                            className="select select-bordered w-full max-w-xs"
                        >
                            <option value="">All Status</option>
                            <option value="approved">Approved</option>
                            <option value="pending">Pending</option>
                            <option value="rejected">Rejected</option>
                        </select>
                        <select
                            value={badgeFilter}
                            onChange={(e) => { setBadgeFilter(e.target.value); setCurrentPage(1); }}
                            className="select select-bordered w-full max-w-xs"
                        >
                            <option value="">All Status Badge</option>
                            <option value="New">New</option>
                            <option value="Upcoming">Upcoming</option>
                            <option value="Closing Soon">Closing Soon</option>
                            <option value="Ended">Ended</option>
                        </select>

                    </div>
                </div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        <div className="overflow-x-auto rounded-t-lg ">
                            <table className="table table-zebra">
                                <thead>
                                    <tr className="bg-gradient-to-r from-primary to-secondary text-white uppercase inter">
                                        <th></th>
                                        <th>Title</th>
                                        <th>Location</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Status Badge</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {events.map((event, index) => (
                                        <tr key={event._id}>
                                            <th>{(currentPage - 1) * 10 + index + 1}</th>
                                            <td className="font-bold">{event.title.en}</td>
                                            <td>{event.location}</td>
                                            <td>{new Date(event.startDate).toLocaleDateString()}</td>
                                            <td className=" ">
                                                <span className={`badge ${event.status === 'approved' ?
                                                    'bg-emerald-100 text-emerald-800' :
                                                    event.status === 'pending' ?
                                                        'bg-amber-100 text-amber-800' :
                                                        'bg-rose-100 text-rose-800'}`}>
                                                    {event.status}
                                                </span>
                                            </td>
                                            <td className=" ">
                                                <select
                                                    className={`px-3 py-1.5 rounded-md text-sm font-semibold focus:outline-none focus:ring-2
                                                      ${event.statusBadge === 'New' && 'bg-blue-100 text-blue-800'}
                                                      ${event.statusBadge === 'Upcoming' && 'bg-yellow-100 text-yellow-800'}
                                                      ${event.statusBadge === 'Closing Soon' && 'bg-orange-100 text-orange-800'}
                                                      ${event.statusBadge === 'Ended' && 'bg-red-100 text-red-800'}
                                                     `}
                                                    value={event.statusBadge}
                                                    onChange={(e) => updateStatusBadge(event._id, e.target.value)}
                                                >
                                                    <option value="New">New</option>
                                                    <option value="Upcoming">Upcoming</option>
                                                    <option value="Closing Soon">Closing Soon</option>
                                                    <option value="Ended">Ended</option>
                                                </select>
                                            </td>

                                            <td >
                                                <div className="flex items-center gap-2 h-full">
                                                    <button
                                                        onClick={() => viewEvent(event._id)}
                                                        className="btn btn-sm bg-blue-100 text-blue-800 hover:bg-blue-200"
                                                        title="View"
                                                    >
                                                        <FaEye />
                                                    </button>
                                                    {event.status === 'pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => approveEvent(event)}
                                                                className="btn btn-sm bg-green-100 text-green-800 hover:bg-green-200"
                                                                title="Approve"
                                                            >
                                                                <FaCheck />
                                                            </button>
                                                            <button
                                                                onClick={() => rejectEvent(event)}
                                                                className="btn btn-sm bg-orange-100 text-orange-800 hover:bg-orange-200"
                                                                title="Reject"
                                                            >
                                                                <FaTimes />
                                                            </button>
                                                        </>
                                                    )}
                                                    <button
                                                        onClick={() => deleteEvent(event._id)}
                                                        className="btn btn-sm bg-red-100 text-red-800 hover:bg-red-200"
                                                        title="Delete"
                                                    >
                                                        <FaTrashAlt />
                                                    </button>
                                                </div>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-center mt-4">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageEvents;