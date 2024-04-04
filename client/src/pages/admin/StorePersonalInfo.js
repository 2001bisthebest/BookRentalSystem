import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PlusSVG from '../../SVG/PlusSVG'
import AddBook from '../../component/modal/AddBook'

const StorePersonalInfo = () => {
    const [book, setBook] = useState([])
    const { admin } = useSelector((state) => ({ ...state }))
    const idStore = admin.admin.id
    useEffect(() => {
        loadData()
    }, [idStore])
    const loadData = async () => {
        await axios.get(process.env.REACT_APP_API + '/listbook/' + idStore).then(res => {
            setBook(res.data)
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
                    <div className='grid grid-cols-2 justify-items-start gap-2'>
                        <p>Store name</p>
                        <p>name</p>
                        <p>รายละเอียดร้านค้า</p>
                        <p>eiei</p>
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
                        <div className='w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-10'>
                            {book ? book.map(item =>
                                <div className='relative flex flex-col gap-2'>
                                    <div className='absolute top-2 right-2 w-12 h-6 rounded bg-[#5DD971] text-white drop-shadow-md'>
                                        <p>ว่าง</p>
                                    </div>
                                    <a href={`/book/${item._id}`} className='border w-40 h-40 bg-gray'></a>
                                    <div className='flex flex-col gap-1'>
                                        <p>{item.title}</p>
                                        <p>{item.price}</p>
                                    </div>
                                </div>
                            )
                                :
                                <div className='flex flex-col gap-2'>
                                    {/* <div className='border w-40 h-40 bg-gray'>
                        <button>
                            <p>Add book</p>
                        </button>
                    </div> */}
                                </div>
                            }
                        </div>
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
                    {/* <ListItems /> */}
                </div>
            </div>
            <AddBook props={isOpen} />
        </div>
    )
}

export default StorePersonalInfo