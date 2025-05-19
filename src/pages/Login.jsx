import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { login } from '../redux/UserSlice'

export default function Login() {
  const user=useSelector(state=>state.user.user);
  const products=useSelector(state=>state.products.products);
  const emailref=useRef()
  const pswref=useRef()
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const onSubmitHandler= async (e)=>{
    e.preventDefault()
    const payload={
      email:emailref.current.value,
      password:pswref.current.value,
    }
    
    try {
      const response=await fetch('http://127.0.0.1:8000/api/login',{
        method:'POST',
        headers:{
          "content-type":"application/json",
        },
        body:JSON.stringify(payload)
      });

      if(!response.ok){
        throw new Error('error in the server') 
      }

      const data=await response.json();
      if(data){
        dispatch(login({user:data?.user,token:data?.token}))
        navigate('/home')
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    console.log(products);
  },[])

  return (
    !user ? <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prate-regular text-3xl'>Login</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      <input type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required ref={emailref}/>
      <input type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required ref={pswref}/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <Link to={'/register'} className='cursor-pointer'>Create Account</Link>
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>Login</button>
    </form>
    : <Navigate to={"/home"} replace />
  )
}
