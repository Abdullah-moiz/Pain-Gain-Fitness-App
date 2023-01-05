import React, { useState } from 'react'
import Card from './Card'
import { useNavigate } from 'react-router-dom';



export default function TopProducts({ title, items , route  }) {
  const navigate  = useNavigate();
  const product = items;
  return (
    
      <div className={`flex w-full flex-col items-center justify-start`}>

        <div className='w-full h-40  flex items-center justify-center '>
          <h1 className=' text-4xl'>{title}</h1>
        </div>
        <div className='w-full h-full p-2 flex items-center justify-center flex-wrap' id='Topproducts'>
          {
            product.map((item, i) => {
              return ((<Card product={item} key={i}  />))
            })
          }
        </div>
        <button onClick={() => navigate(`${route}`)} className='text-black  p-3  m-4 border-2 border-black w-36 font-semibold transition-all duration-300 hover:text-orange-600 hover:border-orange-600 tracking-widest'>View More</button>
      </div>
  )
}
