import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    
  return (
    <div className='text-center my-10 flex flex-col items-center gap-6'>
        <h2 className='text-4xl font-bold'>
            <span className='text-sky-600'>Sorry!,</span>
            this page is not available
        </h2>
        <p className='text-stone-400 text-xl'>the page you were looking for could'n be found</p>
        <p>Go bach to <Link to='/' className='text-sky-600 font-bold'>home page</Link> or visit our <Link to={'/collection'} className='text-sky-600 font-bold'>collection page</Link></p>
    </div>
  )
}
