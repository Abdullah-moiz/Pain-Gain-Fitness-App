import React from 'react'
import { useState } from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { FiMoreHorizontal } from 'react-icons/fi'
import { BiSearchAlt } from 'react-icons/bi'
import { onAuthStateChanged } from 'firebase/auth'
import { Authentication } from '../../utils/firebase'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';
import axios from 'axios'
import './index.css'


import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react'
AOS.init();

export default function Card({ product, getCardData }) {



  const [userEmail, setUserEmail] = useState(undefined)
  const [verifiedEmail, setverifiedEmail] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(Authentication, (curUser) => {
      !curUser ? navigate('/') : setUserEmail(curUser.email);
      let checkVerification = curUser.emailVerified
      setverifiedEmail(checkVerification)
    })
  }, [navigate])

  const item = product;

  const [hover, setHover] = useState(false)


  const handlehoverIn = () => {
    setHover(true)
  }

  const handleHoverOut = () => {
    setHover(false)
  }

  const AddToCart = async () => {

    if(verifiedEmail === true)
    {
      const { _id, product_name, product_price, product_img, product_weight, product_desc, product_quantity } = item;
      let product_id = _id;
      let FinalData = { userEmail, product_id, product_name, product_price, product_img, product_weight, product_desc, product_quantity }
      console.log(FinalData)
      try {
        await axios.post('http://localhost:8000/AddtoCart', FinalData).then(res => res.data.msg === "Item Already in Cart" ? 
         swal("Oopss!", `${res.data.msg}`, "error") :  swal("Done!", `${res.data.msg}`, "success")
         )
      } catch (error) {
        console.log(`Error in adding Item to Cart  + ${error.message}`);
      }
    }
    else
    {
      swal("Done!", `Please Verify Your Account First`, "error")
    }
  }


  let handleCardClick = () => {
    getCardData(item)
    navigate('/productview')
  }





  return (
    <div className='w-80 m-4 h-96  relative transition-all duration-500 ' onMouseOver={handlehoverIn} onMouseOut={handleHoverOut}>
      <div className='w-full h-3/4  bg-gray-100'>
        <img src={item.product_img} className={`flex items-center justify-center w-full h-full `} alt="no img" />
      </div>
      {hover && (
        <div className='w-full  h-3/4 absolute top-0 left-0 flex flex-col items-center justify-center transition-all duration-500   makeitblur' data-aos="fade-out"  >
          <div data-aos="fade-up" className='flex flex-col items-start justify-center w-full p-2' >
            <h1 className='font-semibold text-xl p-1 m-2'>{item.product_name}</h1>
            <h1 className='font-semibold text-xl p-1 m-2'>RS {item.product_price}</h1>
          </div>
          <div className='flex items-center justify-start w-full p-2 '>
            <FiShoppingCart onClick={AddToCart} title="Cart" data-aos="fade-right" className='  p-3 font-semibold  mx-1 text-2xl cursor-pointer transition-all duration-300 bg-white   h-auto w-auto   hover:text-white hover:bg-black' />
            <BiSearchAlt onClick={() => navigate('/search')} title="Search" data-aos="fade-right" className='p-3 font-semibold  mx-1 text-2xl cursor-pointer transition-all duration-300 bg-white  h-auto w-auto hover:text-white hover:bg-black' />
            <FiMoreHorizontal onClick={() => handleCardClick()} title="Detail" data-aos="fade-right" className=' p-3 font-semibold  mx-1 text-2xl cursor-pointer transition-all duration-300  bg-white   h-auto w-auto  hover:text-white hover:bg-black' />
          </div>
        </div>
      )
      }
      <div data-aos="fade-right" className={`w-full bg-white h-1/4 flex items-start justify-center flex-col ${hover ? "hidden" : "flex"}`}>
        <h1 className='font-semibold text-xl p-1 ml-4'>{item.product_name}</h1>
        <h1 className='font-semibold text-xl p-1 ml-4'>RS {item.product_price}</h1>
      </div>

    </div>
  )
}
