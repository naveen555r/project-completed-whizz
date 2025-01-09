import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'

const CategoryList = () => {
      const[categoryProduct,setcategoryProduct] =useState([])
      const [loading,setLoading] = useState(false)

      const categoryLoading = new Array(3).fill(null)

      const fetchcategoryProduct = async() =>{
          setLoading(true)
          const response = await fetch(SummaryApi.categoryProduct.url)
          const dataResponse = await response.json()
          setLoading(false)
          setcategoryProduct(dataResponse.data)

      }
      useEffect(()=>{
        fetchcategoryProduct()
      },[])

  return (
    <div to={"/product-category"} className='container mx- auto p-4 items-center justify-center flex flex-col'>
         <div className='flex items-center gap-10'>
            {
              categoryProduct.map((product,index)=>{
                return(
                  <div className='  cursor-pointer'key={product?.category}>
                      <div className='w-32 h-32 rounded-full overflow-hidden p-3  bg-white flex items-center justify-center'>
                        <img src={product?.productImage[0]} alt={product?.category} className='h-full object-fill hover:scale-105'/>
                      </div>
                      <p className='text-center line-clamp-2 text-ellipsis overflow-hidden capitalize'>{product?.category}</p>
                  </div> 
                )
              })
            }

         </div>

    </div>
  )
}

export default CategoryList