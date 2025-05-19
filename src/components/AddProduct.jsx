import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import SmallSpinner from '../utils/SmallSpinner';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const [categories, setCaterories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate=useNavigate()

  const nameRef=useRef()
  const priceRef=useRef()
  const quantityRef=useRef()
  const imageRef=useRef()
  const categoryRef=useRef()
  const descriptionRef=useRef()

  const token=useSelector(state=>state.user.token);

  const fetchCategories=async ()=>{
    setLoading(true)
    try {
        const response=await fetch(`http://127.0.0.1:8000/api/categories`,{
            method:'GET',
            headers:{
                Authorization:`Bearer ${token}`,
            },
        })

        if(!response.ok) throw new Error('failed to fetch product');

        const data=await response.json();
        setCaterories(data)
    } catch (error) {
        console.log(error)
    }finally {
      setLoading(false);
    }
  }

  const handleSubmit=async (e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append("name",nameRef.current.value);
    formData.append("price",priceRef.current.value);
    formData.append("quantity",quantityRef.current.value);
    formData.append("image",imageRef.current.files[0]);
    formData.append("category_id",categoryRef.current.value);
    formData.append("description",descriptionRef.current.value);

    if(isNaN(formData.get("category_id"))){
      setError("you have to chose a category")
      return;
    }

    try {
      const response=await fetch("http://127.0.0.1:8000/api/product/store",{
        method:"POST",
        headers:{
          Authorization:`Bearer ${token}`,
        },
        body:formData,
      });

      if(!response.ok) throw new Error("failed to add product");

      const data=await response.json();
      if(data){
        toast.success("Product add successfully");
        setTimeout(()=>{
          navigate(-1);
        },1500)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchCategories()
  },[])

  if(loading) return <SmallSpinner/>

  return (
    <div className=''>
        <h2 className='text-2xl font-bold text-center mb-4'>Add New Product</h2>
        <form className='p-10  grid grid-cols-1 space-y-4 max-w-[40%] mx-auto border border-slate-300 rounded-sm' onSubmit={handleSubmit}>
          <div className="w-full max-w-sm min-w-[200px]">
            <label className="block mb-2 text-sm text-slate-600">
                Product Name
            </label>
            <input type='text' className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here..." ref={nameRef}/>
          </div>

          <div className="w-full max-w-sm min-w-[200px]">
            <label className="block mb-2 text-sm text-slate-600">
                Product Price
            </label>
            <input type='text' className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here..." ref={priceRef}/>
          </div>

          <div className="w-full max-w-sm min-w-[200px]">
            <label className="block mb-2 text-sm text-slate-600">
                Product quantity
            </label>
            <input type='text' className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type here..." ref={quantityRef}/>
          </div>

          <div className="w-full max-w-sm min-w-[200px]">
            <label>
              <div className="mb-5 w-full h-11 rounded-sm border border-gray-300 justify-between items-center inline-flex">
                <h2 className="text-gray-900/20 text-sm font-normal leading-snug pl-4">No file chosen</h2>
                <input type="file" hidden ref={imageRef}/>
              <div className="flex w-28 h-11 px-2 flex-col bg-slate-500 rounded-r-md shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">Choose File </div>
              </div>
            </label>
          </div>

          <div className="w-full max-w-sm min-w-[200px] mt-4">      
            <div className="relative">
              <select className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-3 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer" ref={categoryRef}>
                  <option>Chose a Category</option>
                  {
                    categories?.map((item,inde)=>(
                      <option value={item.id} key={inde}>{item?.name} </option>
                    ))
                  }
              </select>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute top-3.5 right-2.5 text-slate-700">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
              </svg>
            </div>
            {
              error && <small className='text-sm font-semibold text-red-400'>{error} </small>
            }
          </div>

          <div className="relative w-full">
            <textarea className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50" placeholder=" " ref={descriptionRef}></textarea>
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Description
            </label>
          </div>
          
          <button className="rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="submit">Add Product</button>
        </form>
    </div>
  )
}
