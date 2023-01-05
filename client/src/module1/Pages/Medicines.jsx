import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi';
import Card from '../Components/Card';
import { InfinitySpin } from 'react-loader-spinner'
import Footer from '../../module/components/Footer';
import MoveTop from '../../module/components/MoveTop';

export default function Medicines({ medicineData , getCardData }) {
  const product = medicineData;
  const [loaded, setloaded] = useState(false)
  const navigate = useNavigate();
  useEffect(() => {
  
    if (product.length > 2) {
      setloaded(true);
    }
    else {
      setloaded(false)
    }
  }, [product])
  return (
    <div>
      <div className={`${loaded === true ? "hidden" : "flex"} items-center justify-center w-full h-screen bg-black flex-col`}>
        <InfinitySpin width='200' color="orange" />
        <h1 className='text-orange-600 text-xl'> Loading Resources ....</h1>
      </div>
      <div className={`${loaded === true ? "flex" : "hidden"}  w-full  bg-white text-black flex-col `}>
        <div className='w-full h-1/5 flex items-center justify-start'>
          <BiArrowBack className='text-4xl font-bold text-black' onClick={() => navigate('/shop')} />
        </div>
        <div className='h-4/5 w-full flex items-start justify-center flex-wrap'>
          <h1 className='text-4xl text-black font-semibold p-2 m-4'>Supplements</h1>
          <div className=' w-full  flex p-2 flex-wrap items-center justify-center'>
            {
              product.map((item, i) => {
                return ((<Card product={item} key={i} getCardData={getCardData}/>))
              })
            }
          </div>
        </div>
        <MoveTop />
        <Footer />
      </div>
    </div>
  )
}
