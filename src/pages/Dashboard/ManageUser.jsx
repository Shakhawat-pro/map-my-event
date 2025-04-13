import { FaTrashAlt, FaUsers } from "react-icons/fa";
import SectionTitle from "../../components/SectionTitle";
// import useUsers from "../../hooks/useUsers";
import Swal from "sweetalert2";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
import { GrUserAdmin } from "react-icons/gr";
import ReactPaginate from 'react-paginate';
import { useState } from "react";
import useAllUsers from "../../hooks/useAllUsers";
import useAxiosPublic from "../../hooks/useAxiosPublic";
// import './page.css'

const ManageUser = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { users, totalUsers, totalPages, isLoading } = useAllUsers(currentPage);
    console.log({users});
    
    // const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const handlePageClick = (event) => {
        setCurrentPage(event.selected + 1);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/users/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            // refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    const handleMakeAdmin = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to change this user to admin!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Change it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/users/admin/${item._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            // refetch();
                            Swal.fire({
                                title: "Success!",
                                text: "Role has been changed to Admin.",
                                icon: "success"
                            });
                        } else {
                            Swal.fire({
                                title: "Error",
                                text: "The role change was not successful. Please try again.",
                                icon: "error"
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Error updating user role:', error);
                        Swal.fire({
                            title: "Error",
                            text: "There was an error updating the user role. Please try again.",
                            icon: "error",
                            footer: `${error.message}`
                        });
                    });
            }
        });
    };

    const handleRemoveAdmin = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to change this admin to Guest user!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Change it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.patch(`/users/guest/${item._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            // refetch();
                            Swal.fire({
                                title: "Success!",
                                text: "Role has been changed to Guest.",
                                icon: "success"
                            });
                        } else {
                            Swal.fire({
                                title: "Error",
                                text: "The role change was not successful. Please try again.",
                                icon: "error"
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Error updating user role:', error);
                        Swal.fire({
                            title: "Error",
                            text: "There was an error updating the user role. Please try again.",
                            icon: "error",
                            footer: `${error.message}`
                        });
                    });
            }
        });
    };

    return (
        <div className="max-w-screen-xl w-10/12 mx-auto ">

            <SectionTitle heading={"All users"} subHeading={'Manage all of your users'}></SectionTitle>
            <div className="shadow-2xl p-5 rounded-md mb-10 ">
                <div className="sm:text-2xl  md:text-4xl my-6 font-bold cinzel text-center">
                    <div className="space-y-2 ">
                        <h2>Total Users: {totalUsers} </h2>

                    </div>
                </div>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        <div className="overflow-x-auto rounded-t-lg ">
                            <table className="table table-zebra">
                                <thead>
                                    <tr className=" bg-gradient-to-r from-primary to-secondary text-white uppercase inter ">
                                        <th></th>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((item, index) => (
                                        <tr key={item._id}>
                                            <th>{index + 1}</th>
                                            <td className="">
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img className="object-top" src={item.profilePicture} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">{item.name}</div>
                                                        <div className="text-sm opacity-50">{item.email}</div>
                                                    </div>
                                                </div>
                                            </td>

                                            <td>
                                                {item.role === 'admin' ? (
                                                    <button
                                                        onClick={() => handleRemoveAdmin(item)}
                                                        className="btn btn-sm bg-green-100 text-green-800 hover:bg-green-200 tooltip"
                                                        data-tip="Admin"
                                                    >
                                                        <GrUserAdmin />
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleMakeAdmin(item)}
                                                        className="btn btn-sm bg-orange-100 text-orange-800 hover:bg-orange-200 tooltip"
                                                        data-tip="Guest user"
                                                    >
                                                        <FaUsers />
                                                    </button>
                                                )}
                                            </td>
                                            <th>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="btn btn-sm bg-red-100 text-red-800 hover:bg-red-200"
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </th>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-center mt-4">
                            <ReactPaginate
                                previousLabel={'Previous'}
                                nextLabel={'Next'}
                                breakLabel={'...'}
                                breakClassName={'break-me'}
                                pageCount={totalPages}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                containerClassName={'pagination'}
                                subContainerClassName={'pages pagination'}
                                activeClassName={'active'}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                                previousClassName={'page-item'}
                                previousLinkClassName={'page-link'}
                                nextClassName={'page-item'}
                                nextLinkClassName={'page-link'}
                                breakLinkClassName={'page-link'}
                                activeLinkClassName={'active'}

                            />
                        </div>
                    </div>
                )} 
            </div>
        </div>
    );
};

export default ManageUser;
