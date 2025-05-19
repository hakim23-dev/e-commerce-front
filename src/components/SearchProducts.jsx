import { useSelector } from 'react-redux'
import Title from './Title'
import ProductItem from './ProductItem'
import { useNavigate } from 'react-router-dom';

export default function SearchProducts() {
  const searchProducts=useSelector(data=>data.products.searchProducts);
  const navigate=useNavigate()
  return searchProducts.length>0 ? (
    <div className='mb-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'Search'} text2={'PRODUCTS'}/>
            </div>
            {/* Search products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                  searchProducts.length>0 ?  searchProducts.map((ele,i)=>(
                        <ProductItem key={i} image={ele.image} name={ele.name} price={ele.price}/>
                    ))
                    : <h2>No products found</h2>
                }
            </div>
        </div>
  ):(
    <div className='flex flex-col items-center gap-3 my-10'>
      <img src="./images/nodata.png" alt="" className='w-[180px]'/>
      <h4 className='font-bold text-3xl'>Somthing looks fishy!</h4>
      <p className='font-semibold text-stone-400'>But not exactly what your were looking for.</p>
      <p className='font-semibold text-stone-400'>we're so sorry about this.</p>
      <button onClick={()=>navigate('/collection')} className='py-2 px-5 bg-sky-600 text-white font-bold rounded hover:bg-sky-800'>
        Start over
      </button>
    </div>
    )
}
