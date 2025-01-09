import React, { useEffect } from 'react'
import SuccessI from '../images for websites/tick.gif' 
import { Link, useNavigate } from 'react-router-dom'

const Success = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const authToken = localStorage.getItem('authToken');
  //   if (!authToken) {
  //     navigate('/login'); // Redirect to login if no token is found
  //   }
  // }, [navigate]);


  return (
    <div className='p-7  flex items-center bg-slate-100 justify-center mx-auto flex-col'>
        <div className='p-4 gap-4'>
            <img src={SuccessI}
            width={130}
            height={130}
            />
        </div>
        <p className='gap-4 px-4'>payment successful</p>
        <Link to={"/order"} className='bg-blue-500 text-white rounded w-150px p-3 '>go to order</Link>
    </div>
  )
}

export default Success