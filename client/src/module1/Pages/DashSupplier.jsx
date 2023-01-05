import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate  } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi';

import axios from 'axios';

export default function DashSupplier() {

    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let x  = localStorage.getItem('login')
        if(!x)
        {
            navigate('/')
        }
    },[])
   

    useEffect(() => {
        (async () => {
            try {
                await axios.get(`http://localhost:8000/getAllOrdersData`).then(res => setData(res.data))
            } catch (error) {
                console.log(error.message);
            }
        })()
    }, [data, setData])

    return (
        <div className="w-full h-full p-4">
            <div className='w-full h-10 mb-4'>
                <BiArrowBack onClick={() => navigate(-1)} className='text-xl w-20 h-10  text-black flex items-center justify-center cursor-pointer' />
            </div>
            <h2 className='text-4xl font-semibold ml-4'>Order History</h2>
            <div className="flex flex-col p-4">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead className="bg-white border-b">
                                    <tr>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Order ID
                                        </th>
                                        {/* <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Tracking ID
                                        </th> */}
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Email
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Status
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        data.map((item) => {
                                            let id = item._id;
                                            return (<tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {id}
                                                </td>
                                                {/* <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {item.tracking_id}
                                                </td> */}
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {item.userEmail}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {item.status}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    <button onClick={() => navigate(`orderDetail/${id}`)} className='border-2 border-orange-600 rounded hover:text-white hover:bg-orange-600 transition-all duration-200 p-2'>View Detail</button>
                                                </td>

                                            </tr>)

                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
