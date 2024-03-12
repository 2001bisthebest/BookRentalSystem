import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ListItems from '../../component/ListItems'

const StorePersonalInfo = () => {
    const [data, setData] = useState([])
    const { admin } = useSelector((state) => ({ ...state }))
    const idStore = admin.admin.id
    useEffect(() => {
        loadData()
    }, [])
    const loadData = async () => {
        await axios.get(process.env.REACT_APP_API + '/listbook/' + idStore).then(res => {
            setData(res.data)
        }).catch(err => console.log(err))
    }
    console.log(data)
    return (
        <div className="w-full h-full grow py-8 border flex flex-col justify-center gap-4 bg-white-bg">
            <div className='flex flex-col items-start gap-10'>
                <div className='flex gap-10 items-start justify-center px-40'>
                    <div className='bg-gray rounded w-40 h-40'>
                        <h1>A</h1>
                    </div>
                    <div className='flex flex-col justify-center items-start gap-2'>
                        <p>Store name</p>
                        <p>detail</p>
                    </div>
                </div>
                <div className='flex flex-col gap-5 justify-center items-start px-20'>
                    <p>หนังสือทั้งหมด</p>
                    <ListItems children={data} />
                </div>
                <div className='flex flex-col gap-5 justify-center items-start px-20'>
                    <p>หนังสือแนะนำ</p>
                    <ListItems />
                </div>
            </div>
        </div>
    )
}

export default StorePersonalInfo