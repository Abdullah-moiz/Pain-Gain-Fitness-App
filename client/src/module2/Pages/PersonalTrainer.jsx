import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function PersonalTrainer() {
  const navigate = useNavigate();
  return (
    <div className='w-full h-screen '>
      <div className='w-full h-20 border-2 flex items-center justify-around'>
        <div>
            <h1>Pain & Gain</h1>
        </div>
        <div>
            <button onClick={() =>  navigate('/arrangeZoom')} className='w-36 h-12 hover:bg-transparent hover:border-2 hover:border-orange-600 hover:text-black transition-all  duration-300  bg-orange-600 p-2 my-2 text-white font-semibold rounded-xl text-lg outline-none'>ZOOM MEET</button>
        </div>
      </div>
    </div>
  )
}
