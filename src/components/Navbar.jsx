import React, { useContext } from 'react';
import logo from '../assets/logo.png'
import { FaPlus } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';
const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const { t, i18n } = useTranslation();
    
    const changeLanguage = () => {
        const newLang = i18n.language === 'en' ? 'fr' : 'en';
        i18n.changeLanguage(newLang);
    };


    const navLink = <>
        <li className='max-lg:btn'><NavLink to={'/'} className={"border-2 border-transparent"}>{t('home')}</NavLink></li>
        <li className='max-lg:btn'><NavLink to={'map'} className={"border-2 border-transparent"}>{t('find_event')}</NavLink></li>
        <li className='max-lg:btn'><NavLink to={"calender"} className={"border-2 border-transparent"}>{t('calendar')}</NavLink></li>
    </>

    return (
        <div className="mx-auto navbar bg-base-100 shadow-sm p-1 md:px-5    max-sm:justify-between">
            <div className="sm:navbar-start flex items-center gap-1 ">
                <div className="dropdown nav-container">
                    <div tabIndex={0} role="button" className="lg:hidden btn btn-ghost p-1 mt-2 border-1 " >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-md gap-1 dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow-2xl border-1 border-gray-100">
                        {navLink}

                    </ul>
                </div>
                <NavLink to="/" >
                    <img src={logo} alt="Company Logo" className='h-8 sm:h-10 w-full  object-cover object-center'></img>
                </NavLink>
            </div>
            <div className="navbar-center hidden lg:flex items-center nav-container">
                <ul className="menu menu-horizontal px-1">
                    {navLink}
                </ul>
            </div>
            <div className="sm:navbar-end gap-1  flex items-center  ">
                <div className={`w-20 h-10 flex items-center bg-black rounded-full p-1 cursor-pointer transition-all duration-300 scale-[60%] -ml-3 -mr-3  min-[400px]:-mr-1`}
                    onClick={changeLanguage}>
                    <div className={`w-10 h-8 flex items-center justify-center font-bold rounded-full bg-white transition-all duration-300 ${i18n.language === 'fr' ? "translate-x-0" : "translate-x-8"}`}>
                        {i18n.language === 'fr' ? "FR" : "EN"}
                    </div>
                    <span className={`absolute text-white font-bold transition-all duration-300 ${i18n.language === 'fr' ? "ml-11" : "ml-2"}`}>
                        {i18n.language === 'fr' ? "EN" : "FR"}
                    </span>
                </div>
                <div>
                    <button className='flex rounded-[11px] justify-center items-center gap-2 btn-grad px-3 py-1.5 sm:py-[7px] hover:scale-105 cursor-pointer'>
                        <FaPlus className='text-xl border-2 rounded-full p-[2px] mt-0.5' />
                        <h1 className='max-[330px]:hidden'>Post <span className='max-[440px]:hidden'>an event</span></h1>
                    </button>
                </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 sm:h-12 sm:w-12">
                            {user?.avatar_url ? (
                                <div className="size-12 rounded-full overflow-hidden">
                                    <img
                                        src={user?.avatar_url}
                                        referrerPolicy="no-referrer"
                                        className="w-full h-full object-cover"
                                        alt="User Avatar"
                                    />
                                </div>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>

                            )}
                        </div>
                        {user !== null ?
                            <ul tabIndex={0} className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow gap-1">

                                <li className='btn'><a>Profile</a></li>
                                <li className='btn'><a>Settings</a></li>
                                <li className='btn' onClick={logOut}><a>Logout</a></li>
                            </ul> :
                            <ul tabIndex={0} className="menu menu-md dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow-2xl border-1 border-base-300 gap-1" >
                                <li className='btn'><NavLink to={'/login'}>Login</NavLink></li>
                                <li className='btn'><NavLink to={'/register'}>Register</NavLink></li>
                            </ul>
                        }
                    </div>




            </div>
        </div>
    );
};

export default Navbar;