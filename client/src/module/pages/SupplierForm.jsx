import React from 'react'
import FileBase from 'react-file-base64'
import axios from 'axios'
import { useState } from 'react'
import swal from 'sweetalert'

export default function SupplierForm() {

  const [data, setData] = useState({ name: "", email: "", img: "", address: "", city: "", country: "", state: "", zipcode: "", })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/saveSupplierApplication' , data).then(res => swal("Done!" , `${res.data.msg}`, "success"))
    } catch (error) {
      console.log(error.message + "error from posting data")
    }
  }

  const preventMinus = (e) => {
    if (e.code === 'Minus') {
      e.preventDefault();
    }
  };
  return (
    <>
      <div className='bg-white  w-full h-auto p-2 flex flex-col items-center justify-center'>
      <form onSubmit={handleSubmit} method="post" className='flex flex-col text-black w-full items-center justify-center h-4/5'>
        <h1 className='font-semibold text-3xl'>Enter Personal Details</h1>
        <div className='w-96 flex items-start flex-col justify-center p-2 m-2'>
          <label htmlFor="" className='text-gray-700 font-semibold text-lg'> Full Name</label>
          <input onChange={(e) => setData({ ...data, name: e.target.value })} required type="text" placeholder='Name..' className='p-2  w-full text-lg bg-transparent rounded bg-gray-200 outline-none' />
        </div>
        <div className='w-96   flex items-start flex-col justify-center p-2 m-2'>
          <label htmlFor="" className='text-gray-700 font-semibold text-lg'>Email</label>
          <input required type="email" placeholder='email@domain.com' onChange={(e) => setData({ ...data, email: e.target.value })} className='p-2  w-full text-lg bg-transparent  bg-gray-200 outline-none' />
        </div>
        <div className='w-96 flex items-start flex-col justify-center p-2 m-2'>
          <label htmlFor="" className='text-gray-700 font-semibold text-lg'> Address </label>
          <input onChange={(e) => setData({ ...data, address: e.target.value })} required type="text" placeholder='Enter Address' className='p-2  w-full text-lg bg-transparent rounded bg-gray-200 outline-none' />
        </div>
        <div className='w-96 flex items-start flex-col justify-center p-2 m-2'>
          <label htmlFor="" className='text-gray-700 font-semibold text-lg'> City</label>
          <input onChange={(e) => setData({ ...data, city: e.target.value })} required type="text" placeholder='Enter City' className='p-2  w-full text-lg bg-transparent rounded bg-gray-200 outline-none' />
        </div>
        <div className='w-96 flex items-start flex-col justify-center p-2 m-2'>
          <label htmlFor="" className='text-gray-700 font-semibold text-lg'> State / Province</label>
          <input onChange={(e) => setData({ ...data, state: e.target.value })} required type="text" placeholder='Enter State/Province ' className='p-2  w-full text-lg bg-transparent rounded bg-gray-200 outline-none' />
        </div>
        <div className='w-96   flex items-start flex-col justify-center p-2 m-2'>
          <label htmlFor="" className='text-gray-700 font-semibold text-lg'> Country</label>
          <input onChange={(e) => setData({ ...data, country: e.target.value })} required type="text" placeholder='Enter Country ' className='p-2  w-full text-lg bg-transparent  bg-gray-200 rounded outline-none' />
        </div>
        <div className='w-96   flex items-start flex-col justify-center p-2 m-2'>
          <label htmlFor="" className='text-gray-700 font-semibold text-lg'>Zip Code</label>
          <input required onKeyDown={preventMinus} type="number"  placeholder='Enter Zip Code' onChange={(e) => setData({ ...data, zipcode: e.target.value })} className='p-2  w-full text-lg bg-transparent rounded bg-gray-200 outline-none' />
        </div>
        <div className='w-96   flex items-start flex-col justify-center p-2 m-2'>
          <label htmlFor="" className='text-gray-700 font-semibold text-lg'>Profile Image</label>
        <FileBase required onDone={({ base64 }) => setData({ ...data, img: base64 })} type="file" placeholder='product Name' className='text-black w-80 h-10 border-2 flex items-center justify-center border-black rounded m-4 p-2' />
        </div>

        <div className='w-96  flex items-center flex-col justify-center p-2 m-2'>
          <button type='submit' className={` rounded flex items-center cursor-pointer justify-center w-40 h-12 border-2 outline-none text-xl font-semibold border-orange-600 bg-orange-600 text-white hover:bg-transparent hover:text-black transition-all duration-500`}>Submit</button>
        </div>
      </form>
    </div>
    </>
  )
}
