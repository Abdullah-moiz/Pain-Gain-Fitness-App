import React from 'react'
import { MdCancel } from 'react-icons/md'
import { useState } from 'react'
import './index.css'
import axios from 'axios'
import { useEffect } from 'react'
import swal from 'sweetalert';



export default function CartCard({ item, userEmail }) {
  // ^ getting prices of item available in cart
  let productPrice = parseInt(item.product_price);
  let product = item;
  const [itemsNo, setItemsNo] = useState(product.product_quantity)
  const [prodPrice, setProdPrice] = useState(productPrice);
 


  // ^ to increase product amount + adding the product price 
  const increaseItemNo = () => {
    if (itemsNo > 0) {
      setItemsNo(prevState => prevState + 1)
      setProdPrice(prevPrice => prevPrice + productPrice)

    }
    else {
      setItemsNo(1)
    }

  }
  // ^ to increase product amount + adding the product price 
  const decreaseItemNo = () => {
    if (itemsNo > 1) {
      setItemsNo(prevState => prevState - 1);
      setProdPrice(prevPrice => prevPrice - productPrice)
    }
    else {
      setItemsNo(1)
    }
  }


  // ^ remove item from cart
  const removeCartItem = async () => {
    let itemId =  product.product_id;
    let finalData = {itemId , userEmail}
    try {
      await axios.delete('http://localhost:8000/RemoveITemFromCart' , {params : {data :finalData}}).then(res => swal("Done!", `${res.data.msg}`, "success"))
    } catch (error) {
      console.log(error.message + "error in removing cart item")
    }
  }

  const updateProductQuantity =  async () => 
  {
    let itemId =  product.product_id;
    let finalData = {itemId , userEmail , product_quantity : itemsNo}
    try {
      await axios.put('http://localhost:8000/updateCart' ,finalData)
    } catch (error) {
      console.log(error.message + "error in updating cart item")
    }
  } 

  useEffect(() => 
  {
    updateProductQuantity();
  },[itemsNo])




  return (
    <div className={`w-full h-auto flex flex-col text-black  `}>
      <div className={`w-full flex h-32 border-b-2 border-gray-400 my-2  p-2 justify-around items-center `}>
        <div className='w-32 h-full '>
          <img src={product.product_img} className="w-full h-full p-img" alt="no img" />
        </div>
        <div className='w-32 h-full flex items-center justify-center '>
          <p className=' text-lg'>{product.product_name}</p>
        </div>
        <div className='w-32 h-full flex items-center justify-center '>
          <p className=' text-lg text-gray-700'>$ {product.product_price}</p>
        </div>
        <div className='w-32 h-14 flex items-center justify-center  border-2 rounded-2xl border-gray-700'>
          <button className=' text-2xl mr-2 ' onClick={increaseItemNo}>+</button>
          <p className=' text-xl m-2'>{itemsNo}</p>
          <button className=' text-2xl ml-2 flex items-center justify-center' onClick={decreaseItemNo}>-</button>
        </div>
        <div className='w-32 h-full flex items-center justify-center '>
          <MdCancel onClick={removeCartItem} className='text-xl text-gray-700 cursor-pointer' />
        </div>
      </div>
    </div>
  )
}



