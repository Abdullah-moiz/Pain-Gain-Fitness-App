import React from 'react'
import NavTrainee from '../Components/NavTrainee.jsx'
import { useState, useEffect } from 'react';
import { Authentication } from '../../utils/firebase'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth'
import VerifiedAccount from '../../module/components/VerifiedAccount'
import swal from 'sweetalert';
import TraineeIntro from '../Components/TraineeIntro.jsx';
import axios from 'axios';

export default function TraineeLandingMain() {
    const [verifiedEmail, setverifiedEmail] = useState(false)
    const [userEmail, setUserEmail] = useState(null);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {

        onAuthStateChanged(Authentication, (currentUser) => {
            if (!currentUser) navigate("/login");
            setUserEmail(currentUser.email);
            let checkVerification = currentUser.emailVerified
            setverifiedEmail(checkVerification)
        });
    }, [verifiedEmail, navigate])

    const VerifyEmail = () => {
        sendEmailVerification(Authentication.currentUser)
            .then(() => {
                swal("Done!", `Verification email has be sent`, "success")
            });
    }

    useEffect(() => {
        (async () => {
            try {
                await axios.get('http://localhost:8000/getUserData', { params: { email: userEmail } })
                    .then(res => setUserData(res.data));
            } catch (error) {
                console.log(`error in getting User Data ${error.message}`);
            }
        }
        )()
    }, [userEmail])



    return (
        <div className='w-full h-screen flex items-start justify-start'>
            <VerifiedAccount VerifyEmail={VerifyEmail} verified={verifiedEmail} />
            <NavTrainee />
            <TraineeIntro verified={verifiedEmail} />
        </div>
    )
}
