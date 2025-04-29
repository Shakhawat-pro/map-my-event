import { useContext, useState } from "react";
import SectionTitle from "../../components/SectionTitle";
import useAllEvents from "../../hooks/useAllEvents";
import { FaTrashAlt, FaEdit, FaEye, FaCheck, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import UpdateEventAdmin from "../../components/UpdateEventAdmin";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../context/AuthContext";
import { useQueryClient } from '@tanstack/react-query';


const ManageEvents = () => {
    const { t } = useTranslation();
    const { user: currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [titleFilter, setTitleFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [badgeFilter, setBadgeFilter] = useState('');
    const { events, totalEvents, totalPages, isLoading, refetch } = useAllEvents(currentPage, 10, { title: titleFilter, status: statusFilter, statusBadge: badgeFilter });
    const [AdminEditingEvent, setAdminEditingEvent] = useState(null);
    const queryClient = useQueryClient();


    console.log(totalEvents);



    const axiosSecure = useAxiosSecure();


    const handleSuccess = () => {
        refetch(); // Always refetch after successful operation
    };

    const updateMutation = useMutation({
        mutationFn: (updatedEvent) =>
            axiosSecure.patch(`/events/admin/${updatedEvent._id}?email=${currentUser?.email}`, updatedEvent),
        onSuccess: () => {
            queryClient.invalidateQueries(['userEvents', currentUser?.email]);
            setAdminEditingEvent(null);
            Swal.fire(t('user_events.update_success.title'), t('user_events.update_success.message'), 'success');
        },
        onError: (error) => {
            console.log(error);
            
            Swal.fire(t('common.error'), error.response?.data?.message || t('user_events.update_error'), 'error');
        }
    });

    const handleEdit = (event) => {
        setAdminEditingEvent(event);
    };

    const handleCancelEdit = () => {
        setAdminEditingEvent(null);
    };
    const updateEventStatus = (eventId, newStatus) => {
        Swal.fire({
            title: `Set status to ${newStatus}?`,
            text: `This will change the event's approval status to "${newStatus}"`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: `Yes, set to ${newStatus}`
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/events/updateEventStatus/${eventId}`, { status: newStatus })
                    .then(res => {
                        console.log(res);
                        if (res.data.success) {
                            handleSuccess();
                            Swal.fire({
                                title: 'Updated!',
                                text: `Status changed to "${newStatus}"`,
                                icon: 'success',
                            });
                            refetch();
                        } else {
                            Swal.fire({
                                title: "Error",
                                text: res.data.message || "Failed to update status",
                                icon: "error"
                            });
                        }
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Error",
                            text: error.response?.data?.message || "Failed to update status",
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


    if (AdminEditingEvent) {
        return (
            <UpdateEventAdmin
                event={AdminEditingEvent}
                onCancel={handleCancelEdit}
                onSubmit={(updatedEvent) => updateMutation.mutate(updatedEvent)}
            />
        );
    }

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
                                            <td className="flex flex-col">
                                                <span className="font-bold mb-1.5">  {event.title.en}</span>
                                                ( {event.submittedBy} )

                                            </td>
                                            <td>
                                                {event.location || "Online"}
                                            </td>
                                            <td>{new Date(event.startDate).toLocaleDateString()}</td>
                                            {/* Replace the approve/reject buttons with this dropdown */}
                                            <td className=" ">
                                                <select
                                                    className={`px-3 py-1.5 rounded-md text-sm font-semibold focus:outline-none focus:ring-2
                                                               ${event.status === 'approved' && 'bg-emerald-100 text-emerald-800'}
                                                               ${event.status === 'pending' && 'bg-amber-100 text-amber-800'}
                                                              ${event.status === 'rejected' && 'bg-rose-100 text-rose-800'}
                                                              `}
                                                    value={event.status}
                                                    onChange={(e) => updateEventStatus(event._id, e.target.value)}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="approved">Approved</option>
                                                    <option value="rejected">Rejected</option>
                                                </select>
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
                                                    <button
                                                        onClick={() => handleEdit(event)}
                                                        className="btn btn-sm bg-green-100 text-green-800 hover:bg-green-200"
                                                        title="Edit"
                                                    >
                                                        <FaEdit />
                                                    </button>
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