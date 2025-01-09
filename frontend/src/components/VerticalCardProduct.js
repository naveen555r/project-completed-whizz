import React, { useContext, useEffect, useRef, useState } from 'react'

import indianCurrency from '../helper/indianCurrency'
import fetchCategoryWiseProduct from '../helper/fetchCategoryWiseProduct'
import Context from '../context'
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import addToCart from '../helper/addToCart';


const VerticalCardProduct = ({category,heading}) => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const loadingList = new Array(3).fill(null)

    const[scroll,setScroll]= useState(0)
    const scrollElement = useRef()

    const {fetchUserAddToCart} = useContext(Context)

    const handleAddToCart = async(e,id)=>{
        await addToCart(e,id)
        fetchUserAddToCart()
    }

    const fetchData = async() =>{
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        console.log("vertical data", categoryProduct.data)
        setData(categoryProduct?.data)
    }

    useEffect(()=>{
        fetchData()

    },[])

    // const scrollRight =() =>{
    //     scrollElement.current.scrollLeft += 300
    // }
    // const scrollLeft =() =>{
    //     scrollElement.current.scrollLeft -= 300
    // }


  return (
    <div className='container mx-auto px-4 py-1 relative overflow-x-scroll scrollbar-none'>
        <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
        <div className='flex items-center gap-4'>
            <button><FaAngleLeft/></button>
            <button><FaAngleRight/></button>
            {
                loading ?(
                    loadingList.map((_,index)=>{
                        return(
                            <div 
                                key={index} 
                                className='w-full min-w-[280px] max-w-[280px] bg-white rounded-sm shadow animate-pulse'
                            >
                                {/* Image Placeholder */}
                                <div className='bg-slate-200 h-48 p-4 flex justify-center items-center rounded-sm'>
                                    <div className='h-32 w-32 bg-slate-300 rounded'></div>
                                </div>
                                
                                {/* Text Placeholder */}
                                <div className='p-4 grid gap-3'>
                                    <div className='h-4 bg-slate-300 rounded w-3/4'></div> {/* Product Name */}
                                    <div className='h-3 bg-slate-300 rounded w-1/2'></div> {/* Category */}
                                    <div className='flex gap-4'>
                                        <div className='h-4 bg-slate-300 rounded w-1/4'></div> {/* Selling Price */}
                                        <div className='h-4 bg-slate-300 rounded w-1/4'></div> {/* Price */}
                                    </div>
                                    <div className='h-6 bg-slate-300 rounded w-1/3'></div> {/* Add to Cart Button */}
                                </div>
                            </div>

                        )
                    })
                ):(
                    data.map((product,index)=>{
                        return(
                            <Link to={"product/"+product?._id} className='w-full min-w-[280px] max-w-[280px] bg-white rounded-sm shadow'>
                                    <div  className='bg-slate h-48 p-4 min-w-[280px] flex justify-center items-center'>
                                        <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-105 transition-all mix-blend-multiply'/> 

                                    </div>
                                    <div className='p-4 grid gap-3 items-center '>
                                        <h2 className=' font-medium text-ellipsis line-clamp-2'>{product?.productName}</h2>
                                        <p className='capitalize'>{product?.category}</p>
                                        <div className='flex  gap-4'>
                                            <p className='font-medium'>{indianCurrency(product?.sellingPrice) }</p>
                                            <p className='line-through'>{indianCurrency(product?.price) }</p>
                                        </div>
                                        <button className='bg-blue-500 hover:bg-blue-600 text-white text-sm py-0.5 px-3 rounded-full 'onClick={(e)=>handleAddToCart(e,product?._id)}>Add to cart</button>    


                                    </div>   



                             </Link>   

                        )
                    })
                )

            }
        </div>

    </div>
  )
}

export default VerticalCardProduct