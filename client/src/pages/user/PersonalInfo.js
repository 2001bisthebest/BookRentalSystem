import axios from 'axios'
import React from 'react'

export const PersonalInfo = () => {

    const fetchData = async () => {
        await axios.get(process.env.REACT_APP_API + '/personalinfo').then((res) => console.log(res.data)).catch(err => console.log(err))
    }
    return (
        <div className="w-full h-full grow py-8 border flex flex-col justify-center items-center gap-4 bg-white-bg">
            <div className='w-60 h-60 rounded-full bg-gray-400'>

            </div>
            <p>User 1</p>
            <div className='flex flex-col justify-center items-start gap-2'>
                <p>ชื่อ : </p>
                <p>เบอร์โทร : </p>
                <p>ที่อยู่ : </p>
                <p>ประเภทหนังสือที่สนใจ : </p>
            </div>
            <button className='bg-light-purple py-1 px-4 rounded-lg text-white'>แก้ไข</button>
        </div>
    )
}