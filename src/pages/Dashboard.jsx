import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate, Outlet } from 'react-router-dom';
import { CiMenuBurger } from "react-icons/ci";
import { AiOutlineProduct } from "react-icons/ai";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaUsers } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";

export default function Dashboard() {
    const [showSideBar, setShowSideBar] = useState(false)
    const user=useSelector(state=>state.user.user);

  return (
    user && user?.role==="admin" ? <section > 
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-black dark:border-black">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <CiMenuBurger size={25} color='#EEEEEE' className='cursor-pointer' onClick={()=>setShowSideBar(!showSideBar)}/>
                        <Link to={"/home"} className="flex ms-2 md:me-24">
                            <img src="./images/comapnywhitelogo.png" class="w-20 h-8 me-3" alt="website Logo"  />
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center ms-3">
                            <div>
                                <p class="font-bold p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">{user?.name.toUpperCase()} {user?.prename.toUpperCase()} </p>
                            </div>
                            <div>
                                <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                    <span className="sr-only">Open user menu</span>
                                    <img  src={user?.image ? `http://localhost:8000/images/${user?.image}`:"user.jpeg"} className="w-10 h-10 rounded-full" alt="user" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        {
            showSideBar && 
            <aside  className="fixed top-0 left-0 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 translate-x-0 dark:bg-black dark:border-black">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-black">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link to="/dashboard" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={()=>setShowSideBar(false)}>
                                <AiOutlineDashboard size={25} color='#9ca3af'/>
                                <span class="ms-3">Dashboard</span>
                            </Link>
                        </li>  
                        <li>
                            <Link to={'products'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={()=>setShowSideBar(false)}>
                                <AiOutlineProduct size={25} color='#9ca3af'/>
                                <span class="flex-1 ms-3 whitespace-nowrap">Products</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'users'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={()=>setShowSideBar(false)}>
                                <FaUsers size={25} color='#9ca3af'/>
                                <span class="flex-1 ms-3 whitespace-nowrap">Users</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'orders'} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={()=>setShowSideBar(false)}>
                                <FaCartShopping size={25} color='#9ca3af'/>
                                <span class="flex-1 ms-3 whitespace-nowrap">Orders</span>
                            </Link>
                        </li>
                        
                    </ul>
                </div>
            </aside>
        }
        <div class="p-4 w-full mt-20">
            <Outlet/>  
        </div>
        
    </section> : <Navigate to={"/home"} replace />
  )
}
