import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const StorePage = () => {
    const [store, setStore] = useState({})
    const [book, setBook] = useState([])
    const storeId = useParams()
    const loadData = async () => {
        try {
            let storeRes = await axios.get(process.env.REACT_APP_API + '/storeinfo/' + storeId.id)
            setStore(storeRes.data)
            let bookRes = await axios.get(process.env.REACT_APP_API + '/listbook/' + storeId.id)
            setBook(bookRes.data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        loadData()
    }, [])
    return (
        <div className="w-full h-full xl:h-screen grow py-20 border flex flex-col justify-start gap-4 bg-white-bg">
            <div className='flex flex-col md:flex-row px-20 gap-10'>
                <div className='w-32 h-32 lg:w-40 lg:h-40 rounded-full'>
                    <img className='w-full h-full rounded-full' src={process.env.REACT_APP_IMG + '/' + store.file} />
                </div>
                <div className='flex flex-col gap-2'>
                    <p className='self-start text-3xl font-bold'>{store.name}</p>
                    <div className='px-5 grid grid-cols-3 gap-4 justify-items-start'>
                        <p>รายละเอียดร้าน</p>
                        <p className='col-span-2'>{store.detailStore}</p>
                        <p>จำนวนหนังสือทั้งหมด</p>
                        <p className='col-span-2'>{book.length}</p>
                    </div>
                </div>
            </div>
            <div className='px-20 py-5 flex flex-col gap-5'>
                <h1 className='font-semibold text-xl self-start'>หนังสือทั้งหมด</h1>
                <div className='w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10'>
                    {book ? book.map(item =>
                        <div className='flex flex-col gap-4 items-center'>
                            <div className='relative w-20 h-20 lg:w-40 lg:h-40'>
                                {item.status ?
                                    <div className='absolute top-2 right-2 w-12 h-6 rounded bg-yellow-btn text-white drop-shadow-md z-40'>
                                        <p>รอคิว</p>
                                    </div> :
                                    <div className='absolute top-2 right-2 w-12 h-6 rounded bg-green-btn text-white drop-shadow-md z-40'>
                                        <p>ว่าง</p>
                                    </div>
                                }
                                <a href={`/book/${item._id}`} className='w-full h-full flex justify-center'>{item.file ? <img src={process.env.REACT_APP_IMG + "/" + item.file} className='h-full rounded-lg drop-shadow-md'></img> : ""}</a>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <p className='font-semibold'>{item.title}</p>
                                <p>{item.price} บาท</p>
                            </div>
                        </div>
                    )
                        : ''}
                </div>
            </div>
        </div>
    )
}

export default StorePage