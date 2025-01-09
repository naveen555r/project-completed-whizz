import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'

const SearchProduct = () => {
    const query = useLocation()
    const [data,setData] = useState([])
    const  [loading,setLoading] = useState(false)

    console.log("query",query.search )

    const fetchProduct = async()=>{
      setLoading(true)
      const response = await fetch(SummaryApi.searchProduct.url + query.search)
      const dataResponse = await response.json()
      setLoading(false)

      setData(dataResponse.data)


      
    }

    useEffect(()=>{
      fetchProduct()
    },[query])

    
  return (
    <div className='container mx-auto p-7'>
      {
        loading && (
          <p className='text-lg text-center'>Loading .....</p>
        )
      }
      <p>Search Results : {data.length}</p>

      {
        data.length === 0 && !loading && (
           <p className='bg-white text-center text-lg p-4'>data not found</p>
        )
      }
      {
        data.length !==0  && ! loading && (
          
              <VerticalCard loading={loading} data={data}/>
            
          )
        
      } 
        
    </div>
  )
}

export default SearchProduct