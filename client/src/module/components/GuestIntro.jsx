import React from 'react'
import img from '../../assets/landing page new.jpg'

export default function GuestIntro() {
  return (
    <div className='w-full h-screen relative'>
      <img src={img} alt="no img" className='w-full h-full'/>
      <button className="absolute bottom-48 hover:bg-transparent left-40 p-3 m-3 border-2 border-orange-600 text-xl rounded-md bg-orange-600 text-white font-semibold transition-all duration-200">Get Started</button>
    </div>
  )
}
