import React from 'react'
import CancelE from '../images for websites/cancel.gif'
import { Link } from 'react-router-dom'

const Cancel = () => {
  return (
    <div className='p-7 flex items-center justify-center flex-col'>
        <div className='p-4 gap-4'>
            <img src={CancelE}
            width={130}
            height={130}
            />
        </div>
        <p className='gap-4 px-4'>payment declined </p>
        <Link to={"/cart"} className='bg-blue-500 text-white rounded w-150px p-3 '>go to cart</Link>
    </div>
  )
}

export default Cancel