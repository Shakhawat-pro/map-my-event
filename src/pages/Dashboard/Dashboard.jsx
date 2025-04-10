import { NavLink, Outlet } from "react-router-dom";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { FaHome, FaUsers } from "react-icons/fa";
import { RiArticleLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { GiNewspaper } from "react-icons/gi";
import { MdOutlineWorkspacePremium } from "react-icons/md";

const Dashboard = () => {
    return (
        <div className="">
            <div className="drawer lg:drawer-open ">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-ghost fixed drawer-button text-4xl z-50  lg:hidden"><TbLayoutSidebarLeftExpand /></label>
                    <Outlet></Outlet>

                </div>
                <div className="drawer-side sidebar-container">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="px-8 py-6 text-base space-y-4 w-80 min-h-full text-white bg-gradient-to-b from-primary to-secondary">
                    <div className="flex flex-col items-center -space-y-1 pt-12 pb-10 cinzel border-2">
                        <p className="text-2xl tracking-[.3rem] font-extrabold font-serif">ConfMap</p>
                    </div>
                        {/* Sidebar content here */}
                        <li><NavLink className={'flex items-center gap-2'} to="/dashboard"><FaHome />Admin Home</NavLink></li>
                        <li><NavLink className={'flex items-center gap-2'} to="/dashboard/manageUser"><FiEdit />Manage User</NavLink></li>
                        {/* <li><NavLink className={'flex items-center gap-2'} to="/dashboard/managePublisher">Manage Publisher</NavLink></li> */}
                        <li><NavLink className={'flex items-center gap-2'} to="/dashboard/manageEvents"><RiArticleLine />Manage Events</NavLink></li>
                        <li><NavLink className={'flex items-center gap-2 mb-10'} to="/dashboard/manageHomePage"><FaUsers />Manage Home Page</NavLink></li>

                        <div className="custom-divider"></div>
                        <li><NavLink className={'flex items-center gap-2'} to={'/'}><FaHome /> Home</NavLink></li>
                        <li><NavLink className={'flex items-center gap-2'} to={'/post-event'}><FiEdit />Post Event</NavLink></li>
                        <li><NavLink className={'flex items-center gap-2'} to={'/map'}><GiNewspaper />Find Event</NavLink></li>
                        <li><NavLink className={'flex items-center gap-2'} to={'/calendar'}><MdOutlineWorkspacePremium /> Calendar</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;