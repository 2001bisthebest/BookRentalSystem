import React from 'react'
import Footer from '../component/Footer'
import NavbarUser from '../component/NavbarUser'
import Sidebar from '../component/Sidebar'

const GeneralRoute = ({ children }) => {
    return (
        <div className='grid grid-cols-4 lg:grid-cols-5 w-full h-screen font-noto-sans-thai'>
            <div className='col-span-full w-full h-full'>
                <NavbarUser />
            </div>
            <Sidebar />
            <div className="col-span-3 lg:col-span-4 w-full h-full">
                {children}
            </div>
            <div className='col-span-full w-full h-full'>
                <Footer />
            </div>
        </div>
    )
}

export default GeneralRoute