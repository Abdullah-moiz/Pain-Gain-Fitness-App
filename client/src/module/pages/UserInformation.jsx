import { onAuthStateChanged } from 'firebase/auth'
import React from 'react'
import { Authentication } from '../../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import swal from 'sweetalert'



export default function UserInformation() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState(undefined)
  useEffect(() => {
    onAuthStateChanged(Authentication, (curUser) => {
      if (!curUser) navigate('/login')
      let usermale = curUser.email
      setUserEmail(usermale);
    })
  }, [])

  const [gymData, setGymData] = useState({ name: "", dob: "", weight: 0, height: 0, Gender: "Male", weekplan: "3", wantToBe: "beginner" })
  let { weekplan, wantToBe, Gender, name, dob, weight, height } = gymData;

  // ^ form logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    let FinalData = { wantToBe, weekplan, Gender, name, dob, weight, height, userEmail }
    if (+weight > 0 && +height > 0) {
      try {
        axios.post('http://localhost:8000/RegisterUser', FinalData)
          .then(res => swal("Done!", res.data.msg, "success"))
      } catch (error) {
        console.log(error.message + 'getting error in user information posting ');
      }
    }
    else {
      return swal("Ooops!", "Incorrect Height Or Weight", "error")
    }
  }

  const preventMinus = (e) => {
    if (e.code === 'Minus') {
      e.preventDefault();
    }
  };

  return (
    <div className='bg-white  w-full h-auto p-2 flex flex-col items-center justify-center'>
      <div className='w-full  flex flex-col items-center justify-start'>
        <div className='w-full p-2 mb-2 h-1/5 relative top-0 left-0 flex items-center justify-between'>
          <BiArrowBack className='text-4xl cursor-pointer font-bold text-black' onClick={() => navigate('/')} />
        </div>
        <form onSubmit={handleSubmit} method="post" className='flex flex-col text-black w-full items-center justify-center h-4/5'>
          <h1 className='font-semibold text-3xl'>ADD</h1>
          <div className='w-96 flex items-start flex-col justify-center p-2 m-2'>
            <label htmlFor="" className='text-gray-700 font-semibold text-lg'> Full Name</label>
            <input onChange={(e) => setGymData({ ...gymData, name: e.target.value })} required type="text" placeholder='Name..' className='p-2  w-full text-lg bg-transparent rounded bg-gray-200 outline-none' />
          </div>
          <div className='w-96   flex items-start flex-col justify-center p-2 m-2'>
            <label htmlFor="" className='text-gray-700 font-semibold text-lg'>Email</label>
            <input readOnly required type="text" placeholder='Height in cm' defaultValue={userEmail} className='p-2  w-full text-lg bg-transparent  bg-gray-200 outline-none' />
          </div>
          <div className='w-96   flex items-start flex-col justify-center p-2 m-2'>
            <label htmlFor="" className='text-gray-700 font-semibold text-lg'> DOB</label>
            <input onChange={(e) => setGymData({ ...gymData, dob: e.target.value })} required type="Date" placeholder='DOB..' className='p-2  w-full text-lg bg-transparent  bg-gray-200 rounded outline-none' />
          </div>
          <div className='w-96 flex items-start flex-col justify-center p-2 m-2'>
            <label htmlFor="" className='text-gray-700 font-semibold text-lg'> Weight</label>
            <input min="0" onKeyDown={preventMinus} onChange={(e) => setGymData({ ...gymData, weight: e.target.value })} required type="number" placeholder='Weight in KG' className='p-2  w-full text-lg bg-transparent rounded bg-gray-200 outline-none' />
          </div>
          <div className='w-96   flex items-start flex-col justify-center p-2 m-2'>
            <label htmlFor="" className='text-gray-700 font-semibold text-lg'>Height</label>
            <input required min="0" onKeyDown={preventMinus} type="number" placeholder='Height in cm' onChange={(e) => setGymData({ ...gymData, height: e.target.value })} className='p-2  w-full text-lg bg-transparent rounded bg-gray-200 outline-none' />
          </div>

          <div className='w-96   flex items-start flex-col justify-center p-2 m-2'>
            <label htmlFor="" className='text-gray-700 font-semibold text-lg'>Gender</label>
            <select required className='w-full' name="" id="" value={Gender} onChange={(e) => setGymData({ ...gymData, Gender: e.target.value })}>
              <option value="Male" >Male</option>
              <option value="female">Female</option>
              <option value="other" >other</option>
            </select>
          </div>
          <div className='w-96   flex items-start flex-col justify-center p-2 m-2'>
            <label htmlFor="" className='text-gray-700 font-semibold text-lg'>Week Plan</label>
            <select className='w-full' required name="" id="" value={weekplan} onChange={(e) => setGymData({ ...gymData, weekplan: e.target.value })}>
              <option value="3" >3 Days</option>
              <option value="5">5 Days</option>
              <option value="7" >7 Days</option>
            </select>
          </div>
          <div className='w-96   flex items-start flex-col justify-center p-2 m-2'>
            <label htmlFor="" className='text-gray-700 font-semibold text-lg'>How much Push Up You Can Do ? </label>
            <select className='w-full' required name="" id="" value={wantToBe} onChange={(e) => setGymData({ ...gymData, wantToBe: e.target.value })}>
              <option value="begineer" >At Least 5</option>
              <option value="intermediate">5 to 10 </option>
              <option value="advance" >At Least 10</option>
            </select>
          </div>
          <div className='w-96  flex items-center flex-col justify-center p-2 m-2'>
            <button type='submit' className={` rounded flex items-center cursor-pointer justify-center w-40 h-12 border-2 outline-none text-xl font-semibold border-orange-600 bg-orange-600 text-white hover:bg-transparent hover:text-black transition-all duration-500`}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}
