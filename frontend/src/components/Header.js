import React, { useContext, useEffect, useState } from 'react'
import Logo from './Logo'
import { IoSearchOutline } from "react-icons/io5";
//import { FaRegUserCircle } from "react-icons/fa";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { setuserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';
import { MdOutlineRadioButtonChecked } from "react-icons/md";


const Header = () => {
  const user = useSelector(state => state?.user?.user)

  const dispatch = useDispatch()
  const [menuDisplay,setMenuDisplay]= useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const location = useLocation()
  const searchInput = useLocation()
  const [search,setSearch] = useState(searchInput?.search?.split("=")[1] ||'')

  

 
  
  const handleLogout = async () => {
    try {
      const fetchData = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method,
        credentials: 'include',
      });

      const data = await fetchData.json();

      if (data.success) {
        toast.success(data.message);
        dispatch(setuserDetails(null));
        localStorage.clear();
        sessionStorage.clear();
        navigate('/login');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Logout failed', error);
      toast.error('Could not log out');
    }
  };
  // Watch for route changes and verify session
  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await fetch(SummaryApi.current_user.url, {
          method: SummaryApi.current_user.method,
          credentials: 'include',
        });

        const data = await response.json();

        if (!data.success) {
          dispatch(setuserDetails(null));
          localStorage.clear();
          sessionStorage.clear();
        }
      } catch (error) {
        console.error('Error checking session:', error);
        dispatch(setuserDetails(null));
        localStorage.clear();
        sessionStorage.clear();
      }
    };

    verifySession();
  }, [location]);

  const handleSearch = (e)=>{
    setSearch(e.target.value)
    }

  
  const handleSearchSubmit = () => {
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search)}`);
    } else {
      toast.warn('Please enter a search term!');
    }
  }  
  
  return (
    <header className='h-16 shadow-md bg-white fixed  w-full z-40 '>
  <div className='h-full container-mx-auto flex items-center '>
    <div className='flex items-center space-x-1'>
      <Link to={"/"}>
        <Logo className w={90} h={50} />
      </Link>
      <span className="text-xl font-semibold text-blue-500 ml-0 ">Whizz</span>
    </div>

    <div className='hidden lg:flex items-center w-full justify-between max-w-screen-sm border rounded-full focus-within:shadow pl-2 ml-52'>
      
      <input type='text' placeholder='search product here....' className='w-full outline-none ' onChange={handleSearch} value={search}  />
      <div className='text-lg min-w-{55px} h-8 bg-blue-500 flex items-center justify-center rounded-r-full text-white cursor-pointer'onClick={handleSearchSubmit}>
        <IoSearchOutline />
      </div>
    </div>

    <div className='relative flex justify-center ml-10'> {/* Added margin-left here */}
      
      {
         user?._id && user?.role !== ROLE.ADMIN && (
          <div className='text-3xl cursor-pointer relative flex justify-center' onClick={() => setMenuDisplay(prev => !prev)} >
             <MdOutlineRadioButtonChecked />
             </div>

         ) 
      }
      
      
      {
        menuDisplay && (
          <div className='absolute top-8 bottom-0 bg-blue-500 h-fit p-1 mt-0 shadow-lg rounded'>
            
                <nav className=''>
                  {
                    user?.role ===ROLE.ADMIN && (
                      
                      <Link to={"/admin-panel/all-products"} className='whitespace-nowrap text-white hover:bg-blue-500 p-1 'onClick={() => setMenuDisplay(prev => !prev)}>Admin panel</Link>

                    )
                  }
                  
                  <Link to={'/order'}className='whitespace-nowrap text-white hover:bg-blue-500 p-1 '>order</Link>
                  
                </nav>
            
          </div>
        )
      }
    </div>

    {
      user?._id && user?.role !== ROLE.ADMIN &&(

              <Link to={"/cart"} className='text-2xl relative ml-20'>

            <span><PiShoppingCartSimpleBold /></span>
            

            <div className='bg-blue-500 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute'
              style={{ top: '-8px', right: '-8px' }}
            >
              <p className='text-sm'>{context?.cartProductCount}</p>
            </div>
          </Link>

      )
    }

    <div>
      {
        user?._id ? (
          <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-blue-500 ml-10 hover:bg-blue-600'>Logout</button>
        )
        :
        (
          <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-blue-500 ml-10 hover:bg-blue-600'>Login</Link>
        )
      }
    </div>

  </div>

</header>
  );

}
export default Header