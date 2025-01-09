import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProducts = () => {
  const [openUploadproduct, setOpenUploadProduct]= useState(false)
  
  const [allProduct,setAllProduct]= useState([])

  const fetchAllProduct = async() =>{
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()

    console.log("Product data",dataResponse)

    setAllProduct(dataResponse?.data || [] )
  }
  useEffect(()=>{
    fetchAllProduct()
  },[])

  return (
    <div>
      <div className='bg-white py-7 px-2 flex items-center justify-between'>
        <h2 className='font-bold text-lg'>All product</h2>
         <button className='bg-blue-500 rounded text-white px-3 py-1 hover:bg-blue-600 border-blue-500' onClick={()=>setOpenUploadProduct(true)}>upload product</button>

      </div>
        <div className='flex items-center flex-wrap px-2 py-4 gap-5 h-[calc(100vh-190px)]  overflow-y-scroll'>
  
        {
          allProduct.map((product,index)=>{
            return(
              <AdminProductCard data={product} key={index+"allProduct"} fetchdata={fetchAllProduct}/>
              
            )
          }) 
        }
        </div>


        {
          openUploadproduct && (
            <UploadProduct onClose ={()=>setOpenUploadProduct(false)} fetchData={fetchAllProduct} />
          )
        }

        

    </div>
  )
}

export default AllProducts
