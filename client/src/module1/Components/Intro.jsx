import React from 'react'
import video from '../../assets/video.mp4'
import { HashLink as Link } from 'react-router-hash-link';


export default function Intro() {
  return (
    <div className='w-full h-screen flex items-center justify-center relative'>
      <video  src={video} autoPlay loop muted className='w-full h-full object-fill  absolute top-0 left-0 video'/>
      <div className='w-full absolute z-10 flex items-center justify-center flex-col h-full bg-black/50'>
            <h1 className='text-white text-6xl font-semibold p-1 m-2 tracking-wide'>THE OFFICIAL</h1>
            <h1 className='text-white text-6xl font- semibold p-1 m-2 tracking-wide'>P&G SHOP</h1>
            <p className='text-white text-xl p-1 m-2 tracking-wide'>MEDICINE | EQUIPMENTS | ASSESSORIES</p>
            <Link smooth to='#Topproducts'  className='rounded  bg-white flex items-center justify-center  p-3  m-4 outline-none w-36 font-semibold transition-all duration-300 text-black hover:text-white border-2 hover:bg-transparent tracking-widest'>SHOP NOW</Link>
      </div>
    </div>
  )
}
