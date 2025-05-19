import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import RelatedProducts from '../components/RelatedProducts'
import { addToCart } from '../redux/CartSlice'
import GeneralDescription from './GeneralDescription'
import ProductRewviews from './ProductRewviews'
import SmallSpinner from '../utils/SmallSpinner'
import toast from 'react-hot-toast'
import { FaStar } from 'react-icons/fa'

export default function ProductDetails() {
    const [productReviews, setProductReviews] = useState([])
    const [showReview, setShowReview] = useState('description')
    const {id} =useParams()
    const products=useSelector(data=>data.products.products)
    const token=useSelector(data=>data.user.token)
    const user=useSelector(data=>data.user.user)
    const [productDetails, setProductDetails] = useState({})
    const [loading, setLoading] = useState(false)
    const [globalRating, setGlobalRating] = useState(0)
    const navigate=useNavigate();

    const fetchProductData = async () => {
      const product = products.find(ele => ele.id === +id);
      if (product) {
        setProductDetails(product);
      }
    };
    
    const fetchPorductReviews=async ()=>{
      setLoading(true)
      try {
        const response=await fetch(`http://127.0.0.1:8000/api/reviews/${id}`,{
          method:"GET",
          headers:{
            Authorization:`Bearer ${token} `,
          },
        });

        if(!response.ok){
          throw new Error("internal server error");
        }

        const data=await response.json();
        if(data){
          setProductReviews(data);
          let globalRat=data?.reduce((sum,inc)=>  sum+inc?.pivot?.rating,0 );
          setGlobalRating(globalRat/+data.length);
        }
      } catch (error) {
        console.log(error)
      }finally {
        setLoading(false)
      }
    }

    const handleAddCart=async()=>{
      const payload={
        product_id:id
      };
  
      try {
        const response=await fetch("http://127.0.0.1:8000/api/addToCart",{
          method:"POST",
          headers:{
            "content-type":"application/json",
            Authorization:`Bearer ${token}`,
          },
          body:JSON.stringify(payload)
        });
  
        if(!response.ok){
          throw new Error('error in server')
        }
  
        const data=await response.json();
        if(data?.test){
          toast.success('Product already in the card')
          return;
        }
  
        if(data){
          toast.success('product add to card successfully');
          navigate('/card')
        }
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
      fetchProductData();
      fetchPorductReviews();
    },[])
  
    if(loading) return <SmallSpinner/>

    return productDetails ? (
      <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
        {/* product details */}
        <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
          {/* product images */}
          <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
            <div className='w-full sm:w-[80%]'>
              <img  src={`./${productDetails.image} `}  alt="product" className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
            </div>
          </div>
          {/* product Info */}
          <div className='flex-1'>
              <h3 className='font-medium text-2xl mt-2'>{productDetails.name} </h3>
              <div className='  gap-1 mt-1'>
              <div class="grid min-h-[140px] w-full  overflow-x-scroll rounded-lg lg:overflow-visible">
                <div className="flex items-center gap-2 font-bold text-blue-gray-500">
                  {globalRating}
                  <div className="inline-flex items-center">
                  {
                      Array.from({length:Number.parseInt(globalRating)},_=>(
                        <FaStar color='gold'/>
                      ))
                  }
                  </div>
                  <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-500">
                    Based on {productReviews?.length} Reviews
                  </p>
                </div>
              </div>
              </div>
              <p className='mt-5 text-3xl font-medium'>$ {productDetails.price}</p>
              <p className='mt-5 text-gray-500 md:w-4/5'>{productDetails.description}</p>
              <button onClick={handleAddCart} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
              <hr className='mt-8 sm:w-4/5'/>
              <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                <p>100% Original product</p>
                <p>Cash on delivery is available on this product</p>
                <p>Easy return and exchange policy within 7 days</p>
              </div>
          </div>
        </div>
        {/* Description and review section */}
        <div className='mt-20'>
          <div className='flex'>
            <p className='border px-5 py-3 text-sm transition-all ease-in-out hover:bg-black hover:text-white cursor-pointer' onClick={()=>setShowReview('description')}>Description</p>
            <p className='border px-5 py-3 text-sm transition-all ease-in-out hover:bg-black hover:text-white cursor-pointer' onClick={()=>setShowReview('reviews')}>Review {productReviews?.length}</p>
          </div>
          {
            showReview==="description" ? <GeneralDescription/> :<ProductRewviews  review={productReviews} productId={id} userId={user?.id}/>
          }
        </div>

        {/* related prodcuts */}
        <RelatedProducts category={productDetails?.category_id} />
      </div>
    ) : <div className='flex my-4 gap-10 justify-center flex-wrap'>
      <img src="./images/product-not-found.png" alt="pictur" className='w-full h-auto'/>
      <div>
        <Link className='text-white font-bold p-3 rounded-full bg-sky-500 hover:bg-sky-700' to={'/'}>Back to home</Link>
      </div>
    </div>
}
