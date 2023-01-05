import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi';
import axios from 'axios';
import { useParams } from 'react-router-dom'



export default function ComplainsDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [reply, setReply] = useState(undefined)

    useEffect(() => {
        (async () => {
            try {
                await axios.get(`http://localhost:8000/userComplaindata/:id`, {
                    params: { id: id }
                }).then(res => setData(res.data))
            } catch (error) {
                console.log(error.message);
            }
        })()
    }, [])

   






    return (
        <section className="bg-white dark:bg-gray-900">
            <div className='w-full h-1/5 flex items-center justify-start'>
                <BiArrowBack className='text-4xl font-bold text-black' onClick={() => navigate(-1)} />
            </div>
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                {
                    data.map((complain) => {
                        return (
                            <form  className="space-y-8">
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                                    <input type="email"  id="disabled-input" aria-label="disabled input"  readOnly value={complain.email} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
                                </div>
                                <div>
                                    <label for="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                                    <input type="text"  id="disabled-input" aria-label="disabled input" readOnly value={complain.subject} className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required />
                                </div>
                                <div className="sm:col-span-2">
                                    <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">My Message message</label>
                                    <textarea  id="disabled-input" aria-label="disabled input"  rows="6" readOnly value={complain.message} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                                </div>
                                <div className="sm:col-span-2">
                                    <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Admin Reply </label>
                                    <textarea  id="disabled-input" aria-label="disabled input"  readOnly rows="6" value={complain.reply} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                                </div>
                            </form>
                        )
                    })
                }

            </div>
        </section>
    )
}
