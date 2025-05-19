import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

export default function RootLayout() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vm] lg:px-[9vm]">
        <Navbar/>
        <Outlet/>
        <Footer/>
        <Toaster/>
    </div>
  )
}
