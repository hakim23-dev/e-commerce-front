import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import SmallSpinner from '../utils/SmallSpinner';
import {BiSolidEdit, BiTrash} from 'react-icons/bi'
import toast from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom';

export default function DashboardProducts() {
  const [products, setProducts] = useState([]);
  const [backup, setBackup] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchRef=useRef(); 
  const token=useSelector(state=>state.user.token);
  const navigate=useNavigate()

  const fetchProducts= async ()=>{
    setLoading(true)
    try {
        const response=await fetch('http://127.0.0.1:8000/api/productsWithCategory');
        if(!response.ok){
            throw new Error('erreur')
        }

        const data=await response.json();

        setProducts(data)
        setBackup(data)
    } catch (error) {
        console.log(error)
    }finally {
      setLoading(false);
    }
  }

  const handleDeleteProduct=async (id)=>{
    let x=window.confirm("do you want to delete this product");
    if(x){
      try {
        const response=await fetch(`http://127.0.0.1:8000/api/deleteProduct/${id}`,{
          method:"DELETE",
          headers:{
            Authorization:`Bearer ${token}`,
          }
        });

        if(!response.ok) throw new Error("failed to delete the product");

        const data=await response.json();
        console.log(data)
        if(data){
          toast.success("product deleted successfully");
          setTimeout(()=>{
            window.location.reload();
          },1000)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }


  const handlesearch= (e)=>{
    const therme=e.target.value;
    const result=products.filter(item=>item?.name.toLowerCase().includes(therme.toLowerCase()));
    setProducts(therme!=="" ? result : backup);
  }

  useEffect(()=>{
    fetchProducts()
  },[]);

  if(loading) return <SmallSpinner/>

  return (
    <section>
      <h2 className='mb-3 font-bold text-2xl text-center'>Products</h2>
      <div className='mb-4 flex justify-between'>
      <div className="w-full max-w-sm min-w-[200px]">
        <div className="">
          <input type="search" className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-16 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" placeholder="Type name to Search" ref={searchRef} onChange={handlesearch}/>
          </div>
        </div>
        <Link className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" to={"/addProduct"}>Add New Product</Link>
      </div>
      <div className="flex flex-col w-full h-full overflow-scroll text-gray-100 bg-[#252525] shadow-md rounded-lg bg-clip-border p-2">
        <table className="w-full text-left table-auto min-w-max text-gray-100">
          <thead>
            <tr className="text-slate-500 border-b border-slate-300 bg-[#252525]">
              <th className="p-4">
                <p className="text-sm leading-none font-normal">
                  Date
                </p>
              </th>
              <th className="p-4">
                <p className="text-sm leading-none font-normal">
                  Product Name
                </p>
              </th>
              <th className="p-4">
                <p className="text-sm leading-none font-normal">
                  Product Price
                </p>
              </th>
              <th className="p-4">
                <p className="text-sm leading-none font-normal">
                  Quantity
                </p>
              </th>
              <th className="p-4">
                <p className="text-sm leading-none font-normal">
                  Category
                </p>
              </th>
              <th className="p-4">
                <p className="text-sm leading-none font-normal">
                  Actions
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              products?.map((ele,ind)=>(
                <tr  key={ind}>
                  <td className="p-4">
                    <p className="text-sm font-bold">
                      {new Date(ele?.created_at).toLocaleDateString("en-GB",{month:"long",day:"numeric",year:"numeric"})}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-bold">
                      {ele?.name} 
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-bold">
                      ${ele?.price}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className={`text-sm font-bold ${ele?.stock_quantity>=50 ?"text-green-400": ele?.stock_quantity<50 && ele?.stock_quantity>20 ? "text-orange-400": "text-rose-400"}`}>
                      {ele?.stock_quantity}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-bold">
                      {ele?.category?.name}
                    </p>
                  </td>
                  <td className="p-4 flex">
                    <BiTrash size={25} color='#578FCA' className='cursor-pointer' onClick={()=>handleDeleteProduct(ele?.id)}/>
                    <BiSolidEdit size={25} color='#578FCA' className='cursor-pointer' onClick={()=>navigate(`/dashboard/updateProduct/${ele?.id}`)}/>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </section>
  )
}
