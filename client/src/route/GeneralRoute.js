import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query'
import React from 'react'
import Footer from '../component/Footer'
import Navbar from '../component/Navbar'
import Sidebar from '../component/Sidebar'

const GeneralRoute = ({ children }) => {
    const queryClient = new QueryClient()
    return (
        <div className='grid grid-cols-4 lg:grid-cols-5 w-full h-screen font-noto-sans-thai'>
            <div className='col-span-full w-full h-full'>
                <QueryClientProvider client={queryClient}>
                    <Navbar />
                </QueryClientProvider>
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