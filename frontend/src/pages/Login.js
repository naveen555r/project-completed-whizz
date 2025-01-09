import React, { useContext } from 'react'
import loginicons from '../images for websites/USER.png';
import { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import {  Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword,setShowPassword] =useState(false)
    const [data,setData] = useState({
        email : "",
        password :""
    })

    const navigate =useNavigate()
    const {fetchuserDetails,fetchUserAddToCart} = useContext(Context)
    

    const handleOnchange = (e) =>{
        const{name, value } = e.target
        setData((prev)=>{
            return{
                ...prev,
                [name]: value
            }
        })
    }
    
    const handleSubmit = async(e) =>{
        e.preventDefault()
        
        const dataResponse = await fetch(SummaryApi.signIn.url,{
          method : SummaryApi.signIn.method,
          credentials:'include',
          headers : {
            "content-type" : "application/json"
          },
          body : JSON.stringify(data)  
        })
        
        const dataApi = await dataResponse.json()

        if(dataApi.success){
           toast.success(dataApi.message)
           navigate('/')
           fetchuserDetails()
           fetchUserAddToCart() 
        }
        if(dataApi.error){
            toast.error(dataApi.message)
        }
        
    }


    
  
    return (
    <section id='login' className='mt-16'>
        <div className='mx-auto container px-4'>


           <div className='bg-white p-2 py-10 w-full max-w-md mx-auto'>
                <div className='w-20 h-20 mx-auto'>
                   <img src={loginicons}alt='login icons'/>
                </div>
                <form className='pt-8 flex flex-col gap-2' onSubmit={handleSubmit}>
                    <div className='grid'>
                        <label>Email :</label>
                        <div className='bg-slate-100 p-2 flex'>
                           <input 
                              type='email' 
                              placeholder='enter email '
                              name='email'
                              value={data.email}
                              onChange={handleOnchange}
                              required
                              className='w-full h-full focus:outline-none bg-transparent'/>
                        </div>
                    </div>
                    <div>
                        <label>Password :</label>
                        <div className='bg-slate-100 p-2 flex'>
                          <input
                           type={showPassword ? "text": "password"} 
                           placeholder='enter password'
                           value={data.password}
                           name='password'
                           onChange={handleOnchange}
                           required 
                           className='w-full h-full focus:outline-none bg-transparent'/>
                           <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((prev)=>!prev)}>
                            <span>
                                {
                                    showPassword ? (
                                        <FaEyeSlash /> 

                                    )
                                    :
                                    (
                                        <FaEye /> 

                                    )
                                }
                               
                               
                            </span>

                          </div>
                        </div>
                        
                    </div>
                    {/* Forgot Password Link */}
                    <p className='mt-2 text-sm'>
                            <Link to="/forgot-password" className="hover:underline text-blue-600">
                                Forgot Password?
                            </Link>
                    </p>

                    <button className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 w-150px rounded-full mx-auto block mt-6 '>Login</button>
                </form>  
                <p className='mt-8'>Don't have account? <Link to={"/sign-up"}className='hover:underline'>sign up</Link></p>
           </div>
        </div> 
        
    </section>
  )
}

export default Login
