import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi';
import { AiOutlineSend } from 'react-icons/ai';
import { useEffect } from 'react';
import { Authentication } from '../../utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import axios from 'axios'



export default function MainChat() {

    const navigate = useNavigate();
    //  for sending messages
    const [message, setMessage] = useState('')
    const [senderName, setSenderName] = useState('');
    const [senderImage, setSenderImage] = useState('');


    // getting verified Email of current User
    const [userEmail, setUserEmail] = useState('');
    // getting data of current User
    const [userData, setUserData] = useState([]);
    // getting chat that is currently active
    const [activeChat, setActiveChat] = useState([]);
    // create a unique chat ID
    const [chatID, setChatID] = useState('');

    // setting receiver Name and receiver Image 
    const [receiverName, setReceiverName] = useState('');
    const [receiverImage, setReceiverImage] = useState('');

    // All Conversation Data
    const [chatData, setChatData] = useState([]);


    // -----------------------------------------------------------------------------------------------
    

    // -----------------------------------------------------------------------------------------------


    useEffect(() => {
        onAuthStateChanged(Authentication, (currentUser) => {
            if (!currentUser) navigate("/login");
            let email = currentUser.email
            setUserEmail(email)
        });
    }, [userEmail, navigate])


    useEffect(() => {
        (async () => {
            try {
                await axios.get('http://localhost:8000/getHiredUserData', {
                    params: {
                        userEmail: userEmail
                    }
                }).then(res => setUserData(res.data))
            } catch (error) {
                console.log('getting error from hired user data ' + error.message)
            }


        })()

    }, [userEmail , userData])



    const handleSendMessage = async (e) => {
        e.preventDefault();

        let finalData = { chatID, senderImage, senderName, message }
        if (chatID === "" || senderName === "" || senderImage === "") {
            alert('Empty Data')
        }
        else {

            try {
                await axios.post('http://localhost:8000/send-message', finalData).then(setMessage(""));
            } catch (error) {
                console.log(error.message);
            }
            setMessage("");
        }



    };



    const getChat = async (user) => {
        setActiveChat(user);
        setChatID(`${user._id + user.trainerID._id}`)
        setSenderName(user.username)
        setSenderImage(user.img)

        setReceiverImage(user.trainerID.img)
        setReceiverName(user.trainerID.name)
    }


    useEffect(() => {
        (async () => {
            try {
                await axios.get('http://localhost:8000/get-message', { params: { chatID } })
                    .then(res => setChatData(res.data))
            } catch (error) {
                console.log('error from getting message' + error.message)
            }
        })()


    },[chatData , chatID])


    return (
        <div className='w-full h-screen flex items-start justify-start flex-col overflow-hidden'>
            <div className='w-full h-16 flex items-center justify-between'>
                <BiArrowBack className='text-4xl font-bold text-black' onClick={() => navigate(-1)} />
                <div className='w-60 h-full flex items-center justify-center'>
                    <img src={senderImage} alt="none" className='w-12 h-4/5 rounded-full' />
                    <h3 className='p-2 mx-2 text-lg font-semibold'>{senderName}</h3>
                </div>
            </div>
            <div className="w-full h-full flex items-center justify-center bg-gray-200 flex-col ">
                <div className='w-4/5 h-4/5 bg-white  flex items-center justify-center '>
                    {/* container left */}

                    <div className='w-3/12 h-full  flex items-start justify-start flex-col '>
                        <div className='w-full h-20 bg-orange-600 flex items-center justify-start font-semibold text-white p-4 '>
                            <h1>ALL CONVERSATIONS</h1>
                        </div>
                        <div className='w-full h-full   overflow-y-auto overflow-hidden'>
                            {/* users map start from here */}
                            {

                                userData?.map((user) => {
                                    return (
                                        <div onClick={() => getChat(user)} className='w-full h-1/6 cursor-pointer  flex items-center justify-start border-b-2 border-gray-400'>
                                            <div className='w-2/6 h-full '>
                                                <div className='w-full h-full rounded-full flex items-center justify-center '>
                                                    <img src={user.trainerID.img} alt="none" className='w-3/5 h-3/5 rounded-full' />
                                                </div>
                                            </div>
                                            <div className='w-4/6 h-full flex items-center justify-start'>
                                                <h3 className='font-semibold p-2'>{user.trainerID.name}</h3>
                                            </div>
                                        </div>
                                    )
                                })}
                            {/* users map end here */}
                        </div>
                    </div>


                    {/* conatiner Right  */}
                    <div className={`${Object.keys(activeChat).length > 0 ? "flex" : "hidden"}  w-9/12 h-full  flex items-start justify-start flex-col  `}>
                        <div className='w-full h-20 bg-gray-100 flex items-center justify-start font-semibold  p-4 '>
                            <div className='flex w-full h-full items-center justify-start'>
                                <img src={receiverImage} alt="none" className='w-16 h-16 rounded-full p-2 ' />
                                <h3 className='mx-2'>{receiverName} (Trainer)</h3>
                            </div>
                        </div>

                        { /* chat container */}
                        <div className='w-full h-full   flex overflow-hidden overflow-y-auto  '>
                            <div className='h-full flex flex-col'>
                                {
                                    chatData?.map((message, i) => {
                                        return (
                                            <div className={`flex items-center justify-start m-2 p-2 `}>
                                                <img src={message.senderImage} alt="none" className='w-10 h-10 rounded-full' />
                                                <div className='flex items-start justify-start m-1 flex-col'>
                                                    <h4 className='p-2 '>{message.senderName}</h4>
                                                    <a href={message.message} className={` p-2 bg-orange-600 rounded-xl text-white ${message.senderName !== activeChat.trainerID.name ? "bg-slate-500" : "bg-orange-600"}`}>{message.message}</a>
                                                </div>
                                            </div>
                                        )
                                    })

                                }

                            </div>
                        </div>
                        {/* chat container */}
                        <div className='w-full h-20 bg-white flex items-center justify-start font-semibold  p-4 '>
                            <input type="text" onChange={(e) => setMessage(e.target.value)} value={message} className='w-full h-full p-2 bg-gray-200 outline-none rounded-lg shadow-2xl' placeholder='Type' />
                            <button onClick={handleSendMessage} className='text-2xl flex items-center justify-center w-32 h-full bg-transparent cursor-pointer text-orange-600 font-extrabold'><AiOutlineSend /></button>
                        </div>
                    </div>


                    {/* empty container */}
                    <div className={`w-9/12 h-full ${Object.keys(activeChat).length > 0 ? "hidden" : "flex"}  flex items-center justify-center flex-col  bg-red`}>
                        <h1 className='text-3xl font-bold text-gray-300'>Select Any Chat To Start Conversation</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
