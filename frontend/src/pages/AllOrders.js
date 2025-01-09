import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'
import indianCurrency from '../helper/indianCurrency'


const AllOrders = () => {
    
        const[data,setData]= useState([])
      
        const fetchOrderDetails = async()=>{
          const response = await fetch(SummaryApi.allOrder.url,{
            method: SummaryApi.allOrder.method,
            credentials:'include'
          })
          const responseData = await response.json()
          setData(responseData.data)
      
          console.log("order list",responseData)
        }
      
        useEffect(()=>{
          fetchOrderDetails()
      
        },[])
        return(
      
            <div className='p-7 h-[calc(100vh-190px)] overflow-y-scroll '>
              {
                !data[0] && (
                  <p>no order available</p>
                )
              }
              <div className='p-4 w-full '>
                {
                  data.map((item,index)=>{
                    return(
                      <div key={item.userId+index} >
      
                        <p className='font-medium text-lg'>{moment(item.createdAt).format('ll')}</p>
                        <div className='border rounded '>
                            <div className='grid gap-2'>
      
                          {
                            item?.productDetails.map((product,index)=>{
                              return(
                                <div key={product.productId+index} className='flex gap-3 bg-slate-200'>
                                 <img src={product.image[0]}
                                 className='w-28 h-28 p-1 object-scale-down' 
                                 />
                                 <div>
                                    <div>{product.name}</div>
                                    <div className='flex gap-2 items-center'>
                                            <div>{indianCurrency(product.price)}</div>
                                            <div>Quantity:{product.quantity}</div>
                                      </div>
      
                                    </div>
                                  </div> 
                              )
                            })
                          }
                          
                        </div>
                          <div className='flex lg:flex-row flex-col p-3 gap-4'>
                              <div>
                                <div className='font-medium text-lg'>Payment Details : </div>
                                <p className=' ml-1'>Payment method:{item.paymentDetails.payment_method_type[0]}</p>
                                <p className=' ml-1'>Payment status:{item.paymentDetails.payment_status}</p>
                                
                              </div>
                              <div >
                                <div className='font-medium'>Shipping Details:</div>
                                {
                                  item.shipping_options.map((shipping,index)=>{
                                    return(
                                      <div className=' ml-1' key={shipping.shipping_rate}>
      
                                        Shipping amount:{shipping.shipping_amount}
      
                                      </div>
      
                                  )}
                                  
                                    
                                  
                                  )}

                              <p> Shipping Name:{item.shippingDetails.shipping_name}</p>
                              <p>
                                  Shipping address: 
                                  {`${item.shippingDetails.shipping_address.line1}, 
                                    ${item.shippingDetails.shipping_address.line2 ? item.shippingDetails.shipping_address.line2 + ', ' : ''}
                                    ${item.shippingDetails.shipping_address.city}, 
                                    ${item.shippingDetails.shipping_address.state} - 
                                    ${item.shippingDetails.shipping_address.postal_code}`}
                                </p>

                              </div>
                          </div>
                          <div className='font-semibold '>
                            Total Amount :{indianCurrency(item.totalAmount)}
                          </div> 
                        </div>    
      
                      </div>
                    )
                  })
                }
              </div>
              
            </div>
      )
    
}

export default AllOrders