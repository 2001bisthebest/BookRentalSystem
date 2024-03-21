import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PlusSVG from '../../SVG/PlusSVG'
import ListItems from '../../component/list/ListItems'
import AddBook from '../../component/modal/AddBook'

const StorePersonalInfo = () => {
    const [data, setData] = useState([])
    const { admin } = useSelector((state) => ({ ...state }))
    const idStore = admin.admin.id
    useEffect(() => {
        loadData()
    }, [idStore])
    const loadData = async () => {
        await axios.get(process.env.REACT_APP_API + '/listbook/' + idStore).then(res => {
            setData(res.data)
        }).catch(err => console.log(err))
    }
    const [isOpen, setOpen] = useState(false)
    const openModal = () => {
        setOpen(!isOpen)
    }
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
                    <div className='flex gap-2'>
                        <div className='relative flex flex-col gap-2 bg-gray items-start'>
                            <button type='button' onClick={openModal} className='border w-40 h-40 flex flex-col justify-center items-center'>
                                <PlusSVG />
                                <p>Add</p>
                            </button>
                        </div>
                        <ListItems children={data} />
                    </div>

                </div>
                <div className='flex flex-col gap-5 justify-center items-start px-20'>
                    <p>หนังสือแนะนำ</p>
                    <div className='relative flex flex-col gap-2 bg-gray items-start'>
                        <button type='button' onClick={openModal} className='border w-40 h-40 flex flex-col justify-center items-center'>
                            <PlusSVG />
                            <p>Add</p>
                        </button>
                    </div>
                    <ListItems />
                </div>
            </div>
            <AddBook props={isOpen} />
        </div>
    )
}

export default StorePersonalInfo