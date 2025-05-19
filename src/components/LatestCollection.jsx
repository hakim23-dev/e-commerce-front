import React, {useEffect, useState} from 'react'
import Title from './Title'
import ProductItem from './ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../redux/ProductsSlice';
import Spinner from '../utils/Spinner';

export default function LatestCollection() {
    const [loading, setLoading] = useState(false)
    const dispatch=useDispatch()
    const lastProducts=useSelector(state=>state.products.products);

    const fetchProducts= async ()=>{
        setLoading(true)
        try {
            const response=await fetch('http://127.0.0.1:8000/api/products');
            if(!response.ok){
                throw new Error('erreur')
            }
            const data=await response.json();
            dispatch(setProducts(data))
        } catch (error) {
            console.log(error)
        }finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchProducts()
    },[])

    if(loading && lastProducts.length<=0) return <Spinner/> 

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={"COLLECTION"} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque harum architecto omnis, 
                optio porro cum enim suscipit.
            </p>
        </div>
        {/* TOP products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 content-stretch'>
            {
                lastProducts?.slice(0,5)?.map((ele,i)=>(
                    <ProductItem key={i} id={ele.id} image={ele.image} name={ele.name} price={ele.price} product={ele}/>
                ))
            }
        </div>
    </div>
  )
}
