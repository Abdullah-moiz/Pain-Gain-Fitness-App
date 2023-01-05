import React from 'react'
import Navbar from '../Components/Navbar'
import './landingEcommerce.css'
import Intro from '../Components/Intro'
import TopProducts from '../Components/TopProducts'
import MoveTop from '../../module/components/MoveTop'
import Footer from '../../module/components/Footer'
import { Authentication } from '../../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth'
import VerifiedAccount from '../../module/components/VerifiedAccount'
import { useState } from 'react'
import { useEffect } from 'react'
import { InfinitySpin } from 'react-loader-spinner'
import swal from 'sweetalert';






export default function LandingEcommerce({ medicineData, machineData, accessoriesData }) {
  const [loaded, setloaded] = useState(false)
  const navigate = useNavigate();
  const topproducts = "Supplements"
  const equipments = "Equipments"
  const accessories = "Accessories"
  const MoveToMedicines = "/medicine"
  const MoveToEquipments = "/equipment"
  const MoveToAccessories = "/accessories"


 

  //  ^  Email verification logic
  const [verifiedEmail, setverifiedEmail] = useState(false)






  // ^ checking if user id logged in 

  useEffect(() => {
  
    onAuthStateChanged(Authentication, (currentUser) => {
      if (!currentUser) navigate("/login");
      let checkVerification = currentUser.emailVerified
      setverifiedEmail(checkVerification)
    });
  }, [verifiedEmail , navigate])

  const VerifyEmail = () => {
    sendEmailVerification(Authentication.currentUser)
      .then(() => {
        swal("Done!", `Verification email has be sent`, "success")
      });
  }


  const getMachineDataFromRange = (from, to) => {
    return machineData.slice(from, to);
  };
  const getAccessoriesfromRange = (from, to) => {
    return accessoriesData.slice(from, to);
  };
  const getmedicineDtafromRange = (from, to) => {
    return medicineData.slice(from, to);
  };


  // ^ setting loader
  useEffect(() => {
    if (machineData.length > 2 || accessoriesData.length > 2 || medicineData > 2 ) {
      setloaded(true);
    }
    else {
      setloaded(false)
    }
  },[machineData , accessoriesData , medicineData ])

  return (
    <div className='w-full flex'>
      <div className={`${loaded === true ? "hidden" : "flex"} items-center justify-center w-full h-screen bg-black flex-col`}>
        <InfinitySpin width='200' color="orange" />
        <h1 className='text-orange-600 text-xl'> Loading Resources ....</h1>
      </div>

    <div className={` ${loaded === false ? "hidden" : "flex"} w-full font-['Open-Sans'] text-black flex h-auto  flex-col relative`}>

      <VerifiedAccount VerifyEmail={VerifyEmail} verified={verifiedEmail} />
      <Navbar />
      <Intro />
      <TopProducts title={equipments} items={getMachineDataFromRange(0, 4)} route={MoveToEquipments }/>
      <TopProducts title={topproducts} items={getmedicineDtafromRange(0, 4)} route={MoveToMedicines} />
      <TopProducts title={accessories} items={getAccessoriesfromRange(0, 4)} route={MoveToAccessories} />
      <MoveTop />
      <Footer />
    </div>
    </div>
  )
}
