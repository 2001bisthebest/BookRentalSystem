import React from 'react'
import { useSelector } from 'react-redux'
import Footer from '../component/Footer'
import Navbar from '../component/Navbar'
import Sidebar from '../component/Sidebar'

const UserRoute = ({ children }) => {
    const { user } = useSelector((state) => ({ ...state }))
    console.log('User', user)
    return (
        <div className='grid grid-row-1 w-full h-screen'>
            <div className='w-full h-full'>
                <Navbar />
            </div>
            <div className='flex w-full h-screen'>
                <Sidebar />
                <div className="w-full h-full">
                    {user && user.user.token ? children : <h1>Please login or register</h1>}
                </div>
            </div>
            <div className='w-full h-full'>
                <Footer />
            </div>
        </div>
    )
}

export default UserRoute