import React from 'react'
import Footer from '../component/Footer'
import ListItems from '../component/ListItems'
import Navbar from '../component/Navbar'
import Sidebar from '../component/Sidebar'

const AllBooksPage = () => {
    return (
        <div className='grid grid-row-1 w-full h-full'>
            <div className='w-full h-full'>
                <Navbar />
            </div>
            <div className='flex w-full h-full'>
                <Sidebar />
                <div className="w-full h-full grow py-8 border flex flex-col justify-center gap-4 bg-white-bg">
                    {/* <div className='items-center px-36'>
                        <Menubar />
                    </div> */}
                    <div>
                        <p className='flex justify-start px-20 text-2xl font-bold'>หนังสือทั้งหมด</p>
                    </div>
                    <div className='px-20 py-5'>
                        <ListItems />
                    </div>
                </div>
            </div>
            <div className='w-full h-full'>
                <Footer />
            </div>
        </div>
    )
}

export default AllBooksPage