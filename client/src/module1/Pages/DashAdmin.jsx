import React, { useEffect } from 'react'
import AdminSideBar from '../Components/AdminSideBar'
import { useNavigate  } from 'react-router-dom'

export default function DashAdmin() {
  const navigate = useNavigate();
  useEffect(() => {
    let x  = localStorage.getItem('login')
    if(!x)
    {
        navigate('/')
    }
},[])
  return (
    <div className='w-full h-screen'>
      <AdminSideBar/>
    </div>
  )
}
