import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';


const AllUsers = () => {
    const [allUser,setAllUsers] = useState([])

    const [openUpdateRole,setOpenUpdateRole]=useState(false)

    const [updateUserDetails,setUpdateUserDetails] = useState ({
        email : "",
        name  : "",
        role  : "",
        _id : ""  
    })

    const fetchAllUsers = async() =>{

        const fetchData = await fetch(SummaryApi.allUser.url,{
            method : SummaryApi.allUser.method,
            credentials: 'include'
        })

        const dataResponse = await fetchData.json()

        if(dataResponse.success){
            setAllUsers(dataResponse.data )
        }
        if(dataResponse.error){
           toast.error(dataResponse.message )
        }

        
    } 

    useEffect(()=>{
        
        fetchAllUsers()

    },[])
  return (
    <div className='bg-white py-7 pb-4'>
        <table className='w-full  userTable'>
            <thead>
                <tr>
                
                    <th>sr.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created Date</th>
                    <th>Action</th>

                </tr>
                
            </thead>
            <tbody className=''>
                {
                  allUser.map((el,index)=>{
                        return(
                            
                            <tr>
                                <td>{index+1}</td>
                                <td>{el?.name}</td>
                                <td>{el?.email}</td>
                                <td>{el?.role}</td>
                                <td>{moment(el?.created).format('ll')}</td>
                                <td>
                                    <button className='bg-red-200 p-2 rounded-full hover:bg-red-400'
                                    onClick={() =>{
                                          setUpdateUserDetails(el) 
                                          setOpenUpdateRole(true)
                                          }}
                                          >
                                           <MdEdit/>
                                    </button>
                                </td>
                            </tr>
                        )
                  })
                }
            </tbody>
            
        </table>
        {
            openUpdateRole && (

                <ChangeUserRole onClose={()=>setOpenUpdateRole(false)}
                       name=  {updateUserDetails.name}
                       email= {updateUserDetails.email}
                       role = {updateUserDetails.role}
                       userId ={updateUserDetails._id}
                       callFunc={fetchAllUsers}
                
                />
            )
        }
      
    </div>
  )
}

export default AllUsers
