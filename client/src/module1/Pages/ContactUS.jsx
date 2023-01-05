import { onAuthStateChanged } from 'firebase/auth';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Authentication } from '../../utils/firebase';
import axios from 'axios'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi';



export default function ContactUS() {
  const navigate = useNavigate();
  const [value, setValue] = useState({ email: "", subject: "", message: "", status: "Pending" });
  const [userEmail, setUserEmail] = useState(undefined);
  const [verifiedEmail, setVerifiedEmail] = useState(undefined);

  useEffect(() => {
    onAuthStateChanged(Authentication, (curUser) => {
      setUserEmail(curUser.email);
      setVerifiedEmail( curUser.emailVerified);

    })
  })

  let { email, subject, status, message } = value;
  email = userEmail;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let finalData = { email, status, subject, message };
    try {
      await axios.post('http://localhost:8000/userComplain', finalData).then(res => swal("Done!", `${res.data.msg}`, "success"))
    } catch (error) {
      console.log("error in getting complain data" + error.message)
    }
  }

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
      <div className='w-full h-1/5 flex items-center justify-between'>
          <BiArrowBack className='text-4xl font-bold text-black' onClick={() => navigate(-1)} />
          <button onClick={() => navigate('/userComplainDetail')} className="py-3 m-2 px-5 text-sm font-medium text-center text-white rounded-lg bg-orange-600 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Recent Complains</button>
        </div>
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
              <input type="email" id="email" readOnly value={userEmail} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
            </div>
            <div>
              <label for="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
              <input type="text" id="subject" onChange={(e) => setValue({ ...value, subject: e.target.value })} className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required />
            </div>
            <div className="sm:col-span-2">
              <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
              <textarea id="message" rows="6" onChange={(e) => setValue({ ...value, message: e.target.value })} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
            </div>
            <button type="submit" className={`py-3 px-5 ${verifiedEmail ? "flex" : "hidden"} text-sm font-medium text-center text-white rounded-lg bg-orange-600 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}>Send message</button>
          </form>
        </div>
      </section>
    </>
  )
}
