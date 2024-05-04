import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SearchPage = () => {
    const param = useParams()
    console.log(param)
    const [book, setBook] = useState([])
    useEffect(() => {
        loadData()
    }, [param.search])
    const loadData = async () => {
        await axios.get(process.env.REACT_APP_API + `/searchbook?name=${param.search}`)
            .then(res => setBook(res.data))
            .catch(err => console.log(err))
    }
    return (
        <div className="w-full h-full grow py-20 border flex flex-col justify-start gap-4 bg-white-bg">
            <p className='self-start px-20 text-2xl font-bold'>จากคำค้นหา "{param.search}"</p>
            <div className='px-20 py-5'>
                <div className='w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10'>
                    {book ? book.map(item =>
                        <div className='flex flex-col gap-4 items-center'>
                            <div className='relative w-40 h-40'>
                                {item.status ?
                                    <div className='absolute top-2 right-2 w-12 h-6 rounded bg-yellow-btn text-white drop-shadow-md z-20'>
                                        <p>รอคิว</p>
                                    </div> :
                                    <div className='absolute top-2 right-2 w-12 h-6 rounded bg-green-btn text-white drop-shadow-md z-20'>
                                        <p>ว่าง</p>
                                    </div>
                                }
                                <a href={`/book/${item._id}`} className='w-full h-full flex justify-center'>{item.file ? <img src={process.env.REACT_APP_IMG + "/" + item.file} className='h-full rounded-lg drop-shadow-md' /> : ""}</a>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <p className='font-semibold'>{item.title}</p>
                                <p>{item.price} บาท</p>
                            </div>
                        </div>
                    )
                        :
                        <div className='flex flex-col gap-2'>
                            <p>ไม่มีหนังสือ</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchPage