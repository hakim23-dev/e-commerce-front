import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SmallSpinner from '../utils/SmallSpinner';

export default function Dashboardusers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const token=useSelector(state=>state.user.token);

  const fetchUsers=async ()=>{
    setLoading(true);
    try {
      const response=await fetch('http://127.0.0.1:8000/api/users',{
        method:"GET",
        headers:{
          Authorization:`Bearer ${token}`,
        }
      });
        if(!response.ok){
            throw new Error('erreur')
        }
        const data=await response.json();
        setUsers(data)
    } catch (error) {
      console.log(error)
    }finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchUsers();
  },[])

  if(loading) return <SmallSpinner/>

  return (
    <section>
        <h2 className='text-2xl font-bold text-center'>Users</h2> 
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
                          User Name
                        </p>
                      </th>
                      <th className="p-4">
                        <p className="text-sm leading-none font-normal">
                          Email
                        </p>
                      </th>
                      <th className="p-4">
                        <p className="text-sm leading-none font-normal">
                          Role
                        </p>
                      </th>
                      <th className="p-4">
                        <p className="text-sm leading-none font-normal">
                          Orders Number
                        </p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      users?.map((ele,ind)=>(
                        <tr  key={ind}>
                          <td className="p-4">
                            <p className="text-sm font-bold">
                              {new Date(ele?.created_at).toLocaleDateString("en-GB",{month:"long",day:"numeric",year:"numeric"})}
                            </p>
                          </td>
                          <td className="p-4">
                            <p className="text-sm font-bold">
                              {ele?.name} {ele?.prename} 
                            </p>
                          </td>
                          <td className="p-4">
                            <p className="text-sm font-bold">
                              {ele?.email}
                            </p>
                          </td>
                          <td className="p-4">
                            <p className="text-sm font-bold">
                              {ele?.role}
                            </p>
                          </td>
                          <td className="p-4">
                            <p className="text-sm font-bold">
                              {ele?.orders?.length}
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
