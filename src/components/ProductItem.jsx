import React, { useEffect, useState } from 'react'
import { MdAddShoppingCart } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {  Link, useNavigate } from 'react-router-dom';
import { addToCart } from '../redux/CartSlice';
import toast from "react-hot-toast";
import Modal from '../utils/Modal';
import { removeFromList } from '../redux/wishlistSlice';

export default function ProductItem({id,image,name,price,product}) {
  const [show, setShow] = useState(false)
  const token=useSelector(data=>data.user.token);
  const navigate=useNavigate();

  const addToWishList= async (id)=>{
    if(token===null){
      navigate('/login');
      return
    }

    const payload={
      product_id:id,
    }

    try {
      const response=await fetch('http://127.0.0.1:8000/api/addToWishlist',{
        method:'POST',
        headers:{
          "content-type":"application/json",
          Authorization:`Bearer ${token}`,
        },
        body:JSON.stringify(payload),
      });

      if(!response.ok){
        throw new Error('erreur in server')
      }

      const data=await response.json();
      if(data?.test.length){
        setShow(true)
        return;
      }

      if(data){
        toast.success('Product add to wishlist successfully')
        navigate('/wishlist')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const removeFromWishlist= async()=>{
    const payload={
      product_id:id,
    }

    try {
      const response=await fetch('http://127.0.0.1:8000/api/removeToWishlist',{
        method:'DELETE',
        headers:{
          "content-type":"application/json",
          Authorization:`Bearer ${token}`,
        },
        body:JSON.stringify(payload),
      });

      if(!response.ok){
        throw new Error('erreur in server')
      }

      const data=await response.json();
      if(data.msg){
        dispatch(removeFromList(id))
        toast.success('Product removed from wishlist');
        window.location.reload();
        return;
      }

      if(data){
        toast.success('Product add to wishlist successfully');
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddCart=async()=>{
    const payload={
      product_id:id
    };

    try {
      const response=await fetch("http://127.0.0.1:8000/api/addToCart",{
        method:"POST",
        headers:{
          "content-type":"application/json",
          Authorization:`Bearer ${token}`,
        },
        body:JSON.stringify(payload)
      });

      if(!response.ok){
        throw new Error('error in server')
      }

      const data=await response.json();
      if(data?.test){
        toast.success('Product already in the card')
        return;
      }

      if(data){
        toast.success('product add to card successfully');
        navigate('/card')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleClose=()=>{
    setShow(false)
  }

  const dispatch=useDispatch()
  
  return (
    <article className='text-gray-700 rounded-sm relative'>
      <div className='overflow-hidden'>
        <img src={`${image!==null ? `http://127.0.0.1:8000/images/${image}` : "./images/companylogo.png"} `} alt="product" className='hover:scale-110 ease-in-out w-52 h-52'/>
      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className='text-sm font-medium'>${price}</p>
      <div className='flex flex-row justify-evenly items-center mt-2'>
        <button className='rounded-md bg-pink-600 py-2 px-2 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-pink-700 focus:shadow-none active:bg-pink-700 hover:bg-pink-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ' onClick={()=>addToWishList(id)}>wishlist</button>
        <Link to={`/product/${id}`} className='cursor-pointer bg-black text-white text-xs font-bold px-2 py-2'>Product Details</Link>
        <MdAddShoppingCart size={30} className='cursor-pointer' onClick={handleAddCart}/>
      </div>
      {
        show && <Modal msg={'product already in wishlist'} msg2={"do you want to remove it"} handleClose={handleClose} 
        handleConfirm={removeFromWishlist}/>
      }
    </article>
  )
}
