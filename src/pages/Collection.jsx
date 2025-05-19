import React, {  useEffect, useState } from 'react'
import {  useSelector } from 'react-redux'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import {IoMdArrowDropdown } from 'react-icons/io'
import SmallSpinner from '../utils/SmallSpinner'

export default function Collection() {
  const [loading, setLoading] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [categories, setCategories] = useState([])
  const products=useSelector(state=>state.products.products)
  //const dispatch=useDispatch()

  
  const fetchCtegory=async ()=>{
    setLoading(true);
    try {
      const response=await fetch('http://127.0.0.1:8000/api/categories');
      if(!response.ok){
        throw new Error('error');
      }
      const data=await response.json();
      setCategories(data);
    } catch (error) {
      console.log(error)
    }finally {
      setLoading(false);
    }
  }

  
  const handlToggleCategory=(id)=>{
    const categoryId=id;
    if(categoryId==="all"){
      setFilterProducts(products);
      return;
    }
    const result=products.filter(ele=>ele.category_id===categoryId);
    setFilterProducts(result);
  }  


  const handleSort=(e)=>{
    const sortType=e.target.value;
    console.log(sortType)
    if(sortType==="low-high"){
      const result=[...products].sort((a,b)=>a.price-b.price);
      setFilterProducts(result)
    }
    if(sortType==="high-low"){
      const result=[...products].sort((a,b)=> b.price - a.price);
      setFilterProducts(result)
    }
  }

  useEffect(()=>{
    fetchCtegory()
    setFilterProducts([...products]);
  },[])

  

  if(loading) return <SmallSpinner/>

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* filter Options */}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>Filters
          <IoMdArrowDropdown className={`h-3 sm:hidden ${showFilter ? 'rotate-180':''}`} alt="" />
        </p>

        {/* category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '':'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>Categories</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2 cursor-pointer hover:bg-gray-400 hover:text-white' onClick={()=>handlToggleCategory('all')}>All</p>
            {
              categories?.map(ele=>(
                <p className='flex gap-2 cursor-pointer hover:bg-gray-400 hover:text-white' key={ele.id} onClick={()=> handlToggleCategory(ele.id)} aria-valuenow={ele.id}>{ele.name}</p>
              ))
            }
          </div>
        </div>
      </div>
      {/* right side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'All'} text2={'COLLECTIONS'} />
          {/* Product sort */}
          <select className='border-2 border-gray-300 text-sm px-2' onChange={e=>handleSort(e)}>
            <option value="relavent">Sort by : Relavent</option>
            <option value="low-high">Sort by : Low to High</option>
            <option value="high-low">Sort by : High to Low</option>
          </select>
        </div>

        {/* Map products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts?.map((ele,i)=>(
              <ProductItem key={i} 
              image={ele.image} 
              name={ele.name} 
              price={ele.price} 
              id={ele.id} 
              category={ele.category} 
              subCategory={ele.subCategory} 
              product={ele}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}
