import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md"
import AdminEditProduct from './AdminEditProduct';
import indianCurrency from '../helper/indianCurrency';
import SummaryApi from '../common';

const AdminProductCard = ({
    data,
    fetchdata
}) => {
    const [editProduct,setEditProduct] = useState(false)
      // Function to handle product deletion
    const handleDelete = async (e) => {
      e.preventDefault();
      if (window.confirm(`Are you sure you want to delete the product "${data.productName}"?`)) {
          try {
              const response = await fetch(SummaryApi.deleteProduct.url, {
                  method: SummaryApi.deleteProduct.method,
                  credentials: 'include',
                  headers: {
                      "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ _id: data._id }),
              });

              const responseData = await response.json();

              if (response.ok) {
                  alert(responseData.message || 'Product deleted successfully.');
                  fetchdata(); // Refresh the product list after deletion
              } else {
                  alert(responseData.message || 'Failed to delete the product.');
              }
          } catch (error) {
              console.error('Error deleting product:', error);
              alert('An error occurred while deleting the product.');
          }
      }
  };
  return (
          <div className='bg-white rounded p-6  '>

            <div className='w-40 '>
                <div className='flex  flex-col items-center'>
                  <div className='w-32 h-32 flex   justify-center items-center overflow-hidden'>

                  <img src={data?.productImage[0]} className='object-cover w-full h-full  mx-auto ' />
                  </div> 
                  <h1 className='line-clamp-2 text-ellipsis overflow-hidden'>{data.productName}</h1>

                </div>

                

                <div className='flex items-center justify-between mt-2'>
                    <p className='font-semibold'>
                      {
                        indianCurrency(data.sellingPrice)
                      }
                      
                    </p>
                    <div className='w-fit ml-auto bg-red-200 rounded hover:bg-red-500' onClick={()=>setEditProduct(true)}>
                      <MdEdit />

                    </div>
                    <div className='w-fit ml-auto bg-red-200 rounded hover:bg-red-500'onClick={handleDelete} >
                       <MdDelete />


                    </div>
                </div>
            </div>

            {
                editProduct && (

                    <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchdata={fetchdata}/>

                )
            }
             
          </div> 
  )
}

export default AdminProductCard