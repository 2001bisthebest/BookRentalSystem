import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { currentUser } from '../../functions/auth'

export const PersonalInfo = () => {
    const [data, setData] = useState({})
    const { user } = useSelector((state) => (state.user))
    const token = user.token

    useEffect(() => {
        currentUser(token).then(res => setData(res.data))
    }, [user.id])
    console.log(data.file)
    return (
        <div className="w-full h-full grow py-20 border flex flex-col items-center gap-8 bg-white-bg">
            <img src={process.env.REACT_APP_IMG + '/' + data.file} className='w-60 h-60 rounded-full drop-shadow-md' />
            <p className='text-2xl font-semibold'>{data.username}</p>
            <div className='self-center w-1/2 grid grid-cols-2 justify-items-start gap-2'>
                <p className='font-semibold'>ชื่อ :</p>
                <p >{data.name}</p>
                <p className='font-semibold'>เบอร์โทร :</p>
                <p>{data.telephone}</p>
                <p className='font-semibold'>ที่อยู่ : </p>
                <p>{data.address}</p>
                <p className='font-semibold'>ประเภทหนังสือที่สนใจ : </p>
            </div>
            <button className='bg-light-purple py-1 px-4 rounded-lg text-white'>แก้ไข</button>
        </div>
    )
}