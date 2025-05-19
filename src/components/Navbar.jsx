import React, { useEffect, useState } from 'react'
import {BiSearch, BiUser } from 'react-icons/bi'
import { FaBars, FaRegHeart } from 'react-icons/fa'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { GoChevronLeft } from "react-icons/go";
import { IoCartOutline } from 'react-icons/io5';
import SearchBar from './SearchBar';
import {  useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/UserSlice';
import { persistor } from '../redux/store';




export default function Navbar() {
    const [visible, setVisible] = useState(false)
    const [search, setSearch] = useState(false)
    const user=useSelector(data=>data.user.user);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleSearch=()=>{
        setSearch(!search)
    }

    const handleLogout=()=>{
        dispatch(logout());
        persistor.purge();
        navigate("/")
    }

    useEffect(()=>{
        console.log(user)
    },[])
  return (
    <header className={`flex items-center justify-between py-5 px-2 font-medium flex-wrap bg-[#252525] text-white`}>
        <Link to={'/'}>
            <img src={`./images/comapnywhitelogo.png`} alt="logo" className='w-36'/>
        </Link>

        <ul className={`hidden sm:flex gap-5 text-sm text-white`}>
            <NavLink to={'/home'} >
                Home
            </NavLink>
            <NavLink to={'/collection'} >
                Collection
            </NavLink>
            <NavLink to={'/about'} >
                About
            </NavLink>
            <NavLink to={'/contact'} >
                Contact
            </NavLink>
        </ul>

        <div className='flex items-center gap-5'>
            <BiSearch onClick={handleSearch} size={25} className='cursor-pointer'/>
            <div className="group relative">
                <Link to={'/'}><BiUser size={25} className='cursor-pointer'/></Link>
                <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                    <div className='flex flex-col gap-2 w-36 py-3 bg-slate-100 text-gray-500 rounded'>
                        <Link to={"myProfile"} className='cursor-pointer hover:text-black'>My Profile</Link>
                        <Link to={"/order"} className='cursor-pointer hover:text-black'>Orders</Link>
                        <p className='cursor-pointer hover:text-black' onClick={handleLogout}>Logout</p>
                        {
                            user?.role==="admin" &&
                            <Link to={"/dashboard"} className='cursor-pointer hover:text-black'>Dashboard</Link>
                        }
                    </div>
                </div>
            </div>
            <Link to={'/card'} className='relative'>
                <IoCartOutline size={25} className='cursor-pointer'/>
            </Link>
            <Link to={'/wishlist'} className='relative'>
                <FaRegHeart size={25} className='cursor-pointer'/>
            </Link>
            <FaBars size={25} className='w-5 cursor-pointer sm:hidden' onClick={()=>setVisible(true)}/>
        </div>

        {/* side bar menu for sm screen */}
        <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all  ${visible ? 'w-full' : 'w-0'}`}>
            <div className='flex flex-col text-gray-600 cursor-pointer'>
                <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3'>
                    <GoChevronLeft className='h-4 rotate-180' size={25}/>
                    <p>Back</p>
                </div>
                <NavLink onClick={()=>setVisible(false)} className={'py-2 pl-6 border link'} to={'/'}>Home</NavLink>
                <NavLink onClick={()=>setVisible(false)} className={'py-2 pl-6 border link'} to={'/collection'}>Collection</NavLink>
                <NavLink onClick={()=>setVisible(false)} className={'py-2 pl-6 border link'} to={'/about'}>About</NavLink>
                <NavLink onClick={()=>setVisible(false)} className={'py-2 pl-6 border link'} to={'/contact'}>Contact</NavLink>
            </div>
        </div>
        {
            search && <div className='w-full flex justify-center'> <SearchBar /> </div> 
        }
    </header>
  )
}
