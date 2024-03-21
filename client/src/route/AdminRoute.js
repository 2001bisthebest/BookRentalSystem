import React from 'react'
import { useSelector } from 'react-redux'
import Footer from '../component/Footer'
import Navbar from '../component/Navbar'
import Sidebar from '../component/Sidebar'

const AdminRoute = ({ children }) => {
    const { admin } = useSelector((state) => ({ ...state }))
    return (
        <div className='grid grid-row-1 w-full h-screen'>
            <div className='w-full h-full'>
                <Navbar />
            </div>
            <div className='flex w-full h-full'>
                <Sidebar />
                <div className="w-full h-full">
                    {children}
                </div>
            </div>
            <div className='w-full h-full'>
                <Footer />
            </div>
        </div>
    )
}

export default AdminRoute