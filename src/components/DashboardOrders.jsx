import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import SmallSpinner from '../utils/SmallSpinner';

export default function DashboardOrders() {
  const [orders, setOrdes] = useState([])
  const [loading, setLoading] = useState([])
  const token=useSelector(state=>state.user.token);

  useEffect(()=>{

  },[])

  const fetchOrders=async ()=>{
    setLoading(true);
    try {
      const response=await fetch('http://127.0.0.1:8000/api/ordersStats',{
        method:"GET",
        headers:{
          Authorization:`Bearer ${token}`,
        }
      });
        if(!response.ok){
            throw new Error('erreur')
        }
        const data=await response.json();
        setOrdes(data)
    } catch (error) {
      console.log(error)
    }finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchOrders();
    },[])
  
  if(loading) return <SmallSpinner/>

  return (
    <section>
      <h2 className='text-2xl font-bold text-center'>Orders</h2> 
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
                  Invoice
                </p>
              </th>
                      <th className="p-4">
                        <p className="text-sm leading-none font-normal">
                          Product
                        </p>
                      </th>
                      <th className="p-4">
                        <p className="text-sm leading-none font-normal">
                          Order Status
                        </p>
                      </th>
                      <th className="p-4">
                        <p className="text-sm leading-none font-normal">
                          Payement Mode
                        </p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      orders?.orders?.map((ele,ind)=>(
                        <tr  key={ind}>
                          <td className="p-4">
                            <p className="text-sm font-bold">
                              {new Date(ele?.created_at).toLocaleDateString("en-GB",{month:"long",day:"numeric",year:"numeric"})}
                            </p>
                          </td>
                          <td className="p-4">
                            <p className="text-sm font-bold">
                              {ele?.id}  
                            </p>
                          </td>
                          <td className="p-4">
                            <p className="text-sm font-bold grid grid-cols-2 gap-4">
                              {ele?.order_items?.map((ele,ind)=>(<span className=' bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-indigo-900 dark:text-indigo-300'>{ele?.name}</span>))}
                            </p>
                          </td>
                          <td className="p-4">
                            <p className="text-sm font-bold">
                              {ele?.order_status}
                            </p>
                          </td>
                          <td className="p-4">
                            <p className="text-sm font-bold">
                              {ele?.payement_method}
                            </p>
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
