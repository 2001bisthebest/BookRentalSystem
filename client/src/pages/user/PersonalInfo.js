import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { currentUser } from '../../functions/auth'

export const PersonalInfo = () => {
    const [data, setData] = useState({})
    const { user } = useSelector((state) => (state.user))
    const [bookPref, setBookPref] = useState([])
    const token = user.token

    useEffect(() => {
        currentUser(token).then(res => setData(res.data))
        loadData()
    }, [user.id])
    const loadData = async () => {
        try {
            let bookPrefResponse = await axios.get(process.env.REACT_APP_API + '/showbookpref/' + user.id)
            setBookPref(bookPrefResponse.data)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="w-full h-full grow p-20 border flex flex-col items-center gap-8 bg-white-bg">
            <div className='w-40 h-40 rounded-full'>
                <img src={process.env.REACT_APP_IMG + '/' + data.file} className='w-full h-full rounded-full drop-shadow-md' />
            </div>
            <p className='text-2xl font-semibold'>{data.username}</p>
            <div className='w-full grid grid-cols-2 justify-items-start gap-2'>
                <p className='justify-self-end font-semibold pr-2'>ชื่อ :</p>
                <p>{data.name}</p>
                <p className='justify-self-end font-semibold pr-2'>เบอร์โทร :</p>
                <p>{data.telephone}</p>
                <p className='justify-self-end font-semibold pr-2'>ที่อยู่ : </p>
                <p>{data.address}</p>
                <p className='justify-self-end font-semibold pr-2'>ประเภทหนังสือที่สนใจ : </p>
                <div className='col-span-1 flex gap-2'>
                    {bookPref.length > 0 ? bookPref.map((item) => <p>{item.name}</p>) : ''}</div>
            </div>
            <button className='bg-light-purple py-1 px-4 rounded-lg text-white'>แก้ไข</button>
        </div>
    )
}