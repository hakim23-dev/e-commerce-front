import React, { useEffect, useState } from 'react'
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { useNavigate } from 'react-router-dom';
import SmallSpinner from '../utils/SmallSpinner'
import { useDispatch, useSelector } from 'react-redux';
import { addToList } from '../redux/wishlistSlice';

export default function WishList() {
    const [wishListItems, setWishListItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const token=useSelector(state=>state.user.token);
    const dispatch=useDispatch()

  const fectchProducts=async ()=>{
    setLoading(true)
    try {
      const response=await fetch('http://127.0.0.1:8000/api/getWishlist',{
        method:'GET',
        headers:{
          Authorization:`Bearer ${token}`
        }
      });

      if(!response.ok){
        throw new Error('server error');
      }

      const data=await response.json();
      console.log(data)
      setWishListItems(data);
      dispatch(addToList(data))
    } catch (error) {
      console.log(error)
    }finally {
      setLoading(false)
    }
  }

    const navigate=useNavigate()
    useEffect(()=>{
        fectchProducts()
    },[])

    if(loading) return <SmallSpinner/>

  return wishListItems?.length>0 ? (
    <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1={'FAVORI'} text2={"PRODUCTS"} />
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque harum architecto omnis, 
                    optio porro cum enim suscipit.
                </p>
            </div>
            {/* TOP products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 content-stretch'>
                {
                    wishListItems?.map((ele,i)=>(
                        <ProductItem key={i} 
                        id={ele.id} 
                        image={ele.image} 
                        name={ele.name} 
                        price={ele.price} 
                        product={ele}
                        />
                    ))
                }
            </div>
        </div>
  ):(
    <div className='flex flex-col items-center gap-3 my-10'>
      <img src="./images/emptywishlist.png" alt="" className='w-[180px]'/>
      <h4 className='font-bold text-3xl'>Your Wishlist is empty</h4>
      <p className='font-semibold text-stone-400'>Create your first wishlist</p>
      <button onClick={()=>navigate('/collection')} className='p-2 bg-sky-600 text-white font-bold rounded hover:bg-sky-800'>+create new wish</button>
    </div>
  )
}
