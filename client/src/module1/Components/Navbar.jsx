import React from 'react'
import { FiShoppingCart } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BiLogOut, BiSearchAlt } from 'react-icons/bi';
import {MdContactPhone} from 'react-icons/md';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Authentication } from '../../utils/firebase'
import { signOut } from 'firebase/auth';
import AOS from 'aos';
import 'aos/dist/aos.css';
import logo from '../../assets/logo.png'
AOS.init();


export default function Navbar() {
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
        <>

            <div className={` ${Scrolled ? " text-black" : "text-white"}  transition-all  duration-200 w-full z-40  fixed top-0 left-0  h-24  flex items-center justify-between ${Scrolled ? " bg-white" : ""}`}>
                <div className=' h-full pl-4 flex items-center justify-start'>
                <img onClick={'/'} src={logo} alt=""  className='w-40 h-28'/>
                </div>
                <div className=' h-full pr-4 flex items-center justify-start lg:hidden'>
                    <GiHamburgerMenu className=" text-2xl" type="button" onClick={ () => handleHamburger()} />
                </div>
               
                <div className=' h-full  items-center justify-center lg:flex hidden'>
                    <ul className='w-full h-full flex items-center justify-center pl-5'>
                        <li onClick={() => navigate('/home')} className='text-xl font-semibold p-2 mx-4 cursor-pointer transition-all duration-300  hover:text-orange-600'>Home</li>
                        <li onClick={() => navigate('/accessories')} className='text-xl font-semibold   p-2 mx-4 cursor-pointer transition-all duration-300  hover:text-orange-600'>Accessories</li>
                        <li onClick={() => navigate('/equipment')} className='text-xl font-semibold   p-2 mx-4 cursor-pointer transition-all duration-300  hover:text-orange-600'>Equipments</li>
                        <li onClick={() => navigate('/medicine')} className='text-xl  font-semibold  p-2 mx-4 cursor-pointer transition-all duration-300  hover:text-orange-600'>Supplements</li>
                        <li onClick={() => navigate('/myorders')} className='text-xl  font-semibold  p-2 mx-4 cursor-pointer transition-all duration-300  hover:text-orange-600'>My Orders</li>
                    </ul>
                </div>
                <div className=' h-full  items-center justify-end pr-4 lg:flex hidden'>
                    <BiSearchAlt onClick={() => navigate('/search')} className='p-2 font-semibold  mx-4 text-4xl cursor-pointer transition-all duration-300  hover:text-orange-600' />
                    <MdContactPhone  onClick={() => navigate('/contactus')} className='p-2 font-semibold  mx-4 text-4xl cursor-pointer transition-all duration-300  hover:text-orange-600' />
                    <FiShoppingCart onClick={() => navigate('/cart')} className='p-2 mx-4 text-4xl font-semibold  cursor-pointer transition-all duration-300  hover:text-orange-600' />
                    <BiLogOut onClick={() => signOut(Authentication)} className='p-2 mx-4 text-4xl cursor-pointer font-semibold transition-all duration-300  hover:text-orange-600 ' />
                </div>
                <div className={`h-64 p-2  bg-white text-black flex-col items-center justify-start absolute top-20 left-0 w-full  ${navbarOpen === true ? "flex" : 'hidden'}`} data-aos="fade-left" >
                    <ul >
                        <li onClick={() => navigate('/')} className='text-xl font-semibold p-2 mx-4 cursor-pointer transition-all duration-300  hover:text-orange-600'>Home</li>
                        <li onClick={() => navigate('/accessories')} className='text-xl font-semibold   p-2 mx-4 cursor-pointer transition-all duration-300  hover:text-orange-600'>Accessories</li>
                        <li onClick={() => navigate('/equipment')} className='text-xl font-semibold   p-2 mx-4 cursor-pointer transition-all duration-300  hover:text-orange-600'>Equipments</li>
                        <li onClick={() => navigate('/medicine')} className='text-xl  font-semibold  p-2 mx-4 cursor-pointer transition-all duration-300  hover:text-orange-600'>Supplements</li>
                    </ul>
                    <div className=' h-full flex items-center justify-end '>
                        <BiSearchAlt onClick={() => navigate('/search')} className='p-2 font-semibold  mx-4 text-4xl cursor-pointer transition-all duration-300  hover:text-orange-600' />
                        <MdContactPhone  onClick={() => navigate('/contactus')} className='p-2 font-semibold  mx-4 text-4xl cursor-pointer transition-all duration-300  hover:text-orange-600' />
                        <FiShoppingCart onClick={() => navigate('/cart')} className='p-2 mx-4 text-4xl font-semibold  cursor-pointer transition-all duration-300  hover:text-orange-600' />
                        <BiLogOut onClick={() => signOut(Authentication)} className='p-2 mx-4 text-4xl cursor-pointer font-semibold transition-all duration-300  hover:text-orange-600 ' />
                    </div>
                </div>
            </div>
        </>
    );
}




