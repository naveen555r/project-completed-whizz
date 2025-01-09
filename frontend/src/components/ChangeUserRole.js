import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoClose } from "react-icons/io5";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunc
}) => {
    const[userRole,setUserRole] = useState(role)

    const handleOnChangeSelect = (e) =>{
        setUserRole(e.target.value)

        console.log(e.target.value)

    }

    const updateUserRole = async() =>{

        const fetchResponse = await fetch (SummaryApi.updateUser.url,{

            method : SummaryApi.updateUser.method,
            credentials : 'include',
            headers :{
                "content-type" : "application/json"
            },
            body : JSON.stringify({
               userId :  userId,
               role : userRole 
            })
        })
        
        const responseData = await fetchResponse.json()

        if(responseData.success){
            toast.success(responseData.message)
            onClose()
            callFunc()
        }

        console.log("role updated",responseData)
        
    }

  return (
    <div className='fixed w-full h-full top-0 left-0 bottom-0  z-10 flex justify-between items-center bg-slate-100 bg-opacity-50 '>
        <div className=' mx-auto bg-white shadow-md p-4 w-full max-w-sm' >
            <button className='block ml-auto'onClick={onClose}>
                <IoClose/>
            </button>
          <h1 className='pb-4 font-medium'> Change User Role</h1>
           <p>Name : {name}</p>

           <p>Email : {email}</p>

          <div className='flex items-center justify-between my-4'>
            <p>Role:</p> 
           <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
            {
                Object.values(ROLE).map(e1 =>{
                    return(

                        <option value={e1} key={e1}>{e1}</option>


                    )
                })
            }
            
            </select>
            </div> 
            <button className='w-fit mx-auto block border bg-blue-500 text-white hover:bg-blue-600 py-1 rounded-full'onClick={updateUserRole} >Change Position</button> 
        </div>
      
    </div>
  )
}

export default ChangeUserRole
