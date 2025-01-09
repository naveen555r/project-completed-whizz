import React, { useState } from 'react'
import { GrClose } from "react-icons/gr";
import productCategory from '../helper/productCategory';
import { IoMdCloudUpload } from "react-icons/io";
import uploadImage from '../helper/uploadImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const UploadProduct = ({
    onClose,
    fetchData
})=> {
  const [data,setData] = useState({
    productName : "",
    brandName : "",
    category  : "",
    description: "",
    productImage :[],
    price  : "",
    sellingPrice : ""  
  })
  

  
  const handleOnChange = (e)=>{
    const { name, value} = e.target

    setData((prev)=>{
      return{
        ...prev,
        [name]  : value
      }
    })
}
  const handleUploadProduct = async(e) =>{
    const file = e.target.files[0]
    
    console.log("file",file)

    const uploadImageCloudinary = await uploadImage(file)

    console.log("upload Image",uploadImageCloudinary.url)

    setData((prev)=>{
        return{
            ...prev,
            productImage : [...prev.productImage, uploadImageCloudinary.url]
        }
    })

  }

  const handleDeleteproductImage = async(index) =>{

    console.log("image index", index)

    const newProductImage = [...data.productImage]
    newProductImage.splice(index,1)

    setData((prev)=>{
      return{
        ...prev,
        productImage :[...newProductImage]
      }
    })

  }
  //to upload product
  const handleSubmit = async(e) =>{

    e.preventDefault()
    
    const response = await fetch(SummaryApi.uploadProduct.url,{
      method : SummaryApi.uploadProduct.method,
      credentials : 'include',
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(data)
    })
    const responseData =  await response.json()

    if(responseData.success){
      toast.success(responseData?.message)
      onClose()
      fetchData()
    }
    
    if(responseData.error){
      toast.error(responseData?.message)
    }
  }


  return (
    <div className='fixed w-full h-full bg-slate-100 bg-opacity-30 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
        <div className='bg-white rounded p-4 w-full max-w-2xl h-full  max-h-[80%] overflow-hidden'> 
            <div className='flex justify-between items-center'>
               
               <h2 className='font-bold text-lg'>upload product</h2>
               <div className='w-fit ml-auto cursor-pointer'onClick={onClose}>
                   <GrClose/>

               </div>

            </div>
        <form className='grid p-3 h-full  overflow-y-auto max-h-[65vh] pb-5'onSubmit={handleSubmit}>
            <label htmlFor='productName' className='mt-3'>Product Name :</label>
              <input 
                type='text' 
                id='productName' 
                placeholder='enter product name' 
                value={data.productName} 
                name='productName'
                onChange={handleOnChange}
                className='p-2 bg-slate-200 border rounded'
                required
              />

              <label htmlFor='brandName' className='mt-3'>Brand Name :</label>
              <input 
                type='text' 
                id='brandName' 
                placeholder='enter brand name' 
                value={data.brandName} 
                name='brandName'
                onChange={handleOnChange}
                className='p-2 bg-slate-200 border rounded'
                required
              />

              <label htmlFor='category' className='mt-3'>Category :</label>
              <select required value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-200 border rounded'>
                  <option value={""}>Select Category</option>
                  {
                    productCategory.map((el,index)=>{
                      return(
                        <option value={el.value} key={el.value+index}>{el.label}</option>
                      )
                    })
                  }
              </select>
              <label htmlFor='productImage'className='mt-3'>Product image:</label>
              <label htmlFor='uploadImageInput'>
              <div className='p-2 bg-slate-200 border rounded w-full h-32 flex justify-center items-center cursor-pointer'>
               
                    <div className='text-slate-400'>
                        
                           <span className='text-7xl'><IoMdCloudUpload /></span>   
                            <p className='text-sm'>upload product image</p>
                            <input type='file' id='uploadImageInput' className='hidden'onChange={handleUploadProduct}/>
        
                    </div> 
               

              </div>
              </label> 
              <div>
                {
                    data?.productImage[0]?(
                       <div className='flex items-center gap-3'>
                            {
                                data.productImage.map((el,index)=>{

                                    return(
                                      <div className='relative'>
                                        <img 
                                         src ={el} 
                                         alt='el' 
                                         width={80}
                                         height={80} 
                                         className='bg-slate-200 border'
                                        />
                                         <div className='absolute bottom-0 right-0 p-1 text-white bg-blue-500 rounded-full cursor-pointer' onClick={()=> handleDeleteproductImage(index)}>
                                           <MdDelete />
                                         </div>
                                      </div>   
                                    )
                                })
                            }    
                        </div>

                        
                        
                    ) :(
                        <p className='text-blue-500'>*please upload product Image</p>

                    )
                }
                

                
              </div>


              <label htmlFor='price' className='mt-3'>Price :</label>
              <input 
                type='number' 
                id='price' 
                placeholder='enter price' 
                value={data.price} 
                name='price'
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
              />


              <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
              <input 
                type='number' 
                id='sellingPrice' 
                placeholder='enter selling price' 
                value={data.sellingPrice} 
                name='sellingPrice'
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
              />

              <label htmlFor='description' className='mt-3'>Description :</label>
              <textarea 
                className='h-28 bg-slate-100 border resize-none p-2' 
                placeholder='enter product description' 
                rows={3} 
                onChange={handleOnChange} 
                name='description'
                value={data.description}
              >
              </textarea>
             
             <button className='px-3 py-2 bg-blue-500 mb-10 mt-4'>upload Product </button>



            
        </form> 

           
        </div>
        
        


    </div>
  ) 
}

export default UploadProduct
