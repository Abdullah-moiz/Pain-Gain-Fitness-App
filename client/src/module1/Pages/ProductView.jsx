import React from 'react'
import Footer from '../../module/components/Footer'
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { Authentication } from '../../utils/firebase'
import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios'
import { AiOutlineShoppingCart } from 'react-icons/ai';

const ProductView = ({ productData }) => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(undefined)
  const [verifiedEmail, setverifiedEmail] = useState(false)

  useEffect(() => {
    onAuthStateChanged(Authentication, (curUser) => {
      !curUser ? navigate('/') : setUserEmail(curUser.email);
      let checkVerification = curUser.emailVerified
      setverifiedEmail(checkVerification)
    })
  }, [navigate])

  const AddToCart = async () => {

    if (verifiedEmail === true) {
      const { _id, product_name, product_price, product_img, product_weight, product_desc, product_quantity } = productData;
      let product_id = _id;
      let FinalData = { userEmail, product_id, product_name, product_price, product_img, product_weight, product_desc, product_quantity }
      console.log(FinalData)
      try {
        await axios.post('http://localhost:8000/AddtoCart', FinalData).then(res => res.data.msg === "Item Already in Cart" ?
          swal("Oopss!", `${res.data.msg}`, "error") : swal("Done!", `${res.data.msg}`, "success")
        )
      } catch (error) {
        console.log(`Error in adding Item to Cart  + ${error.message}`);
      }
    }
    else {
      swal("Done!", `Please Verify Your Account First`, "error")
    }
  }

  return (
    <div className='w-full h-screen'>
      <div className='w-full h-16 flex items-center justify-start'>
        <BiArrowBack className='text-4xl font-bold text-black' onClick={() => navigate('/shop')} />
      </div>
      <div className='w-full  flex p-10 items-center justify-center'>
        <div className='w-10/12  flex h-4/5  p-4 shadow-2xl border-2'>

          <div className='w-2/4 h-full' >
            <img src={productData.product_img} alt="no img found" className='w-full h-full' />
          </div>
          <div className='w-full  flex flex-col items-start justify-start p-4' >
            <div className=' w-full flex items-center justify-between border-b-2'>
              <h1 className='text-3xl font-semibold p-2 m-2'>{productData.product_name}</h1>
              <h6 className=' font-bold p-1 rounded m-2 bg-orange-600 text-white'>Trending</h6>
            </div>
            <div className='w-full text-start h-2/3 p-2'>
              <p className='text-lg'>{productData.product_desc} Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, doloremque facere in illum est, ipsa tenetur fugit perspiciatis voluptas unde ipsum necessitatibus et. Porro, magnam voluptatibus maiores minima veritatis vel, reiciendis temporibus, consectetur enim commodi repudiandae a debitis eos eligendi neque cumque nulla saepe voluptatem in laboriosam tempore quas ea. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt sunt dolorem quaerat, laborum veniam obcaecati. Accusantium delectus necessitatibus asperiores id expedita quis possimus voluptatum eos, facilis, eligendi, nam incidunt minima!</p>
            </div>
            <div className='flex w-full items-center justify-start p-1'>
              <button onClick={AddToCart} className='uppercase w-40 h-12 flex items-center justify-center border-orange-500 border-2  text-white font-semibold m-4 transition-all duration-300 bg-orange-500 hover:text-black hover:bg-transparent hover:border-orange-600'>Add to Cart <AiOutlineShoppingCart className="text-2xl mx-2"/></button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ProductView;


