import React, { useEffect, useRef, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { FaStripe } from "react-icons/fa";
import { SiRazorpay } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PlaceOrder() {
  const [method, setMethod] = useState('cod')
  const [error, setError] = useState(null)
  const navigate=useNavigate()
  const user=useSelector(state=>state.user.user);
  const cart=useSelector(state=>state.cart.cart);
  const total=useSelector(state=>state.cart.totalPrice);
  const token=useSelector(state=>state.user.token);
  const adresseRef=useRef();
  const phoneRef=useRef();

  const handleAddOrder=async () =>{
    const payload={
      adresse:adresseRef.current.value,
      phone:phoneRef.current.value,
      total_amount:total,
    };

    if(payload.adresse==="" || payload.phone===""){
      setError("you have to write your adresse and your phone");
      return;
    }

    try {
      const response=await fetch("http://127.0.0.1:8000/api/addOrder",{
        method:"POST",
        headers:{
          "content-type":"application/json",
          Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({order:payload,cart})
      });

      if(!response.ok){
        throw new Error('internal server error');
      }

      const data=await response.json();
      console.log(data)
      if(data?.msg){
        navigate('/order');
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t '>
      {/* LEFT SIDE */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[400px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' readOnly defaultValue={user?.name}/>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' readOnly defaultValue={user?.prename}/>
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Address' readOnly defaultValue={user?.email}/>
        <div className="relative w-full min-w-[200px]">
          <textarea className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50" placeholder=" " ref={adresseRef} required></textarea>
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">Your Adresse</label>
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="tel" placeholder='Phone' ref={phoneRef} required/>
        {
          error && <small className='font-semibold text-xs text-red-400'>{error} </small>
        }
      </div>
      {/* Right Side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYEMENT'} text2={'METHOD'}/>
          {/* Payement method */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={()=>setMethod('stripe')} className='flex flex-center gap-3 border p-2 px-3 cursor-pointer items-center'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='stripe'?'bg-green-400':''}`}></p>
              <FaStripe className='mx-4' size={40} />
            </div>
            <div onClick={()=>setMethod('razorpay')} className='flex flex-center gap-3 border p-2 px-3 cursor-pointer items-center'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='razorpay'?'bg-green-400':''}`}></p>
              <SiRazorpay className='mx-4' size={40} />
            </div>
            <div onClick={()=>setMethod('cod')} className='flex flex-center gap-3 border p-2 px-3 cursor-pointer items-center'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method==='cod'?'bg-green-400':''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4 '>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button onClick={handleAddOrder} className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </div>
  )
}
