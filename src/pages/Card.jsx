import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Title from '../components/Title';
import { FaRegTrashAlt } from "react-icons/fa";
import { addToCart, removeFromCart } from '../redux/CartSlice';
import CartTotal from '../components/CartTotal';
import { useNavigate } from 'react-router-dom';
import SmallSpinner from "../utils/SmallSpinner"
import toast from 'react-hot-toast';

export default function Card() {
  /* const [totalPrice, setTotalPrice] = useState(0) */
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)
  const token=useSelector(state=>state.user.token);
  const navigate=useNavigate()
  const quantityRef=useRef();
  const dispatch=useDispatch();

  const fetchCardItems=async () =>{
    setLoading(true)
    try {
      const response=await fetch("http://127.0.0.1:8000/api/getCard",{
        method:"GET",
        headers:{
          Authorization:`Bearer ${token}`,
        }
      });

      if(!response.ok){
        throw new Error('server error');
      }

      const data=await response.json();
      const total=data.reduce((sum,item)=>sum+(item.price*item.quantity),0);
      //setTotalPrice(total);
      setCartItems(data);
      dispatch(addToCart({products:data,totalPrice:total}));
    } catch (error) {
      console.log(error)
    }finally {
      setLoading(false);
    }
  }

  const handleRemoveFromCart=async (id)=>{
    const payload={
      product_id:id
    }

    try {
      const response=await fetch("http://127.0.0.1:8000/api/removeCard",{
        method:"DELETE",
        headers:{
          "content-type":"application/json",
          Authorization:`Bearer ${token}`,
        },
        body:JSON.stringify(payload),
      });

      if(!response.ok){
        throw new Error('erreur in the server');
      }

      const data=await response.json();
      if(data){
        dispatch(removeFromCart(id));
        toast.success('product removed from the cart');
        setTimeout(()=>{
          window.location.reload();
        },500)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const updateQuantity=async (id)=>{
    const payload={
      quantity:+quantityRef.current.value,
      id:id
    };

    try {
      const response=await fetch("http://127.0.0.1:8000/api/updateQuantity",{
        method:"POST",
        headers:{
          "content-type":"application/json",
          Authorization:`Bearer ${token}`,
        },
        body:JSON.stringify(payload),
      });

      if(!response.ok){
        throw new Error('internal server error');
      }

      const data=await response.json();
      if(data){
        toast.success('Quantity updated successfully');
        window.location.reload();
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchCardItems()
  },[])

  if(loading) return <SmallSpinner/>

  return cartItems ? (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'Your'} text2={'CART'} />
      </div>
      <div>
        {
          cartItems?.map((ele,i)=>{
            return <div key={i} className='py-4 norder-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
            <div className='flex items-start gap-6'>
              <img  className='w-16 sm:w-20' src={ele?.image} alt="product" />
              <div>
                <p className='text-xs sm:text-lg font-medium'>{ele.name}</p>
                <div className='flex items-center gap-5 mt-2'>
                  <p>price: $ {ele?.price}</p>
                  <p>Quantity: {ele?.quantity}</p>
                </div>
              </div>
            </div>
            <div className='flex gap-4'>
              <input className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number"  min={1} defaultValue={ele?.quantity} ref={quantityRef}/>
              <button className='rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none' onClick={()=>updateQuantity(ele?.id)}>update Quantity</button>
            </div>
            <FaRegTrashAlt className='mr-4 cursor-pointer' size={20}  onClick={()=>handleRemoveFromCart(ele?.product_id)} />
          </div>
          })
        }
      </div>
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal/>
          <div className='w-full text-end'>
            <button className='bg-black text-white text-sm my-8 px-8 py-3' onClick={()=>navigate('/placeorder')}>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  ):(
    <div className='flex flex-col items-center gap-3 my-10'>
      <img src="./images/emptyicon.png" alt="" className='w-[180px]'/>
      <h4 className='font-bold text-3xl'>Your Cart is currently empty!</h4>
      <p className='font-semibold text-slate-400'>
        Before proceed to checkout you must add some products to your shooping cart.
      </p>
      <p className='font-semibold text-slate-400'>
        You will find a lot of interesting products on our "Cellection" page      
      </p>
      <button onClick={()=>navigate('/collection')} className='p-2 bg-sky-600 text-white font-bold rounded hover:bg-sky-800'>
        Return to Collection
      </button>
    </div>
  )
}
