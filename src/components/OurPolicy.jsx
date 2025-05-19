import React from 'react'
import { BiSupport } from 'react-icons/bi'
import { FaExchangeAlt } from 'react-icons/fa'
import { MdVerified } from 'react-icons/md'

export default function OurPolicy() {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
        <div>
            <FaExchangeAlt className='w-12 m-auto mb-5' size={25}/>
            <p className='font-semibold'>Easy Exchange Policy</p>
            <p className='text-gray-400'>We offer hassle free exchange policy</p>
        </div>
        <div>
            <MdVerified size={25} className='w-12 m-auto mb-5' />
            <p className='font-semibold'>7 days return Policy</p>
            <p className='text-gray-400'>We oprovide 7 days free return policy</p>
        </div>
        <div>
            <BiSupport size={25} className='w-12 m-auto mb-5' />
            <p className='font-semibold'>Best customer support</p>
            <p className='text-gray-400'>We procide 24/7 customer support</p>
        </div>
    </div>
  )
}
