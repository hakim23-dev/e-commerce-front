import React from 'react'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400'>
        {/* hero left side */}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className='text-[#414141]'>
                <div className='flex items-center gap-2'>
                    <p className='w-8 sm:w-11 h-[2px] bg-[#414141]'></p>
                    <p className='font-medium text-sm md:text-base'>Our BESTSELLERS</p>
                </div>
                <h1 className='prate-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
                <div className='flex items-center gap-2'>
                    <Link className='font-semibold text-sm md:text-base' to={"/collection"}>SHOP NOW</Link>
                </div>
            </div>
        </div>
        {/* hero right side */}
        <img className='w-full sm:w-1/2' src="./images/hero.png" alt="banner" />
    </div>
  )
}
