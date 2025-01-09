import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import Context from '../context/index'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import indianCurrency from "../helper/indianCurrency"
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import AddToCart from '../helper/addToCart'

const ProductDetails = () => {
    const [data, setData] = useState({
        productName: "",
        brandName: "",
        category: "",
        description: "",
        productImage: [],
        price: "",
        sellingPrice: ""
    });
    const [activeImage, setActiveImage] = useState("");
    const [loading, setLoading] = useState(false); // Corrected setLoading casing

    const { fetchUserAddToCart } = useContext(Context);
    const navigate = useNavigate();
    const params = useParams();

    const productImageListLoading = new Array(4).fill(null);

    const fetchProductDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.ProductDetails.url, {
                method: SummaryApi.ProductDetails.method,
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ productId: params?.id })
            });
            const dataResponse = await response.json();
            setData(dataResponse?.data || {});
            setActiveImage(dataResponse?.data?.productImage?.[0] || ""); // Handle undefined case
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductDetails();
    }, [params]);

    const handleMouseEnterProduct = (imageURL) => {
        setActiveImage(imageURL);
    };

    const handleAddToCart = async (e, id) => {
        await AddToCart(e, id);
        fetchUserAddToCart();
    };

    const handleBuyProduct = async (e, id) => {
        await AddToCart(e, id);
        fetchUserAddToCart();
        navigate("/cart");
    };

    return (
        <div className='container mx-auto p-10'>
            <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
                <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
                    <div className='h-[300px] w-[300px] lg:h-96 bg-slate-200 relative p-2'>
                        <img src={activeImage || "defaultImage.jpg"} className='h-full w-full object-scale-down mix-blend-multiply' alt="Product" />
                    </div>

                    <div className='h-full'>
                        {loading ? (
                            <div className='flex gap-2 lg:flex-col overflow-hidden no-scrollbar h-full'>
                                {productImageListLoading.map((_, index) => (
                                    <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage" + index}></div>
                                ))}
                            </div>
                        ) : (
                            <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                                {data?.productImage?.map((imgURL) => (
                                    <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgURL}>
                                        <img src={imgURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={() => handleMouseEnterProduct(imgURL)} onClick={() => handleMouseEnterProduct(imgURL)} alt="Product Thumbnail" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {loading ? (
                    <div className='grid gap-1 w-full'>
                        {/* Loading skeleton */}
                    </div>
                ) : (
                    <div className='flex flex-col gap-1'>
                        <p className='bg-blue-500 text-white px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
                        <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
                        <p className='capitalize text-slate-400'>{data?.category}</p>
                        <div className=' flex items-center gap-1'>
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStarHalf />
                        </div>
                        <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
                            <p className=''>{indianCurrency(data.sellingPrice)}</p>
                            <p className='text-slate-400 line-through'>{indianCurrency(data.price)}</p>
                        </div>
                        <div className='flex items-center gap-3 my-2'>
                            <button className='border-2 border-blue-500 rounded px-3 py-1 min-w-[120px] text-black font-medium  hover:bg-blue-600 hover:text-white' onClick={(e) => handleBuyProduct(e, data?._id)}>Buy</button>
                            <button className='border-2 border-red-500 rounded px-3 py-1 min-w-[120px] font-medium  text-black hover:bg-red-600  hover:text-white' onClick={(e) => handleAddToCart(e, data?._id)}>Add To Cart</button>
                        </div>
                        <div>
                            <p className='text-slate-600 font-medium my-1'>Description :</p>
                            <p>{data?.description}</p>
                        </div>
                    </div>
                )}
            </div>

            {/* {data.category && (
                <CategoryWiseProductDisplay category={data?.category} heading={"Recommended Product"} />
            )} */}
        </div>
    );
};

export default ProductDetails;
