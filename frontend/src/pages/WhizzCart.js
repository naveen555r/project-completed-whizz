import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import indianCurrency from '../helper/indianCurrency'
import { MdDelete } from "react-icons/md";
import {loadStripe} from '@stripe/stripe-js';

const WhizzCart = () => {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const [shippingAddress, setShippingAddress]= useState({
        name:'',
        address:'',
        city: '',
        pinCode: '',
        state: '',
    });
    const context = useContext(Context)
    const loadingCart = new Array(4).fill(null)



    const fetchData = async () => {
        try {
          const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: 'include',
            headers: {
              "content-type": "application/json",
            },
          });
      
          const responseData = await response.json();
          console.log("API Response for Cart Items:", responseData); // Log server response
      
          if (responseData.success) {
            setData(responseData.data); // Ensure `responseData.data` contains the cart items
          } else {
            console.error("Failed to fetch cart items:", responseData.message);
          }
        } catch (error) {
          console.error("Error fetching cart items:", error.message);
        }
      };
      

    const handleLoading = async() =>{
        await fetchData()
    }

    useEffect(()=>{
        setLoading(true)
        handleLoading()
         setLoading(false)
    },[])

    const handleShippingChange = (e) => {
        setShippingAddress({
          ...shippingAddress,
          [e.target.name]: e.target.value,
        });
      };


    const increaseQty = async(id,qty) =>{
        const response = await fetch(SummaryApi.updateCartProduct.url,{
            method : SummaryApi.updateCartProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
            body : JSON.stringify(
                {   
                    _id : id,
                    quantity : qty + 1
                }
            )
        })

        const responseData = await response.json()


        if(responseData.success){
            fetchData()
        }
    }


    const decreaseQty = async(id,qty) =>{
       if(qty >= 2){
            const response = await fetch(SummaryApi.updateCartProduct.url,{
                method : SummaryApi.updateCartProduct.method,
                credentials : 'include',
                headers : {
                    "content-type" : 'application/json'
                },
                body : JSON.stringify(
                    {   
                        _id : id,
                        quantity : qty - 1
                    }
                )
            })

            const responseData = await response.json()


            if(responseData.success){
                fetchData()
            }
        }
    }

    const deleteCartProduct = async(id)=>{
        const response = await fetch(SummaryApi.deleteCartProduct.url,{
            method : SummaryApi.deleteCartProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
            body : JSON.stringify(
                {   
                    _id : id,
                }
            )
        })

        const responseData = await response.json()

        if(responseData.success){
            fetchData()
            context.fetchUserAddToCart()
        }
    }
    const handlePayment = async () => {

            // const authToken = localStorage.getItem('authToken');
            // if (!authToken) {
            //     alert("Please log in to proceed with payment.");
            //     window.location.href = '/login';
            //     return;
  


          //console.log("Shipping Address:", shippingAddress)  
        
      
          //console.log("Transformed Cart Items:", cartItems);
          const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
          const response = await fetch(SummaryApi.payment.url, {
            method: SummaryApi.payment.method,
            credentials: 'include',
            headers: {
              "content-type": "application/json",
            //   Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ 
                cartItems: data,
                shippingAddress:shippingAddress }
            ),
          });
      
          const responseData = await response.json();
          console.log("Payment Response:", responseData);

          if(responseData?.id){
            stripePromise.redirectToCheckout({sessionId : responseData.id})
          }
         
      };
      

    const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity,0)
    const totalPrice = data.reduce((preve,curr)=> preve + (curr.quantity * curr?.productId?.sellingPrice) ,0)
  return (
    <div className='container mx-auto p-5'>
        <div className='text-center text-lg my-3'>
            {
                data.length === 0 && !loading && (
                    <p className='bg-white py-5'>Data none</p>
                )
            }
        </div>
        <div className='flex gap-10 p-4 lg:justify-between'>
            {/* view product */}
            <div className=' w-full max-w-3xl'>
                <div>
                    {
                        loading  ? (
                            loadingCart.map(el=>{
                                return(
                                    <div key={el +"Add To Cart Loading" } className='w-full h-32 bg-slate-300 my-2 border-slate-400 animate-pulse rounded'>

                                    </div>

                                )
                            })
                                

                        ):(
                            data.map((product,index)=>{
                                return(
                                    <div key={product?._id +"Add To Cart Loading" } className='w-full h-32 bg-white my-2 border-slate-500 rounded grid grid-cols-[128px,1fr]'>
                                        <div className='w-24 h-24'>
                                            <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply'/>

                                        </div> 
                                        <div className='px-4 py-2 relative'>
                                            {/** DELETE PRODUCT */}
                                            <div className='absolute right-0 p-2 hover:bg-blue-400' onClick={()=>deleteCartProduct(product?._id)}>
                                               <MdDelete />

                                            </div>    
                                            <h2 className='text-lg line-clamp-1 text-ellipsis'>{product?.productId?.productName}</h2>
                                            <p>{product?.productId?.category}</p>
                                            <div className='flex items-center justify-between'>
                                                    <p>{indianCurrency(product?.productId?.sellingPrice)}</p>
                                                    <p>{indianCurrency(product?.productId?.sellingPrice*product.quantity)}</p>

                                            </div>
                                            
                                            <div className='flex items-center '>
                                                <button className='p-1 border border-blue-500 'onClick={()=>decreaseQty(product?._id,product?.quantity)}>-</button>
                                                <span className='p-2'>{product?.quantity}</span>
                                                <button className='p-1 border border-blue-500 ' onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button> 
                                            </div>
                                        </div>
                                                  

                                    </div>
                                )
                            })
                        )
                    }
                </div>
            </div>
            {/* summary */}
             {
                    data[0] && (
                        <div className='lg:mt-0 w-full max-w-sm'>
                {
                    loading ? (
                        
                        <div className='h-36 bg-slate-200'>
                            

                        </div>

                    ):(
                        <div className='h-36 bg-slate-200'>
                            <h2 className='text-white bg-black px-4 py-1 text-center'>Summary</h2>
                            <div className='flex items-center justify-between gap-2'>
                                <p>Quantity</p>
                                <p>{totalQty}</p>
                            </div>
                            <div className='flex items-center justify-between gap-2'>
                                <p>Total price</p>
                                <p>{indianCurrency(totalPrice)}</p>
                            </div>
                            
                            {/* Shipping Address Form */}
                            <div className="my-4">
                            <h3 className="text-lg">Shipping Address: </h3>
                            <input name="name" value={shippingAddress.name} onChange={handleShippingChange} className="w-full mb-2 p-2" placeholder="Full Name" required />
                            <input name="address" value={shippingAddress.address} onChange={handleShippingChange} className="w-full mb-2 p-2" placeholder="Address" required />
                            <input name="city" value={shippingAddress.city} onChange={handleShippingChange} className="w-full mb-2 p-2" placeholder="City" required />
                            <input name="pinCode" value={shippingAddress.pinCode} onChange={handleShippingChange} className="w-full mb-2 p-2" placeholder="PinCode" required />
                            <input name="state" value={shippingAddress.state} onChange={handleShippingChange} className="w-full mb-2 p-2" placeholder="state" required />
                            </div>

                            <button className='bg-indigo-800 items-center justify-center text-white w-full p-2 flex' onClick={handlePayment}>Payment</button>    

                        </div>

                    )
                }
                </div>
                        

                    )
             } 
            
        </div>
    </div>
  )
}

export default WhizzCart