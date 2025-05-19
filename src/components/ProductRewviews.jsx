import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import toast from "react-hot-toast"
import { FaStar } from 'react-icons/fa';


export default function ProductRewviews(props) {
  const [showAddComment, setShowAddComment] = useState(true);
  const [error, setError] = useState(null);
  const commentRef=useRef();
  const ratingRef=useRef();

  const token=useSelector(state=>state.user.token);

  const handleAddComment=async ()=>{
    const payload={
      user_id:props?.userId,
      product_id:props?.productId,
      comment:commentRef.current.value,
      rating:+ratingRef.current.value,
    };

    if(payload.comment==="" || Number.isNaN(payload.rating)){
      setError("you have to write a comment and give a rate");
      return;
    }
    try {
      const response=await fetch("http://127.0.0.1:8000/api/addReview",{
        method:"POST",
        headers:{
          "content-type":"application/json",
          Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(payload),
      });

      if(!response.ok) throw new Error('failed to add comment');

      const data=await response.json();
      if(data?.review){
        toast.error("you already comment on this product");
        return;
      }

      if(data?.newreview){
        toast.success("comment add successufully");
        setTimeout(()=>{
          window.location.reload();
        },1000)
      }

    } catch (error) {
      console.log(error)
    }
  }

  
  return (
    <div>
      <button onClick={()=>setShowAddComment(!showAddComment)} className='mt-3 rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'>Add review</button>
      {
        /*  Show reviews */
        showAddComment ? 
        <div className="flex w-full p-4 max-w-lg flex-col rounded-lg bg-white shadow-sm border border-slate-200 my-6">
          {
            props?.review?.map((ele,ind)=>(
              <article key={ind}>
                <div className="flex items-center gap-4 text-slate-800">
                  <img src={ele?.image} alt="Tania Andrew" className="relative inline-block h-[58px] w-[58px] !rounded-full  object-cover object-center" />
                  <div className="flex w-full flex-col">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xl font-semibold text-slate-800">
                        {ele.name} {ele.prename}
                      </h5>
                      <div class="flex items-center gap-0 5">
                        {
                          Array.from({length:ele?.pivot?.rating},_=>(
                            <FaStar color='gold'/>
                          ))
                        }
                      </div>
                    </div>
                    <p className="text-xs uppercase font-bold text-slate-500 mt-0.5">
                      {new Date(ele?.pivot?.created_at).toLocaleDateString("en-GB",{month:"long",year:"numeric",day:"numeric"}) }
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-base text-slate-600 font-light leading-normal">
                    &quot;{ele?.pivot?.comment} &quot;
                  </p>
                </div>
              </article>
            ))
          }
          
      </div>
      :
      /* ADD Review */
        <div class="relative w-[32rem] mt-3">
          <div class="relative w-full min-w-[200px]">
            <textarea rows="8"
              className="peer h-full min-h-[100px] w-full !resize-none  rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" " ref={commentRef}></textarea>
            <label
              className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Your Comment
            </label>
          </div>
          {
            error && <small className='text-sm font-semibold text-red-500'>{error} </small>
          }
          <div className="flex w-full justify-between py-1.5">
            {/* coment content */}
            <div className="flex gap-2">
              <button
                className="px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-md select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button" onClick={()=>setShowAddComment(!showAddComment)}>
                Close
              </button>
              <button
                className="select-none rounded-md bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button" onClick={handleAddComment}>
                Post Comment
              </button>
            </div>
            {/* Rating */}
            <div
              className='flex cursor-pointer'  >
                <div className="w-full max-w-sm min-w-[200px]">      
                  <div className="relative">
                      <select className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer" ref={ratingRef}>
                          <option >Rate the product</option>
                          <option value="1">1 star</option>
                          <option value="2">2 star</option>
                          <option value="3">3 star</option>
                          <option value="4">4 star</option>
                          <option value="5">5 star</option>
                      </select>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                      </svg>
                    </div>
                  </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
