import logo from './logo.svg';
import './App.css';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setuserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch()
  const [cartProductCount,setCartProductCount] = useState(0)
  const navigate =useNavigate();
  const location = useLocation()

  const fetchuserDetails = async()=>{
    const dataResponse = await fetch(SummaryApi.current_user.url,{
      method : SummaryApi.current_user.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    if(dataApi.success){
      dispatch(setuserDetails(dataApi.data))

    } // } else {
    //   // Force redirect to login if session expired
    //   navigate("/login", { replace: true });
    // }

    
  } 

  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
      method : SummaryApi.addToCartProductCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    //console.log("dataApi",dataApi)
    setCartProductCount(dataApi?.data?.count)
  }

  useEffect(()=>{
    //USER DETAILS

    fetchuserDetails()
    //user detail cart product
    fetchUserAddToCart()
  
    
  },[location.pathname])


  return (
    <>

    <Context.Provider value={{
        fetchuserDetails, // FOR FETCHING USER DETAILS
        cartProductCount,  //curent user add to cart product count
        fetchUserAddToCart

     }}>

     <ToastContainer position='top-center'/>
    
     <Header/>
     <main className='min-h-[calc(90vh-120px)] pt-10 '>
     <Outlet/>
     </main>

   
     <Footer/>

     </Context.Provider>
    </>
  );
}

export default App;


