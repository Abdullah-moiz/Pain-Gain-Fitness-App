import React from 'react'

export default function VerifiedAccount({VerifyEmail , verified}) {
    const emailVerification = () => 
    {
        VerifyEmail();
    }
  return (
    <div className={`${verified === true ? "hidden" : "flex"} w-full h-20 bg-yellow-400 text-black  items-center justify-center absolute top-0 left-0 z-50 `}>
      <h1>Kindly Verify your Email Address</h1>
      <button onClick={emailVerification} className='flex m-4 p-2 underline'>Verify Email</button>
    </div>
  )
}
