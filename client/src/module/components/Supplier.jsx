import React from 'react'
import img from '../../assets/supplier2.jpg'
import { useNavigate } from 'react-router-dom'

export default function Supplier() {
  const navigate = useNavigate();
  return (
    <div className='w-full h-screen flex items-center relative justify-center'>
      <img src={img} alt="" className='w-full h-full' />
      <div className='absolute  left-10 top-32'>
      <h2 className='  p-2 uppercase bg-orange-200 text-orange-600 text-2xl font-semibold tracking-widest rounded-2xl '>hiring Supplier</h2>
      </div>
      <div className='absolute  left-10 top-60  p-2 flex items-center flex-col justify-center'>
        <blockquote className='uppercase rounded-xl my-2 p-2 font-bold text-4xl italic'> " Alone we can </blockquote>
        <blockquote className='uppercase rounded-xl my-2 p-2 font-bold text-4xl italic'>do so little together ,</blockquote>
        <blockquote className='uppercase   rounded-xl my-2 p-2     font-bold text-4xl'>   we can do so much " </blockquote>
        <button onClick={() => navigate('/supplierForm')} className='border-2 my-2  mx-10 border-orange-600   p-2 rounded text-xl font-semibold transition-all duration-300 hover:bg-orange-600 hover:text-white'>APPLY NOW</button>
      </div>
    </div>
  )
}
