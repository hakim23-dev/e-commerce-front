import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Title from './Title'
import ProductItem from './ProductItem'


export default function RelatedProducts({category}) {
    const products=useSelector(data=>data.products.products)
    const [related, setRelated] = useState([]);

    useEffect(()=>{
        if(products.length>0){
            let productsCopy=products.slice();
            productsCopy=productsCopy.filter(ele=>ele.category_id===category)
            setRelated(productsCopy)
        }
    },[products])
    
  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
            <Title text1={'RELATED'} text2={'PRODUCTS'}/>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
            {related.map((ele,i)=>(
                <ProductItem key={i} id={ele.id} name={ele.name} price={ele.price} image={ele.image} />
            ))}
        </div>
    </div>
  )
}
