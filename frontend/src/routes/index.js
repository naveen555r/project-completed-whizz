import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Signup from "../pages/Signup";
import AdminPanel from "../pages/AdminPanel"
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import WhizzCart from "../pages/WhizzCart";
import SearchProduct from "../pages/SearchProduct";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import OrderPage from "../pages/OrderPage";
import AllOrders from "../pages/AllOrders";
import VerifyOtp from "../pages/VerifyOtp";
import ResetPassword from "../pages/ResetPassword";




const router = createBrowserRouter([
    {
        path : "/",
        element: <App/>,
        children : [
            {
                path:"",
                element:<Home/>
            },
            {
                path:"login",
                element :<Login/>
            },

            {
                path:"forgot-password",
                element :<ForgotPassword/>
            },
            {
                path:"send-otp",
                element :<VerifyOtp/>
            },
            {
                path:"reset-password",
                element :<ResetPassword/>
            },
            
            {
                path:"sign-up",
                element :<Signup/>
            },
            {
                path:"product-category/:categoryName",
                element :<CategoryProduct/>
            },
            {
                path:"product/:id",
                element :<ProductDetails/>
            },
            {
                path:"cart",
                element :<WhizzCart/>
            },
            {
                path:"success",
                element :<Success/>
            },
            {
                path:"cancel",
                element :<Cancel/>
            },
            {
                path:"search",
                element :<SearchProduct/>
            },
            {
                path:"order",
                element :<OrderPage/>
            },
            {
                path:"admin-panel",
                element :<AdminPanel/>,
                children: [
                    {
                      path : "all-users",
                      element : <AllUsers/>
                    },
                    {
                        path : "all-products",
                        element : <AllProducts/> 
                    },
                    {
                        path : "all-orders",
                        element : <AllOrders/> 
                    }

                ]
            }
        ]    
    }
        
    
])


export default router;