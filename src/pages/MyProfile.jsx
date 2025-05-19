import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import SmallSpinner from '../utils/SmallSpinner';
import toast from 'react-hot-toast';
import { updateUser } from '../redux/UserSlice';

export default function MyProfile() {
    const [stats, setStats] = useState([])
    const [img, setImg] = useState(null)
    const [loading, setLoading] = useState(false)
    const user=useSelector(state=>state.user.user);
    const token=useSelector(state=>state.user.token);
    const imgRef=useRef()

    const fetchUserStats=async ()=>{
        setLoading(true);
        try {
            const response=await fetch("http://127.0.0.1:8000/api/userStats",{
                method:"GET",
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            });

            if(!response.ok) throw new Error('falied to fetch data');

            const data=await response.json();
            if(data){
                setStats(data)
            }

        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false);
        }
    }

    const handleChange=e => {
        const file=e.target.files[0];
        if(file){
            const reader=new FileReader();
            reader.onload=()=>{
                setImg(reader.result);
            }
            reader.readAsDataURL(file)
        }
    }

    const handleUpdateImage= async ()=>{
        const formData=new FormData();
        formData.append('image',imgRef.current.files[0])
        try {
            const response=await fetch("http://127.0.0.1:8000/api/updateImage",{
                method:'POST',
                headers:{
                    Authorization:`Bearer ${token}`,
                },
                body:formData
            });

            if(!response.ok) throw new Error("internal server error");

            const data=await response.json();
            if(data){
                toast.success('picture updated successfully');
                updateUser(data);
                setTimeout(()=>{
                    window.location.reload();
                },1000)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        console.log(user)
        fetchUserStats()
    },[])

    if(loading) return <SmallSpinner/>

  return (
    <section className='max-w-[50%] mx-auto px-10'>
        <div className="flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg my-4 w-96">
            <div class="m-2.5 overflow-hidden rounded-md h-40 flex justify-center items-center">
                <label htmlFor="image" className='cursor-pointer'>
                    <input type="file" name="image" id="image" hidden accept='image/*' ref={imgRef} onChange={handleChange}/>
                    {
                        img ? <img src={img} alt="avatar" className="relative inline-block h-[110px] w-[110px] !rounded-full object-cover object-center" />
                        :<img src={user?.image ? `http://localhost:8000/images/${user?.image}` :"./images/user.jpeg"} alt="avatar" className="relative inline-block h-[110px] w-[110px] !rounded-full object-cover object-center" />
                    }
                    
                </label>
            </div>
            <div className="p-6 text-center">
                <h4 className="mb-1 text-xl font-semibold text-slate-800">
                    {user.name} {user.prename}
                </h4>
                <p className="text-sm font-semibold text-slate-500">
                    {user.email} 
                </p>
                <p className="text-base text-slate-600 mt-4 font-light ">
                    Product in your Wishlist : <span className="font-bold">{stats?.wishlist}</span> 
                </p>
                <p className="text-base text-slate-600 mt-4 font-light ">
                    Product in your Cart : <span className="font-bold">{stats?.cart}</span>
                </p>
                <p className="text-base text-slate-600 mt-4 font-light ">
                    Comments on Products : <span className="font-bold">{stats?.comments}</span>
                </p>
                <p className="text-base text-slate-600 mt-4 font-light ">
                    Your Orders : <span className="font-bold">{stats?.orders}</span>
                </p>
            </div>
            <div className="flex justify-center p-6 pt-2 gap-7">
                <button className="min-w-32  rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button" onClick={handleUpdateImage}>
                    Update Your Profile Image
                </button>
            </div>
        </div>
    </section>
  )
}
