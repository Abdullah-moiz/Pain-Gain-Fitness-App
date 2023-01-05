import React from 'react'
import img from '../../assets/landing page girl.jpg'

export default function About() {
  return (
    <div className='w-full h-screen flex'>
        <div className='w-1/2 h-full'>
            <img src={img} alt="no img" />
        </div>
        <div className='w-1/2 h-full flex items-center justify-center'  >
            <div className='flex items-start justify-start flex-col w-full h-1/2 p-2'>
            <h2 className='font-bold text-2xl text-orange-600 bg-orange-200 p-2 m-2 rounded'>About Us</h2>
            <h1 className='font-extrabold text-5xl   p-2 m-2 rounded'>Welcome To Our</h1> 
            <h1 className='font-extrabold text-5xl  p-2 m-2 rounded'>Fitness Gym</h1>
            <p className='p-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis aliquid, minima esse minus illo ex cum consequuntur dicta! Veritatis deleniti iusto, beatae quidem sed vero aperiam laboriosam eveniet sequi quae magnam doloribus nam distinctio quis mollitia rerum labore delectus vitae maxime doloremque consequatur debitis. Autem tempore recusandae ea sequi debitis....</p>
            <button className='p-3 m-3 border-2 border-orange-600 rounded-md hover:bg-orange-600 hover:text-white font-semibold transition-all duration-200'>Explore More</button>
            </div>
        </div>
    </div>
  )
}
