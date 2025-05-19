import React from 'react'
import { useSelector } from 'react-redux'



export default function Footer() {


  return (
    <footer className={`bg-[#252525] px-2`}>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img src={`./images/comapnywhitelogo.png `} alt="logo" className='mb-5 w-32'/>
                <p className='w-full md:w-2/3 text-gray-300'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et laboriosam officia ducimus molestiae, accusamus distinctio laudantium ratione aut, quasi, eveniet explicabo quam excepturi maxime placeat soluta eos quisquam nulla amet.
                </p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5 text-white'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-300'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5 text-white'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-300'>
                    <li>+212 612345678</li>
                    <li>hakim@gmail.com</li>
                </ul>
            </div>
        </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center text-gray-300'>Copyright {new Date().getFullYear()}@ hakim.com - All Right Reserved</p>
        </div>
    </footer>
  )
}
