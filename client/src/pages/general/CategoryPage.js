import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const CategoryPage = () => {
    const [dataCategory, setCategory] = useState([])
    const [book, setBook] = useState([])
    const { category } = useParams()

    useEffect(() => {
        loadData()
        dataCategory.map((item) => {
            console.log('item', item.bookId)
            setBook(item.bookId)
            console.log('book', book)
        })
    }, [category])
    const loadData = async () => {
        await axios.get(`${process.env.REACT_APP_API}/listcategoryofbook?category=${category}`)
            .then(res => {
                setCategory(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }
    // console.log(dataCategory)
    // useEffect(() => {

    // }, [book])

    return (
        <div className="w-full h-screen grow py-20 border flex flex-col justify-start gap-4 bg-white-bg">
            <div>
                <p className='flex justify-start px-20 text-2xl font-bold'>{category}</p>
            </div>
            <div className='px-20 py-5'>
                <div className='w-full h-full flex flex-row gap-10 justify-items-stretch items-center flex-nowrap'>
                    {dataCategory ? dataCategory.map(item =>
                        <div className='flex flex-col gap-4 items-center'>
                            <div className='relative w-40 h-40'>
                                <div className='absolute top-2 right-2 w-12 h-6 rounded bg-green-btn text-white drop-shadow-md z-40'>
                                    <p>ว่าง</p>
                                </div>
                                <a href={`/book/${item.bookId._id}`} className='w-full h-full'>{item.bookId.file ? <img src={process.env.REACT_APP_IMG + "/" + item.bookId.file} className='w-full h-full rounded-lg drop-shadow-md'></img> : ""}</a>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <p className='font-semibold'>{item.bookId.title}</p>
                                <p>{item.bookId.price} บาท</p>
                            </div>
                        </div>
                    )
                        :
                        <div className='flex flex-col gap-2'>
                            <p>ยังไม่มีหนังสือในหมวดนี้</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default CategoryPage