import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Title from './Title';
import ProductItem from './ProductItem';

export default function BestSeller() {
    const products=useSelector(state=>state.products.products);
    const user=useSelector(state=>state.user.user);
    const token=useSelector(state=>state.user.token);

    useEffect(()=>{
        
    },[])

  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={'SELLERS'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla ullam, totam perspiciatis qui officiis magnam culpa ea vel fugit doloremque ut commodi
            </p>
        </div>
        {/* best seller products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                [...products||[]]?.sort((a,b)=>Number(b.id) - Number(a.id))?.slice(0,5)?.map((ele,i)=>(
                    <ProductItem key={i} image={ele.image} name={ele.name} price={ele.price} id={ele.id}/>
                ))
            }
        </div>
    </div>
  )
}
