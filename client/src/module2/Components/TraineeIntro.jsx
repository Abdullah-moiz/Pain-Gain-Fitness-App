import React, { useEffect } from 'react'
import video from '../../assets/video.mp4'
import { IoArrowForwardOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom'



export default function TraineeIntro({verified}) {
    const navigate = useNavigate();
    return (
        <div className='w-full h-screen flex items-center justify-center relative'>
            <video src={video} autoPlay loop muted className='w-full h-full object-fill  absolute top-0 left-0 video' />
            <div className='w-full absolute z-10 flex items-center justify-center flex-col h-full bg-black/50'>
                <h1 className='text-white text-6xl font-semibold p-1 m-2 tracking-wide'>Hire Personal </h1>
                <h1 className='text-white text-6xl font-semibold p-1 m-2 tracking-wide'>Trainers</h1>
                <button onClick={() => navigate('/trainers-profiles')} className={`rounded ${verified ? "flex" : "hidden"} bg-white  items-center justify-center  p-3  m-4 outline-none w-52 font-semibold transition-all duration-300 text-black hover:text-white border-2 hover:bg-transparent tracking-widest`}>Trainers Profiles<IoArrowForwardOutline /></button>
            </div>
        </div>
    )
}