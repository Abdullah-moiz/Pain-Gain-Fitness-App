import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi';
import axios from 'axios';
import { useParams } from 'react-router-dom'

export default function AdminOrderTrackingDetail() {
    const { id } = useParams();
    const [data, setData] = useState([]);

    const navigate = useNavigate();




    useEffect(() => {
        (async () => {
            try {
                await axios.get(`http://localhost:8000/userorderData/:id`, {
                    params: { id: id }
                }).then(res => setData(res.data))
            } catch (error) {
                console.log(error.message);
            }
        })()
    }, [])





    return (

        <div className='w-full h-full flex flex-col items-center justify-start p-4'>
            <div className='w-full h-10 '>
                <BiArrowBack onClick={() => navigate(-1)} className='text-xl w-20 h-10  text-black flex items-center justify-center cursor-pointer' />
            </div>
            <h1 className='p-2 m-2 text-2xl font-semibold'>Order Details</h1>


            {
                data.map((item, i) => {
                    return (
                        <div className='w-full h-full flex flex-wrap '>
                            <form className='flex flex-wrap  w-1/2 h-full items-center justify-center  rounded  p-4'>
                                <div className='w-4/5 p-2 m-1  h-24 flex flex-col items-start justify-start '>
                                    <label htmlFor="">Name</label>
                                    <input readOnly autoComplete='off' value={item.username} type="text" placeholder='Enter Name' name='name' className='w-full p-2  outline-none border-2  border-gray-400 rounded' />
                                </div>
                                <div className='w-4/5 p-2 m-1  h-24 flex flex-col items-start justify-start '>
                                    <label htmlFor="">Email</label>
                                    <input readOnly autoComplete='off' value={item.userEmail} type="text" placeholder='Enter Name' name='email' className='w-full p-2  outline-none border-2 border-gray-400 rounded' />
                                </div>
                                <div className='w-4/5 p-2 m-1  h-24 flex flex-col items-start justify-start '>
                                    <label htmlFor="">Address 1 </label>
                                    <input autoComplete='off' type="text" value={item.address1} placeholder='Enter Name' name='address1' className='w-full p-2  outline-none border-2 border-gray-400 rounded' />
                                </div>
                                <div className='w-4/5 p-2 m-1  h-24 flex flex-col items-start justify-start '>
                                    <label htmlFor="">Address 2</label>
                                    <input type="text" placeholder='Enter Name' value={item.address2} name='address2' className='w-full p-2  outline-none border-2 border-gray-400 rounded' />
                                </div>
                                <div className='w-4/5 p-2 m-1 h-24 flex flex-col items-start justify-start '>
                                    <label htmlFor="">State</label>
                                    <input placeholder='Enter Name' name='state' value={item.state} className='w-full p-2  outline-none border-2 border-gray-400 rounded' />
                                </div>
                                <div className='w-4/5 p-2 m-1  h-24 flex flex-col items-start justify-start '>
                                    <label htmlFor="">Country</label>
                                    <input autoComplete='off' type="text" value={item.country} placeholder='Enter Name' name='country' className='w-full p-2  outline-none border-2 border-gray-400 rounded' />
                                </div>
                                <div className='w-4/5 p-2 m-1  h-24 flex flex-col items-start justify-start '>
                                    <label htmlFor="">Zip Code</label>
                                    <input autoComplete='off' type="number" value={item.zipcode} placeholder='Enter Name' name='zipcode' className='w-full p-2  outline-none border-2 border-gray-400 rounded' />
                                </div>

                            </form>
                            <div className='w-1/2 h-full '>
                                <div class="flex flex-col">
                                    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                            <div class="overflow-hidden">
                                                <table class="min-w-full">
                                                    <thead class="border-b">
                                                        <tr>
                                                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                Item Name
                                                            </th>
                                                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                Item Price
                                                            </th>
                                                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                Item Quantity
                                                            </th>
                                                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                                Image
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            item.cart?.map((cartitem) => {
                                                                return (
                                                                    <tr class="border-b">
                                                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{(cartitem.product_name)}</td>
                                                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                            {cartitem.product_quantity}
                                                                        </td>
                                                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                            {cartitem.product_price}
                                                                        </td>
                                                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                            <img src={cartitem.product_img} alt="no img" className='w-20 h-20' />
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })

                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }












        </div>
    )
}
