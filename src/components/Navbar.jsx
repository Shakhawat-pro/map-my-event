import React, { useState } from 'react';

import { FaPlus } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';
const Navbar = () => {
    const [isFr, setIsFr] = useState(true);

    const navLink = <>
        <li><NavLink to={'/'} className={"border-2 border-transparent"}>Home</NavLink></li>
        <li><NavLink to={'map'} className={"border-2 border-transparent"}>Map</NavLink></li>
        <li><NavLink to={"item"} className={"border-2 border-transparent"}> Calender</NavLink></li>
    </>

    return (
        <div className="mx-auto navbar bg-base-100 shadow-sm p-1 md:px-5 nav-container      max-sm:justify-between">
            <div className="sm:navbar-start flex items-center gap-1 ">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navLink}

                    </ul>
                </div>
                <NavLink to={'/'} className="text-2xl text-gradient font-extrabold  italic font-serif">ConfMap</NavLink>
            </div>
            <div className="navbar-center hidden lg:flex items-center">
                <ul className="menu menu-horizontal px-1">
                    {navLink}
                </ul>
            </div>
            <div className="sm:navbar-end gap-1 min-[400px]:space-x-4 flex items-center">
                <div className={`w-20 h-10 flex items-center bg-black rounded-full p-1 cursor-pointer transition-all duration-300 scale-[70%] -mr-2.5 -ml-2.5 min-[400px]:-mr-1`}
                    onClick={() => setIsFr(!isFr)}>
                    <div className={`w-10 h-8 flex items-center justify-center  font-bold rounded-full bg-white  transition-all duration-300 ${isFr ? "translate-x-0 text-black" : "translate-x-8 text-black"}`}>
                        {isFr ? "FR" : "EN"}
                    </div>
                    <span className={`absolute text-white font-bold transition-all duration-300 ${isFr ? "ml-11" : "ml-2"}`}>
                        {isFr ? "EN" : "FR"}
                    </span>
                </div>
                <div>
                    <button className='flex justify-center items-center gap-2 btn-grad px-3 py-1.5 sm:py-2 hover:scale-105 cursor-pointer'>
                        <FaPlus className='text-xl border-2 rounded-full p-[2px] mt-0.5' />
                        <h1 className='max-[330px]:hidden'>Post <span className='max-[440px]:hidden'>a event</span></h1>
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
                </div>
            </div>
        </div>
    );
};

export default Navbar;