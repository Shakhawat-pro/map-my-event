import React from 'react';

import { FaPlus } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';
const Navbar = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm px-5 nav-container">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><NavLink to={'map'}>Map</NavLink></li>

                    </ul>
                </div>
                <a className="btn btn-ghost text-2xl text-gradient font-bold raleway italic ">FindMyEvent</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><NavLink to={'/'} className={"border-2 border-transparent"}>Home</NavLink></li>
                    <li><NavLink to={'map'} className={"border-2 border-transparent"}>Map</NavLink></li>
                    <li><NavLink to={"item"} className={"border-2 border-transparent"}> Item3</NavLink></li>
                </ul>
            </div>
            <div className="navbar-end space-x-5">
                <div>
                    <button className='flex justify-center items-center gap-2 btn-grad px-3 py-2 hover:scale-105 cursor-pointer'>
                        <FaPlus className='text-xl' />
                        <h1 className=''>Post a event</h1>
                    </button>



                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>  </div>
        </div>
    );
};

export default Navbar;