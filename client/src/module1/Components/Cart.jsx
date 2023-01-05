import React, { useEffect, useState } from 'react'
import './index.css'
import Footer from '../../module/components/Footer'
import { useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi';
import { BsCartPlus } from 'react-icons/bs';
import { Scrollbars } from 'react-custom-scrollbars-2';
import CartCard from './CartCard';
import { onAuthStateChanged } from 'firebase/auth';
import { Authentication } from '../../utils/firebase';
import axios from 'axios';


export default function Cart() {
  const navigate = useNavigate();

  // ^ setting user email from authentiation
  const [userEmail, setUserEmail] = useState(undefined)
  // ^ setting item id from item

  // ^ setting item into Cart array
  const [cart, setCart] = useState([])


  useEffect(() => {
    onAuthStateChanged(Authentication, (curUser) => {
      !curUser ? navigate('/') : setUserEmail(curUser.email);
    })
  }, [navigate, userEmail, setUserEmail])


  // ^ fetching Cart Data
  useEffect(() => {
    (async () => {
      try {
        await axios.get(`http://localhost:8000/getUserCartItem`, {
          params: { email: userEmail }
        }).then(res => setCart(res.data))
      } catch (error) {
        console.log(error.message);
      }
    })()
  }, [userEmail, setCart , cart])

 

  // calculating cart price

  let collectCartPrices = cart.map((item) => {
    let getEachItemPrice = item.product_quantity * item.product_price;
    return getEachItemPrice;
  })

  const TotalPrice = collectCartPrices.reduce((partialSum, a) => partialSum + a, 0);


  return (
    <div className='w-full h-auto bg-white'>
      <div className='w-full h-10 '>
        <BiArrowBack onClick={() => navigate('/shop')} className='text-xl w-20 h-10  text-black flex items-center justify-center cursor-pointer' />
      </div>
      <div className='w-full  flex flex-col items-start justify-start p-4 '>
        <h1 className='font-semibold  text-2xl m-4 text-black' >Your Shopping Cart</h1>
        <div className={`${cart.length === 0 ? "flex" : "hidden"} w-full flex-col h-96 bg-white p-2 items-center justify-center `}>
          <BsCartPlus className='text-6xl text-black p-2 m-2 cursor-pointer' onClick={() => navigate('/')} />
          <h1 className="text-4xl font-semibold">EMPTY CART !</h1>

        </div>
        <div className={`${cart.length === 0 ? "hidden" : "flex"} w-full h-96 bg-white p-2  `}>
          <Scrollbars>
            {
              cart.map((item, i) => {
                return <CartCard item={item} key={i} userEmail={userEmail} />
              })
            }
          </Scrollbars>
        </div>
      </div>
      <div className='w-full h-auto bg-white flex items-end justify-center p-4 flex-col '>
        <div className='w-96 p-2 '>
          <p className='uppercase text-black text-lg'>Cart Totals</p>
        </div>
        <div className='w-96 h-full border-t-2 border-gray-500 flex items-center justify-around'>
          <p className='text-black text-lg p-2'>Total</p>
          <p className='text-black text-lg p-2'>${TotalPrice}</p>
        </div>
        <div>
          

            <button onClick={() => navigate('/order')} className={`uppercase w-40 h-12 ${cart.length <= 0 ? "hidden" : "flex"} border-orange-500 border-2 items-center justify-center  text-white font-semibold m-4 transition-all duration-300 bg-orange-500 hover:text-black hover:bg-transparent hover:border-orange-600`}>Check out</button>
          
          
        </div>
      </div>
      <Footer />
    </div>
  )
}
