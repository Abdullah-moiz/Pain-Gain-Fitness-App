import React from 'react'
import { useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { Authentication } from '../../utils/firebase'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { BsEyeFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import img from '../../assets/texture.jpg'



export default function Registration() {
    let [RegisteredEmails, setRegisteredEmails] = useState('');
    const navigate = useNavigate();
    let [registerData, setRegisterData] = useState({ email: '', password: '', confirmPassword: '' })
    let [ShowPass, setShowpass] = useState(false)
    let [ShowCPass, setShowCpass] = useState(false)
    const { email, password } = registerData;
    let pass = registerData.password;
    let [agreed, setAgreed] = useState(true)
    let confirmpass = registerData.confirmPassword;
    const specialChars = `\`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`;


    function containsNumbers(str) {
        return /[0-9]/.test(str);
    }

    function containsAnyLetters(str) {
        return /[a-zA-Z]/.test(str);
    }


    const containSpecial = (x) => specialChars.split('').some(specialChar => {
        if (x.includes(specialChar)) {
            return true;
        }
        else {
            return false;
        }
    });
    // ^ checkbox validation
    let handleChecked = () => {
        setAgreed(!agreed)
    }

    // ^ showpassword logic
    let handleShowPass = () => {
        setShowpass(!ShowPass)
    }
    let handleShowCPass = () => {
        setShowCpass(!ShowCPass)
    }
    // ^ register User Logic
    let handleregister = async (e) => {

        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(Authentication, email, password)


        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                setRegisteredEmails("The email address is already in use");
            } else if (error.code === "auth/invalid-email") {
                setRegisteredEmails("The email address is not valid.");
            } else if (error.code === "auth/operation-not-allowed") {
                setRegisteredEmails("Operation not allowed.");
            }
            else {
                console.log(`error at registerUser ${error.code}`);
            }
        }
    }

    onAuthStateChanged(Authentication, (currentuser) => {
        if (currentuser) navigate('/home')
    })
    
    return (
        <div className="w-full h-screen items-center justify-center flex bg-gray-900 font-['Open-Sans']">
            <img src={img} alt="no-img" className='w-full h-full brightness-50' />
            <div className='w-3/4 h-5/6  text-black flex items-center justify-center  absolute z-10 top-20 left-52'>
                <div className='h-4/5 ok  bg-gray-100/70 p-4 flex items-start justify-center flex-col rounded-2xl'>
                    <div className='w-full h-1/6  flex items-center justify-center  '>
                        <h1 className='font-semibold text-4xl'>Register</h1>
                    </div>
                    <form onSubmit={handleregister} method="post" className='flex items-center justify-center w-full h-auto flex-col'>
                        <div className='flex items-start justify-center  flex-col m-2 w-full'>
                            <label htmlFor="" className='font-semibold'>Email</label>
                            <input required onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} type="email" placeholder='Email address ..' className='text-gray-500 w-72 border-b-2 border-gray-800 outline-none p-2 bg-transparent' />
                            <p className={`${RegisteredEmails === "" ? "hidden" : "flex"} text-red-600`}>{RegisteredEmails}</p>
                        </div>
                        <div className='flex items-start justify-center  flex-col m-2 w-full relative'>
                            <label htmlFor="" className='font-semibold'>Password</label>
                            <input type={`${ShowPass === true ? "text" : "password"}`} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} placeholder='********' className='text-gray-500 w-72 border-b-2 border-gray-800 outline-none p-2 bg-transparent ' />
                            <BsEyeFill className='text-black text-xl absolute top-8 right-10 cursor-pointer' onClick={handleShowPass} />
                            {pass.length >= 1 && containSpecial(pass) === false && containsNumbers(pass) === false ? (<small className='text-red-600'>Password must contain Letter & numbers Or Special Character</small>) : null}
                            {pass.length >= 8 && containsAnyLetters(pass) === false ? (<small className='text-red-600'>Password must contain Letter & numbers Or Special Character</small>) : null}
                            {pass.length < 8 && pass.length > 1 ? (<small className='text-red-600'>Password must be 8 character long</small>) : null}
                        </div>
                        <div className='flex items-start justify-center  flex-col m-2 w-full relative'>
                            <label htmlFor="" className='font-semibold' >Confirm Password</label>
                            <input type={`${ShowCPass === true ? "text" : "password"}`} required onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })} placeholder='********' className='text-gray-500 w-72 border-b-2 border-gray-800 outline-none p-2 bg-transparent ' />
                            <BsEyeFill className='text-black text-xl absolute top-8 right-10 cursor-pointer' onClick={handleShowCPass} />
                            {
                                confirmpass.length >= 1 && pass !== confirmpass ? (<small className='text-red-600'>Password Does'nt Match</small>) : null
                            }
                        </div>
                        <div className='flex items-center justify-start  w-full  m-2 p-2'>
                            <span className='ml-2 flex items-center justify-start cursor-pointer w-full h-full' ><input className='mr-4' type="checkbox" checked={agreed} onChange={handleChecked} /> Agree to Terms & Conditions</span>
                        </div>
                        <div className='flex items-start justify-around  w-full m-2'>
                            <button type='submit' className={`${pass !== confirmpass ? "hidden" : "flex"}  rounded flex items-center cursor-pointer justify-center w-40 h-12 border-2 outline-none text-xl font-semibold border-orange-600 bg-orange-600 text-white hover:bg-transparent hover:text-black transition-all duration-500 ${agreed === false ? "hidden" : "flex"} `}>Sign up</button>
                            <h1 onClick={() => navigate('/login')} className='p-2 text-xl font-bold flex items-center justify-center cursor-pointer'>SignIn < AiOutlineArrowRight className='ml-4' /></h1>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}
