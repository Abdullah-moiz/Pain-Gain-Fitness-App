import React from 'react'
import About from '../components/About'
import GuestIntro from '../components/GuestIntro'
import LandingNav from '../components/LandingNav'
import { Authentication } from '../../utils/firebase'
import { useNavigate } from 'react-router-dom'
import PersonalTrainer from '../components/PersonalTrainer'
import Footer from '../components/Footer'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Supplier from '../components/Supplier';
import Reviews from '../components/Reviews'
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
AOS.init();


export default function () {
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(Authentication, (currentUser) => {
      if (currentUser) navigate("/home");
  })
  },[navigate])
  return (
    <div className='w-full h-screen'>
      <LandingNav/>
      <GuestIntro/>
      <About/>
      <Supplier/>
      <PersonalTrainer/>
      <Reviews/>
      <Footer/>
    </div>
    
  )
}
