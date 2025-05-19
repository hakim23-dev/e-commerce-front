import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { useSelector } from 'react-redux'
import SmallSpinner from '../utils/SmallSpinner';
import toast from "react-hot-toast"
import Modal from '../utils/Modal';

export default function Order() {
  const [orderIterms, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const token=useSelector(data=>data.user.token)

  const fetchOrderItems=async ()=>{
    setLoading(true);
    try {
      const response=await fetch("http://127.0.0.1:8000/api/orderItems",{
        method:'GET',
        headers:{
          Authorization:`Bearer ${token}`
        }
      });

      if(!response.ok){
        throw new Error('internal server error');
      }

      const data=await response.json();
      setOrderItems(data);
    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false);
    }
  }

  const cancelOrder=async(orderId,productId)=>{
    const payload={
      order_id:orderId,
      product_id:productId,
    }

    let x=window.confirm("are you sure you want to cancel the order");
    if(x){
      try {
        const response=await fetch('http://127.0.0.1:8000/api/cancelOrder',{
          method:'DELETE',
          headers:{
            "content-type":"application/json",
            Authorization:`Bearer ${token} `
          },
          body:JSON.stringify(payload)
        });
  
        if(!response.ok){
          throw new Error('internal server error');
        }
  
        const data=await response.json();
        if(data){
          toast.success('the order is canceled')
          setTimeout(()=>{
            window.location.reload();
          },1000)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }


  useEffect(()=>{
    fetchOrderItems()
  },[])

  if(loading) return <SmallSpinner/>

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>
      <div>
        {
          orderIterms[0]?.orders?.map((order,i)=>(
            order?.order_items?.map((ele,i)=>(
              <div key={i} className='py-4 border-t text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <div className='flex items-start gap-6 text-sm'>
                  <img className='w-16 sm:w-20' src={ele?.image} alt="product" />
                  <div>
                    <p className='sm:text-base font-medium'>{ele.name}</p>
                    <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                      <p className='text-lg'>$ {ele.price}</p>
                      <p>Quantity : {ele?.pivot?.quantity} </p>
                    </div>
                    <p className='pt-2'>Date: <span className='text-gray-400'>{new Date(ele?.pivot?.created_at).toLocaleDateString("en-GB",{year:"numeric",month:"long",day:"numeric"})} </span></p>
                  </div>
                </div>
                <div className='md:w-1/2 flex justify-between'>
                  <div className='flex items-center gap-2'>
                    <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                    <p className='text-sm md:text-base'>Ready to ship</p>
                  </div>
                  <button className='border px-4 py-2 text-sm font-medium rounded-sm transition-all ease-in-out hover:bg-black hover:text-white' onClick={()=>cancelOrder(order?.id,ele?.id)}>Track Order</button>
                </div>
              </div>
            ))
            
          ))
        }
      </div>
    </div>
  )
}
