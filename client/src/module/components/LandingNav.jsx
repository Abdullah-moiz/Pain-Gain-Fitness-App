import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../assets/logo.png'


export default function LandingNav() {
    const navigate = useNavigate();
    const [Scrolled, setScrolled] = useState(false)
    const [navbarOpen, setNavbarOpen] = useState(false);

    const handleHamburger = () => {
        setNavbarOpen(!navbarOpen)
    }

    window.onscroll = () => {
        setScrolled(window.pageYOffset < 30 ? false : true)
        return () => window.onscroll = null
    }


    return (

        <div className={` ${Scrolled ? " text-black" : "text-white"}  transition-all  duration-200 w-full z-40  fixed top-0 left-0  h-24  flex items-center justify-between ${Scrolled ? " bg-white" : ""}`}>
            <div className=' h-full pl-4 flex items-center justify-center'>
                <img onClick={'/'} src={logo} alt=""  className='w-40 h-28'/>
            </div>
            <div className=' h-full pr-4 flex items-center justify-start lg:hidden'>
                <GiHamburgerMenu className=" text-2xl" type="button" onClick={() => handleHamburger()} />
            </div>

            <div className=' h-full  items-center justify-center lg:flex hidden'>
                <ul className='w-full h-full flex items-center justify-center pl-5'>
                    <li onClick={() => navigate('/')} className='text-xl font-semibold p-2 mx-4 cursor-pointer transition-all duration-300  hover:text-orange-600'>Home</li>
                    <li onClick={() => navigate('/login')} className='text-xl font-semibold p-2 mx-4 cursor-pointer transition-all duration-300  hover:text-orange-600'>Contact us</li>
                    <li onClick={() => navigate('/about-us')} className='text-xl font-semibold   p-2 mx-4 cursor-pointer transition-all duration-300  hover:text-orange-600'>About us</li>
                </ul>
            </div>
            <div className=' h-full  items-center justify-end pr-4 lg:flex hidden'>
                <button onClick={() => navigate('/register')} className='w-28 p-2 text-black text-lg border-2 m-2 bg-white outline-none border-white rounded font-semibold hover:bg-transparent transition-all duration-500'>Register</button>
                <button onClick={() => navigate('/login')} className='w-28 p-2 text-black text-lg border-2 m-2 hover:bg-white outline-none border-white rounded font-semibold  transition-all duration-500'>Login</button>
            </div>
            <div className={`h-64 p-2  bg-white text-black flex-col items-center justify-start absolute top-20 left-0 w-full  ${navbarOpen === true ? "flex" : 'hidden'}`} data-aos="fade-left" >
                <ul >
                    <li onClick={() => navigate('/')} className='text-xl font-semibold p-2 mx-4 cursor-pointer transition-all duration-300  hover:text-orange-600'>Home</li>
                    <li onClick={() => navigate('/About')} className='text-xl font-semibold   p-2 mx-4 cursor-pointer transition-all duration-300  hover:text-orange-600'>About</li>
                </ul>
                <div className=' h-full flex items-center justify-end '>
                    <button onClick={() => navigate('/register')} className='w-28 p-2 text-black text-lg border-2 m-2 bg-white outline-none border-white rounded font-semibold hover:bg-transparent transition-all duration-500'>Register</button>
                    <button onClick={() => navigate('/login')} className='w-28 p-2 text-black text-lg border-2 m-2 hover:bg-white outline-none border-white rounded font-semibold  transition-all duration-500'>Login</button>
                </div>
            </div>
        </div>
    )
}

    //   <div className={`text-white transition-all duration-200 w-full z-40  fixed top-0 left-0  h-24   flex items-center justify-around ${Scrolled ? " bg-white text-black" : ""}`}>
    //       <div className=' h-full pl-4 flex items-center justify-start'>
    //           <h1 className='font-semibold  text-2xl'>Pain & Gain</h1>
    //       </div>
    //       <div className=' h-full flex items-center justify-center'>
    //           <ul className='w-full h-full flex items-center justify-center pl-5'>
    //               <li onClick={() => navigate('/')} className='text-xl font-semibold   p-2 mx-4 cursor-pointer transition-all duration-300  hover:text-orange-600'>Home</li>
    //               <li  onClick={() => navigate('/')} className='text-xl font-semibold   p-2 mx-4 cursor-pointer transition-all duration-300  hover:text-orange-600'>About</li>
    //               <li onClick={() => navigate('/')} className='text-xl font-semibold   p-2 mx-4 cursor-pointer transition-all duration-300  hover:text-orange-600'>Contact</li>
    //           </ul>
    //       </div>
    //       <div className=' h-full flex items-center justify-end pr-4'>

    //       </div>
    //   </div>