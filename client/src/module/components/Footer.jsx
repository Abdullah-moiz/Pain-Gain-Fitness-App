import React from 'react'
import {  FaTiktok, FaFacebookF } from 'react-icons/fa';
import { AiOutlineTwitter, AiOutlineInstagram } from 'react-icons/ai';

export default function Footer() {
  return (
    <div className="w-full  bg-black text-gray-400 flex p-2 items-center justify-center flex-col font-['Open-Sans']" >
      <div className='lg:flex hidden w-full  h-80 items-center justify-around max-[800px]:hidden'>
        <div className='p-2 m-4 w-60 flex items-start justify-center flex-col h-60 '>
          <h1 className='text-lg border-b-2 font-semibold text-white'>Helps & Information</h1>
          <p className='p-1 transition-all duration-300 hover:scale-110 hover:text-orange-600 cursor-pointer'>Privacy Policy</p>
          <p className='p-1 transition-all cursor-pointer duration-300 hover:scale-110 hover:text-orange-600 '>Careers</p>
          <p className='p-1 transition-all cursor-pointer duration-300 hover:scale-110 hover:text-orange-600 '>Terms of use</p>
          <p className='p-1 transition-all cursor-pointer duration-300 hover:scale-110 hover:text-orange-600 '>Newsletter</p>
          <p className='p-1  transition-all cursor-pointer duration-300 hover:scale-110 hover:text-orange-600'>Why Buy Direct</p>
        </div>
        <div className='p-2 w-60 m-4 flex items-start justify-center flex-col h-60 '>
          <h1 className='text-lg border-b-2 cursor-pointer font-semibold text-white'>About us</h1>
          <p className='p-1  transition-all cursor-pointer duration-300 hover:scale-110 hover:text-orange-600'>Help Center</p>
          <p className='p-1  transition-all cursor-pointer duration-300 hover:scale-110 hover:text-orange-600'>Store Location</p>
          <p className='p-1  transition-all cursor-pointer duration-300 hover:scale-110 hover:text-orange-600'>Deliver around every city</p>
          <p className='p-1 transition-all cursor-pointer duration-300 hover:scale-110 hover:text-orange-600'>Register</p>
          <p className='p-1 transition-all cursor-pointer duration-300 hover:scale-110 hover:text-orange-600'>Why Buy Direct</p>
        </div>
        <div className='p-2 w-60 m-4  flex items-start justify-center flex-col h-60 '>
          <h1 className='text-lg border-b-2 font-semibold text-white'>Categories</h1>
          <p className='p-1 transition-all duration-300 hover:scale-110 cursor-pointer hover:text-orange-600'>Accessories</p>
          <p className='p-1 transition-all duration-300 hover:scale-110 cursor-pointer hover:text-orange-600'>Medicines</p>
          <p className='p-1 transition-all duration-300 hover:scale-110 cursor-pointer hover:text-orange-600'>Equipments</p>
          <p className='p-1 transition-all duration-300 hover:scale-110 cursor-pointer hover:text-orange-600'>FAQs</p>
          <p className='p-1 transition-all duration-300 hover:scale-110 cursor-pointer hover:text-orange-600'>Delivery & Return</p>
        </div>
        <div className='p-2 h-60 w-80  items-start justify-center flex flex-col'>
          <div className='p-1 m-1'>
            <h1>LOGO</h1>
          </div>
          <div className='p-1 m-1'>
            <p>Be the first to try our new products</p>
          </div>
          <div className='w-full h-36 flex items-start justify-center flex-col'>
            <h1 className='text-lg border-b-2 font-semibold text-white'>Follow us</h1>
            <div className='flex items-center justify-center p-2'>
              <FaFacebookF className='text-blue-800 text-3xl   m-2  hover:text-orange-600 transition-all duration-300 cursor-pointer hover:scale-150' />
              <AiOutlineTwitter className='text-blue-400  text-3xl  m-2  hover:text-orange-600 transition-all duration-300 cursor-pointer hover:scale-150' />
              <AiOutlineInstagram className='text-red-700 text-3xl  m-2  hover:text-orange-600 transition-all duration-300 cursor-pointer hover:scale-150' />
              <FaTiktok className='text-white text-3xl  m-2  hover:text-orange-600 transition-all duration-300 cursor-pointer hover:scale-150' />
            </div>
          </div>
        </div>
      </div>
      <div className='lg:border-t-2 border-gray-400 w-full h-20 flex items-center justify-center lg:justify-end '>
          <p>Website by <span className='text-lg font-bold text-white'> Abdullah Moiz </span>Copyright ©  All right Reserved</p>
      </div>
    </div>
  )
}
