import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { login } from '../redux/UserSlice';

export default function Register() {
    const [error, setError] = useState('')
    const nomRef=useRef();
    const prenameRef=useRef();
    const emailRef=useRef();
    const pswRef=useRef();
    const pswConfRef=useRef();
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const user=useSelector(state=>state.user.user);

    const onSubmitHandler= async (e)=>{
        e.preventDefault()
        const payload={
            nom:nomRef.current.value,
            prename:prenameRef.current.value,
            email:emailRef.current.value,
            password:pswRef.current.value,
            password_confirmation:pswConfRef.current.value,
        }

        if(payload.password!==payload.password_confirmation){
            setError('incorrect password')
            return;
        }

        try {
            const response=await fetch('http://127.0.0.1:8000/api/register',{
                method:'POST',
                headers:{
                    'content-type':'Applicatrion/json'
                },
                body:JSON.stringify(payload),
            });

            if(!response.ok){
                if(response.status===422){
                    const data=await response.json();
                    console.log(data);
                }
            }

            const data=await response.json();
            if(data){
                dispatch(login({user:data?.user,token:data?.token}));
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    !user ? <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
            <p className='prate-regular text-3xl'>Register</p>
            <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
        </div>
            <input type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Nom' required ref={nomRef}/>
            <input type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Prename' required ref={prenameRef}/>
            <input type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required ref={emailRef}/>
            <input type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required ref={pswRef}/>
            <input type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password Verification' required ref={pswConfRef}/>
            {
                error && <small className='text-sm font-semibold text-red-400'>{error} </small>
            }
        <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <Link to={'/'} className='cursor-pointer'>Login with your account</Link>
        </div>
        <button className='bg-black text-white font-light px-8 py-2 mt-4'>Regsiter</button>
    </form>
    : <Navigate to={"/home"} replace/>
  )
}
