import { FaTrashAlt, FaUsers } from "react-icons/fa";
import SectionTitle from "../../components/SectionTitle";
import Swal from "sweetalert2";
import { GrUserAdmin } from "react-icons/gr";
import ReactPaginate from 'react-paginate';
import { useState } from "react";
import useAllUsers from "../../hooks/useAllUsers";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageUser = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ name: '', email: '', role: '' });
  const { users, totalUsers, totalPages, isLoading, refetch } = useAllUsers(currentPage, filters);
  console.log(users);
  
  const axiosSecure = useAxiosSecure();

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
        axiosSecure.delete(`/users/${id}`)
          .then(res => {
            if (res.data.success === true) {
              refetch();
              Swal.fire("Deleted!", "User has been deleted.", "success");
            } else {
              Swal.fire("Error", "The delete was not successful. Please try again.", "error");
            }
          })
          .catch(error => {
            Swal.fire("Error", `Something went wrong: ${error.response?.data?.message}`, "error");
          });
      }
    });
  };

  const handleMakeAdmin = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Make this user Admin?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/role/admin/${item._id}`)
          .then(res => {
            if (res.data.success === true) {
              refetch();
              Swal.fire("Success!", "User promoted to Admin.", "success");
            } else {
              Swal.fire("Error", "Role change failed.", "error");
            }
          });
      }
    });
  };

  const handleRemoveAdmin = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Demote this Admin to Guest?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/role/guest/${item._id}`)
          .then(res => {
            if (res.data.success === true) {
              refetch();
              Swal.fire("Success!", "User demoted to Guest.", "success");
            } else {
              Swal.fire("Error", "Role change failed.", "error");
            }
          });
      }
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    refetch();
  };

  return (
    <div className="max-w-screen-xl w-10/12 mx-auto">
      <SectionTitle heading={"All Users"} subHeading={"Manage all of your users"} />
      
      

      <div className="shadow-2xl p-5 rounded-md mb-10">
        <div className="text-2xl md:text-4xl font-bold text-center my-6">
          Total Users: {totalUsers}
        </div>
        {/* Filter Section */}
      <form onSubmit={handleFilterSubmit} className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Name"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          className="input input-bordered w-full md:w-1/3 mx-auto"
        />
        <input
          type="text"
          placeholder="Search by Email"
          name="email"
          value={filters.email}
          onChange={handleFilterChange}
          className="input input-bordered w-full md:w-1/3 mx-auto"
        />
        <select
          name="role"
          value={filters.role}
          onChange={handleFilterChange}
          className="select select-bordered w-full md:w-1/4 mx-auto"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">Guest</option>
        </select>
      </form>
        
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="overflow-x-auto rounded-t-lg">
              <table className="table table-zebra">
                <thead>
                  <tr className="bg-gradient-to-r from-primary to-secondary text-white uppercase">
                    <th>#</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              {item.profilePicture ? (
                                <img src={item.profilePicture} alt="User" />
                              ) : (
                                <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                  </svg>
                                </div>
                              )}
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
                            className="btn btn-sm bg-green-100 text-green-800 hover:bg-green-200"
                          >
                            <GrUserAdmin />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleMakeAdmin(item)}
                            className="btn btn-sm bg-orange-100 text-orange-800 hover:bg-orange-200"
                          >
                            <FaUsers />
                          </button>
                        )}
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="btn btn-sm bg-red-100 text-red-800 hover:bg-red-200"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
              <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageUser;
