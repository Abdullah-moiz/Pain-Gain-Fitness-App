import React from 'react'
import img from '../../assets/check.jpeg'
import { useNavigate } from 'react-router-dom'

export default function PersonalTrainer() {
  const navigate = useNavigate();
  return (
    <div className='w-full h-full flex items-start justify-start p-4 relative'>
      <img src={img} alt="" className='' />
      <div className='absolute top-32 right-20'>
        <h2 className='  p-2 uppercase bg-orange-200 text-orange-600 text-2xl font-semibold tracking-widest rounded-2xl '> Professional Trainers</h2>
        <div className='absolute   top-52   p-2 flex items-center flex-col justify-center'>
          <h2 className='text-3xl font-semibold p-2  my-2'>We are Hiring Professional Trainers</h2>
          <button onClick={() => navigate('/supplierForm')} className='border-2 my-2  mx-10 border-orange-600   p-2 rounded text-xl font-semibold transition-all duration-300 hover:bg-orange-600 hover:text-white'>APPLY NOW</button>
        </div>
      </div>
    </div>
  )
}
