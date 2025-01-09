import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    
    const navigate = useNavigate()

    useEffect (()=>{
      
      if(user?.role !== ROLE.ADMIN){
        navigate("/")
      }

    },[user])
  return (
   <div className="min-h-[calc(100vh-120px)] md:flex hidden">
       {/* Main content goes here */}
        <main className="flex-1 p-4 bg-gray-100">
             <Outlet/>
        </main>

          {/* Aside section on the right side */}
        <aside className="flex-shrink-0 w-[240px] p-4 py-9 bg-slate-200 min-h-full customModify">
          <div className="relative flex flex-col items-center justify-center ml-10">
           <div className="text-4xl cursor-pointer relative flex justify-center">
             <FaRegUserCircle />
           </div>
           <p className='capitalize text-lg font-semibold'>{user?.name}</p>
           <p>{user?.role}</p>
          </div>
          <div>
                    <nav className='grid p-4'>
                        <Link to={"all-users"} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
                        <Link to={"all-products"} className='px-2 py-1 hover:bg-slate-100'>All products</Link>
                        <Link to={"all-orders"}className='px-2 py-1 hover:bg-slate-100'>All orders</Link>
                    </nav>
          </div>
        </aside>
   </div>

  )
}

export default AdminPanel
