import React from 'react'
import loginicons from '../images for websites/USER.png';
import { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const Signup = () => {
    const [showPassword,setShowPassword] =useState(false)
    const [showConfirmPassword,setShowConfirmPassword] =useState(false)
    const [data,setData] = useState({
        name:"",
        email : "",
        password :"",
        confirmPassword:""
    })
    
    const navigate = useNavigate()

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

        if(data.password === data.confirmPassword){

            const dataResponse = await fetch(SummaryApi.signUp.url,{
                method : SummaryApi.signUp.method,
                headers : {
                    "content-type": "application/json"
                },
                body : JSON.stringify(data) 
    
            })
    
            const dataApi = await dataResponse.json()

            if(dataApi.success){
                toast.success(dataApi.message)
                navigate("/login")
            }

            if(dataApi.error){
                toast.error(dataApi.message)
            }

            

            

        }else{
            toast.error("please review password and confirm password")
            
        }

        
    }
    
  return (
    <section id='signup' className='mt-16'>
    <div className='mx-auto container px-4'>


       <div className='bg-white p-2 py-10 w-full max-w-md mx-auto'>
            <div className='w-20 h-20 mx-auto'>
               <img src={loginicons}alt='login icons'/>
            </div>
            <form className='pt-8 flex flex-col gap-2' onSubmit={handleSubmit}>
                
                <div className='grid'>
                    <label>Name :</label>
                    <div className='bg-slate-100 p-2 flex'>
                       <input 
                          type='text' 
                          placeholder='enter your name '
                          name='name'
                          value={data.name}
                          onChange={handleOnchange}
                          required
                          className='w-full h-full focus:outline-none bg-transparent'/>
                    </div>
                </div>
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
                <div>
                    <label>Confirm Password :</label>
                    <div className='bg-slate-100 p-2 flex'>
                      <input
                       type={showConfirmPassword ? "text": "password"} 
                       placeholder='enter confirm password'
                       value={data.confirmPassword}
                       name='confirmPassword'
                       onChange={handleOnchange}
                       required 
                       className='w-full h-full focus:outline-none bg-transparent'/>
                       <div className='cursor-pointer text-xl' onClick={()=>setShowConfirmPassword((prev)=>!prev)}>
                        <span>
                            {
                                showConfirmPassword ? (
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

                <button className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 w-150px rounded-full mx-auto block mt-6 '>Sign up</button>
            </form>  
            <p className='mt-8'>Already have account? <Link to={"/login"}className='hover:underline'>Login</Link></p>
       </div>
    </div> 
    
</section>

  )
}

export default Signup
