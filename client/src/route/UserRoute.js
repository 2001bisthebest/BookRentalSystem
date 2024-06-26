import {
    QueryClient,
    QueryClientProvider
} from '@tanstack/react-query'
import React from 'react'
import { useSelector } from 'react-redux'
import Footer from '../component/Footer'
import Navbar from '../component/Navbar'
import Sidebar from '../component/Sidebar'

const UserRoute = ({ children }) => {
    const { user } = useSelector((state) => (state.user))
    const queryClient = new QueryClient()
    return (
        <div className='grid grid-cols-4 lg:grid-cols-5 w-full h-full font-noto-sans-thai'>
            <div className='col-span-full w-full h-full'>
                <QueryClientProvider client={queryClient}>
                    <Navbar />
                </QueryClientProvider>
            </div>
            <Sidebar />
            <div className="col-span-3 lg:col-span-4 w-full h-full">
                {user && user.token ? children : <h1>Please login or register</h1>}
            </div>
            <div className='col-span-full w-full h-full'>
                <Footer />
            </div>
        </div>
    )
}

export default UserRoute