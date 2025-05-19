import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {useNavigate, useParams} from "react-router-dom"
import SmallSpinner from '../utils/SmallSpinner'
import toast from 'react-hot-toast'

export default function UpdateProduct() {
    const [product, setProduct] = useState({})
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const {id}=useParams()
    const token=useSelector(state=>state.user.token);
    const navigate=useNavigate()

    const nameRef=useRef();
    const priceRef=useRef();
    const quantityRef=useRef();
    const categoryRef=useRef();
    const imageRef=useRef();
    const descriptionRef=useRef();

    const fetchProduct=async ()=>{
        try {
            const response=await fetch(`http://127.0.0.1:8000/api/product/${id}`,{
                method:'GET',
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            })

            if(!response.ok) throw new Error('failed to fetch product');

            const data=await response.json();
            return data;
        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false)
        }
    }

    const fetchCategories=async ()=>{
        try {
            const response=await fetch(`http://127.0.0.1:8000/api/categories`,{
                method:'GET',
                headers:{
                    Authorization:`Bearer ${token}`,
                },
            })

            if(!response.ok) throw new Error('failed to fetch product');

            const data=await response.json();
            return data;
        } catch (error) {
            console.log(error)
        }
    }

    const fetchData=async ()=>{
        setLoading(true)
        try {
            const [productResult,categoriesResult]=await Promise.all([fetchProduct(),fetchCategories()]);
            setCategories(categoriesResult);
            setProduct(productResult);
        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false)
        }
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        const formdata=new FormData();
        formdata.append("name",nameRef.current.value);
        formdata.append("price",priceRef.current.value);
        formdata.append("quantity",quantityRef.current.value);
        formdata.append("category",categoryRef.current.value);
        formdata.append("description",descriptionRef.current.value);
        formdata.append("image",imageRef.current.files[0]);

        if(isNaN(formdata.get("category"))){
            setError("you have to chose a category");
            return;
        }

        try {
            const response=await fetch(`http://127.0.0.1:8000/api/updateProduct/${id}`,{
                method:'POST',
                headers:{
                    Authorization:`Bearer ${token}`,
                },
                body:formdata,
            })

            if(!response.ok) throw new Error('failed to fetch product');

            const data=await response.json();
            if(data){
                toast.success("product updated successfully");
                navigate(-1);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchData();
    },[])

    if(loading) return <SmallSpinner/>

  return (
    <div className='max-w-96 mx-auto'>
        <h2 className='font-bold text-center text-2xl mb-2'>Update Product</h2>
        <form className='space-y-2' onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name" className='font-bold'>Product Name :</label>
                <input type="text" className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer' id='name'  defaultValue={product?.name} ref={nameRef}/>
            </div>
            <div>
                <label htmlFor="price" className='font-bold'>Product Price :</label>
                <input type="text" className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer' id='price'  defaultValue={product?.price} ref={priceRef}/>
            </div>
            <div>
                <label htmlFor="quantity" className='font-bold'>Product Quantity :</label>
                <input type="text" className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer' id='quantity' defaultValue={product?.stock_quantity} ref={quantityRef}/>
            </div>
            <div>
                <select  className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer' ref={categoryRef}>
                    <option>chose a category</option>
                    {
                        categories?.map((ele,ind)=>(
                            <option value={ele?.id} key={ind}>{ele?.name} </option>
                        ))
                    }
                </select>
                <small className='font-semibold text-sm text-red-400'>{error && error} </small>
            </div>
            <div>
                <label  className='font-bold'>Product Description :</label>
                <textarea rows="8" className="peer h-full min-h-[100px] w-full !resize-none  rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50" ref={descriptionRef} defaultValue={product?.description}></textarea>
            </div>
            <div>
                <label htmlFor="">Product Image: </label>
                <input type="file" name="image" className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm  rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300  focus:shadow' accept='image/*' ref={imageRef}/>
            </div>
            <button className='bg-black text-white font-light px-8 py-2 mt-4'>Update</button>
        </form>
    </div>
  )
}
