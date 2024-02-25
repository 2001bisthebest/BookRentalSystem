import axios from 'axios'
import React from 'react'
import Footer from '../../component/Footer'
import Navbar from '../../component/Navbar'
import Sidebar from '../../component/Sidebar'

const OpenStore = () => {
    const loadData = async () => {
        await axios.get(process.env.REACT_APP_API + '/personalinfo')
    }
    const openStore = () => {
        console.log()
    }
    return (
        <div className='grid grid-row-1 w-full h-full'>
            <div className='w-full h-full'>
                <Navbar />
            </div>
            <div className='flex w-full h-full'>
                <Sidebar />
                <div className="w-full h-full grow py-8 border flex flex-col justify-center gap-4 bg-white-bg items-center">
                    <div className='w-[480px] p-20 border border-light-purple flex flex-col gap-10 items-center rounded-2xl'>
                        <p>คุณยังไม่ได้เปิดใช้งานร้านเช่าของฉัน</p>
                        <button onClick={openStore} className='bg-light-purple p-1 w-1/2 rounded-lg text-white'>เปิดใช้งาน</button>
                    </div>
                </div>
            </div>
            <div className='w-full h-full'>
                <Footer />
            </div>
        </div>
    )
}

export default OpenStore