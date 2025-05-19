import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BsCalendarDayFill,BsCalendarMonthFill } from "react-icons/bs";
import SmallSpinner from "../utils/SmallSpinner"
import { TbCalendarStats } from "react-icons/tb";
import { IoIosStats } from "react-icons/io";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Legend,
  Tooltip,
} from "chart.js";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Legend,
  Tooltip
);

export default function DashboardHome() {
    const [stats, setStats] = useState([])
    const [loading, setLoading] = useState(false)
    const token=useSelector(state=>state.user.token);

  const fetchStats=async ()=>{
    setLoading(true)
    try {
      const response=await fetch("http://127.0.0.1:8000/api/dashboard",{
        method:"GET",
        headers:{
          Authorization:`Bearer ${token}`,
        }
      });

      if(!response.ok) throw new Error("internale server error");

      const data=await response.json();
      setStats(data);

    } catch (error) {
      console.log(error)
    }finally {
      setLoading(false)
    }
  }

    useEffect(()=>{
      fetchStats()
    },[]);

    const options={
      responsive:true,
      plugins:{
        legend:{
          position:'bottom'
        },
        title:{
          display:true,
          text:"sales for the year"
        }
      }
    }

    const data={
      labels:[
        "Jan","feb","Mar","Apr","May","June","Jul","Aug","Sept","Oct","Nov","Dec"
      ],
      datasets:[
        {
          label:new Date().getFullYear(),
          data:stats?.sale_per_month?.map(item=>item?.total_sales) ||[],
          borderColor:'rgba(75,192,192)',
          backgroundColor:'rgba(75,192,192)'
        }
      ]
    }

    if(loading) return <SmallSpinner/>

  return (
    <section>
      <div className='grid grid-cols-4 gap-10'>
        <div className=' flex flex-row justify-evenly px-2 py-6 bg-black shadow-sm border border-slate-200 rounded-md'>
          <BsCalendarDayFill size={40} color='#578FCA'/>
          <div className='space-y-2'>
            <p className='font-bold text-gray-300'>Today Sale</p>
            <p className='font-bold text-white'>${stats?.today_sale?.today_sale || 0}</p>
          </div>
        </div>
        <div className=' flex flex-row justify-evenly px-2 py-6 bg-black shadow-sm border border-slate-200 rounded-md'>
          <BsCalendarMonthFill size={40} color='#578FCA'/>
          <div className='space-y-2'>
            <p className='font-bold text-gray-300'>Month Sale</p>
            <p className='font-bold text-white'>${stats?.month_sale?.month_sale || 0}</p>
          </div>
        </div>
        <div className=' flex flex-row justify-evenly px-2 py-6 bg-black shadow-sm border border-slate-200 rounded-md'>
          <TbCalendarStats size={40} color='#578FCA'/>
          <div className='space-y-2'>
            <p className='font-bold text-gray-300'>Year Sale</p>
            <p className='font-bold text-white'>${stats?.year_sale?.year_sale || 0}</p>
          </div>
        </div>
        <div className=' flex flex-row justify-evenly px-2 py-6 bg-black shadow-sm border border-slate-200 rounded-md'>
          <IoIosStats size={40} color='#578FCA'/>
          <div className='space-y-2'>
            <p className='font-bold text-gray-300'>Total Sale</p>
            <p className='font-bold text-white'>${stats?.total_sale?.total_sale || 0}</p>
          </div>
        </div>
      </div>
        {/*  Garaphs */}
      <div className='grid grid-cols-2 gap-4'>
        <Bar options={options} data={data}/>
      </div>

      <div class="flex flex-col w-full h-full overflow-scroll text-gray-100 bg-[#252525] shadow-md rounded-lg bg-clip-border p-2">
        <h4 className='mb-3 font-bold text-xl'>Recent Sales</h4>
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
                  Customer
                </p>
              </th>
              <th className="p-4">
                <p className="text-sm leading-none font-normal">
                  Amount
                </p>
              </th>
              <th className="p-4">
                <p className="text-sm leading-none font-normal">
                  Status
                </p>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              stats?.latest_order?.map((ele,ind)=>(
                <tr  key={ind}>
                  <td className="p-4">
                    <p className="text-sm font-bold">
                      {new Date(ele?.created_at).toLocaleDateString("en-GB",{month:"long",day:"numeric",year:"numeric"})}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-bold">
                      {ele?.user?.name} {ele?.user?.prename}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-bold">
                      ${ele?.total_amount}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-bold">
                      {ele?.order_status}
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
