import React from 'react'
import { useState } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import { Authentication } from '../../utils/firebase'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { BsEyeFill } from 'react-icons/bs'
import {  useNavigate } from 'react-router-dom'
import swal from 'sweetalert';
import img from '../../assets/texture.jpg'
import './style.css'
import LandingNav from '../components/LandingNav'


export default function Login() {

  let userEmail;
  const navigate = useNavigate();
  let [loginError, setLoginerror] = useState("")
  let [loginData, setLoginData] = useState({ email: '', password: '' })
  let [ShowPass, setShowpass] = useState(false)
  const { email, password } = loginData;

  // ^ checkbox validation


  // ^ showpassword logic
  let handleShowPass = () => {
    setShowpass(!ShowPass)
  }


  // ^ register User Logic
  let handleLogin = async (e) => {

    e.preventDefault();

    if (email === "admin@admin.com" && password === "admin123456789") {
      localStorage.setItem('login',email)
      navigate('/admin')
    }
    else if (email === "supplier@supplier.com" && password === "supplier123456789") {
      localStorage.setItem('login',email)
      navigate('/supplier')
    }
    else if (email === "moiz@trainer.com" && password === "moiz123456789") {
      localStorage.setItem('login',email)
      localStorage.setItem('id' , '63adbee944737f100b84ae58')
      navigate('/trainer')
    }
    else if (email === "ali@trainer.com" && password === "ali123456789") {
      localStorage.setItem('login',email)
      localStorage.setItem('id' , '63adbec244737f100b84ae56')
      navigate('/trainer')
    }
    else if (email === "usman@trainer.com" && password === "usman123456789") {
      localStorage.setItem('login',email)
      localStorage.setItem('id' , '63adbf0544737f100b84ae5a')
      navigate('/trainer')
    }
    else {

      try {
        await signInWithEmailAndPassword(Authentication, email, password)
      } catch (error) {
        if (error.code === "auth/wrong-password") {
          setLoginerror("wrong-password")
        }
        else if (error.code === "auth/invalid-email") {
          setLoginerror("Invalid Email")
        }
        else if (error.code === "auth/user-not-found") {
          setLoginerror("User Not Found")
        } else {
          console.log(`getting error from login USer : ${error.code}`)
        }
      }
    }
  }
  userEmail = email;
  onAuthStateChanged(Authentication, (curUser) => {
    if (curUser) navigate('/home')
  })


  // ^ reset password login
  const ResetPassword = () => {
    if (userEmail === "" ) {
      swal("Done!", `Kindly Enter Email Address`, "error")
      
    }
    
    sendPasswordResetEmail(Authentication, userEmail).then((res,error) => {
      if(error)
      {
        swal("Done!", `${error}`, "error")
      }
      swal("Done!", `Reset Link has been sent  `, "success")
    })
  }


  return (
    <div className="w-full h-screen items-center justify-center flex bg-gray-900 font-['Open-Sans'] shadow-2xl ">
      <img src={img} alt="no-img" className='w-full h-full brightness-50' />
      <div className='w-3/4 h-5/6  p-2 text-black flex items-center justify-center rounded-2xl absolute z-10 top-20 left-52'>
        <div className='h-4/5 ok  bg-gray-100/70 p-4 flex items-start justify-center flex-col rounded-2xl '>
          <div className='w-full h-1/6  flex items-center justify-center text-center '>
            <h1 className='font-semibold text-4xl '>Login</h1>
          </div>
          <form onSubmit={handleLogin} method="post" className='flex items-center justify-center w-full h-auto flex-col'>
            <div className='flex items-start justify-center  flex-col m-2 w-full '>
              <label htmlFor="" className='font-semibold'>Email</label>
              <input required onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} type="email" className='text-black w-72 border-b-2 border-gray-800 bg-transparent outline-none p-2 ' />
            </div>
            <div className='flex items-start justify-center  flex-col m-2 w-full relative'>
              <label htmlFor="" className='font-semibold'>Password</label>
              <input type={`${ShowPass === true ? "text" : "password"}`} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} className='text-black w-72 border-b-2 border-gray-800 outline-none p-2 bg-transparent ' />
              <BsEyeFill className='text-black text-xl absolute top-8 right-10 cursor-pointer' onClick={handleShowPass} />
            </div>
            <div className={` items-center justify-start w-full ${loginError === "" ? "hidden" : "flex"}`}>
              <p className='text-red-600'>{loginError}</p>
            </div>
            <div className='flex items-start justify-around  w-full  p-4 h-auto'>
              <button type='submit' className={` rounded flex items-center cursor-pointer justify-center w-40 h-12 border-2 outline-none text-xl font-semibold border-orange-600 bg-orange-600 text-white hover:bg-transparent hover:text-black transition-all duration-500`}>Sign In</button>
              <h1 onClick={() => navigate('/register')} className='p-2 text-xl font-bold flex items-center justify-center cursor-pointer'>Register < AiOutlineArrowRight className='ml-4' /></h1>
            </div>
            <div className='flex items-start justify-around  w-full  p-4 h-auto'>
              <button type='button' onClick={ResetPassword} className=' text-lg'>Forget Password ?</button>
            </div>
          </form>
        </div>
      </div >
    </div >
  )
}



