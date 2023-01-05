import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Card from '../Components/Card';
import { InfinitySpin } from 'react-loader-spinner'
import Footer from '../../module/components/Footer';
import MoveTop from '../../module/components/MoveTop';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom'
import { ImSad } from 'react-icons/im';

export default function Search({ machineData, accessoriesData, medicineData }) {
    const [loaded, setloaded] = useState(false)
    const navigate = useNavigate();
    let [query, setquery] = useState("");
    let TotalItem = [...machineData, ...accessoriesData, ...medicineData];

    
    useEffect(() => 
    {
      if ( TotalItem.length > 2  ) {
        setloaded(true);
      }
      else {
        setloaded(false)
      }
    },[setloaded , TotalItem.length])

    let searchedItem = TotalItem.filter((item) => item.product_name.toLowerCase().includes(query.toLocaleLowerCase()));

    return (
        <div className='w-full h-full'>
            <div className={`${loaded === true ? "hidden" : "flex"} items-center justify-center w-full h-screen bg-black flex-col`}>
                <InfinitySpin width='200' color="orange" />
                <h1 className='text-orange-600 text-xl'> Loading Resources ....</h1>
            </div>
            <div className={`w-full h-full flex-col items-center justify-center ${loaded === true ? "flex" : "hidden"}`}>
            <div className={`w-full h-28 bg-black text-white flex items-center justify-center`}>
                <div className='w-1/5 h-full flex items-center justify-start'>
                <BiArrowBack className='text-4xl font-bold text-white' onClick={() => navigate('/shop')} />
                </div>
                <div className='w-4/5 flex items-center justify-start ml-80  h-full'>
                    <input value={query} onChange={(e) => setquery(e.target.value)} type="search" className='w-96 border-2  bg-transparent outline-none p-2' placeholder='Search ....' />
                </div>
            </div>
            <div className={`${searchedItem.length <= 0 ? "flex" : "hidden"}  w-full h-96 flex flex-col items-center justify-center `}>
                <h1 className='text-black text-2xl font-extrabold m-2'>Search Doesn't match with any available Product </h1>
                <ImSad className='text-black text-4xl  m-2'/>
            </div>
            <div className={`${searchedItem.length > 0 ? "flex" : "hidden"} w-full   flex flex-wrap items-center justify-center   bg-white p-2`}>
                {
                    searchedItem.map((item, i) => {
                        return (<Card product={item} key={i} />)
                    })
                }
            </div>
            <MoveTop/>
            <Footer/>
            </div>
        </div>
    )
}
