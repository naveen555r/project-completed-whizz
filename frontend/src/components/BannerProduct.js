import React, { useEffect, useState } from 'react';
import petfood2 from '../images for websites/banner images/petfood_2.jpg';
import petfood1 from '../images for websites/banner images/petfood_1.jpg';
import petfood3 from '../images for websites/banner images/petfood_3.jpg';
import petfood4 from '../images for websites/banner images/petfood_4.jpg';
import proteinfood1 from '../images for websites/banner images/protein_1.jpg';
import proteinfood2 from '../images for websites/banner images/protein_2.jpg';
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

const BannerProduct = () => {

    const[currentImage,setCurrentImage] = useState(0)

    const desktopImages =[
        petfood2,
        petfood1,
        petfood3,
        petfood4,
        proteinfood1,
        proteinfood2
    ]
    const nextImage=()=>{
        if(desktopImages.length - 1> currentImage){
            setCurrentImage(prev =>prev +1)

        }
        
    }
    const prevImage=()=>{
        if(currentImage !=0){
            setCurrentImage(prev =>prev -1)

        }
        
    }
    useEffect(()=>{
        const interval = setInterval(()=>{
            if(desktopImages.length - 1> currentImage){
                nextImage()
            }else{
                setCurrentImage(0)
            }

        },4000)

        return ()=> clearInterval(interval)
    },[currentImage])


  return (
    <div className='container px-4 py-12  rounded'>
        <div className='h-96 w-full image- bg-slate-200 relative'>
            <div className='absolute z-10 h-full w-full items-center  md:flex'>
                <div className=' justify-between flex w-full text-2xl '>
                    <button onClick={ prevImage} className='bg-white shadow-md rounded-full'><FaAngleLeft/></button>
                    <button onClick={nextImage} className='bg-white shadow-md rounded-full'><FaAngleRight/></button>
                </div>
            </div>
            <div className='flex h-full w-full overflow-hidden'>
            {
                desktopImages.map((imageURl,index)=>{
                    return(

                        <div className='w-full h-full min-w-full min-h-full transition-all 'key={imageURl} style={{transform : `translateX(-${currentImage*100}%)`}}>

                            <img src={imageURl} className='w-full h-full'/>
                        
                         </div>
                    )
                })
            }
            </div>
                   
        </div>
    </div>
  )
}

export default BannerProduct