import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi';
import { useEffect } from 'react';
import axios from 'axios';

export default function TrainersProfile() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                await axios.get(`http://localhost:8000/getAllApplicationspersonal`).then(res => setData(res.data))
            } catch (error) {
                console.log(error.message);
            }
        })()
    }, [])

    console.log(data)

    return (
        <div className='w-full h-full flex items-center justify-start flex-col pb-4 '>
            <div className='w-full h-12 flex items-center justify-start'>
                <BiArrowBack className='text-4xl font-bold text-black' onClick={() => navigate(-1)} />
            </div>
            <div className='flex w-full h-full p-2 my-2 items-center justify-start flex-col'>
                <h1 className='text-4xl font-semibold text-orange-600'>HIRE PROFESSIONAL TRAINERS</h1>
                <div className='w-4/5 flex items-center justify-center flex-wrap h-full '>


                    {
                        data?.map((item) => {
                            const id = item._id;
                            return (
                                <div className="w-72 h-96  shadow-2xl flex items-center justify-center flex-col rounded p-2 m-4">
                                    <div className='w-full h-2/5   flex items-center justify-center'>
                                        <div className='w-32 h-32 flex items-center justify-center rounded-full'>
                                            <img src={item.img} alt="nothing" className='w-full h-full rounded-full' />
                                        </div>
                                    </div>
                                    <div className='w-full h-3/5 flex items-center justify-start flex-col p-2 '>
                                        <h1 className='text-lg my-1 p-2'>{item.name}</h1>
                                        <div className='flex p-2 w-full '>
                                        <span className='bg-gray-200 p-2 text-center my-1 rounded-xl '>Available Time : {item.availableStart} - {item.availableEnd} $18 Per Hour</span>
                                        </div>
                                        <button onClick={() => navigate(`/hirePayment/:${id}`)} className='w-32 rounded-xl text-white border-2 p-2  my-2 border-orange-600 hover:bg-transparent transition-all duration-300 bg-orange-600 hover:text-black text-lg font-semibold'>Hire</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
