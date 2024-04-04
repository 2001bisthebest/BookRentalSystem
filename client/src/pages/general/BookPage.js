import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const BookPage = () => {
    const [book, setBook] = useState({})
    const [bookCopy, setBookCopy] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        loadData()
    }, [id])
    const loadData = async () => {
        await axios.get(process.env.REACT_APP_API + '/showbookinfo/' + id)
            .then(res => {
                setBook(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
        await axios.get(process.env.REACT_APP_API + '/listbookcopy/' + id)
            .then(res => {
                setBookCopy(res.data)
                console.log(res)
            })
            .catch(err => console.log(err))
    }
    const checkStatus = () => {
        return bookCopy.every(item => item.status === true)
    }
    const reserving = () => {
        navigate('/reservation/' + id)
    }
    return (
        <div className="w-full h-full grow py-20 flex flex-col justify-start gap-10 bg-white-bg">
            <div className='place-self-start px-20'>
                <h1 className='font-bold text-3xl'>{book.title}</h1>
            </div>
            <div className='flex items-center gap-20 px-20'>
                <img src={process.env.REACT_APP_IMG + '/' + book.file} className='w-60 h-60 rounded-lg' />
                <div className='flex flex-col justify-center items-start gap-2'>
                    <p>รายละเอียดหนังสือ : </p>
                    <div className='grid grid-cols-2 justify-items-start gap-1 px-2'>
                        <p>ชื่อผู้แต่ง :</p>
                        <p>{book.title}</p>
                        <p>ชื่อผู้แปล :</p>
                        <p>{book.translator}</p>
                        <p>สำนักพิมพ์ :</p>
                        <p>{book.publisher}</p>
                        <p>ปีที่พิมพ์ :</p>
                        <p>{book.year}</p>
                        <p>ราคาเช่า :</p>
                        <p>{book.price}</p>
                        <p>สถานะ</p>
                        {checkStatus() ?
                            <div className='w-14 h-6 rounded bg-red-btn text-white drop-shadow-md px-1'>
                                <p>ไม่ว่าง</p>
                            </div>
                            :
                            <div className='w-12 h-6 rounded bg-green-btn text-white drop-shadow-md'>
                                <p>ว่าง</p>
                            </div>}
                    </div>
                </div>
                <div className='self-end'>
                    {checkStatus() ?
                        <button type='button' className='bg-light-purple text-white rounded px-2 drop-shadow-md opacity-75' onClick={reserving} disabled>จองคิว</button>
                        :
                        <button type='button' className='bg-light-purple text-white rounded px-2 drop-shadow-md' onClick={reserving}>จองคิว</button>
                    }

                </div>
            </div>
            <div className='place-self-start px-20'>
                <h1 className='font-bold text-xl'>ร้านเช่า</h1>
            </div>
            <div className='flex justify-between items-center px-40'>
                <div className='flex gap-4 items-center'>
                    <div className='bg-light-gray rounded-full w-16 h-16'>pic</div>
                    <p>Store name</p>
                </div>
                <button className='bg-light-purple text-white rounded px-4 py-2 drop-shadow-md'>ดูร้าน</button>
            </div>
            <div className='place-self-center flex flex-col bg-light-purple/20 w-5/6 px-10 py-4 rounded-md gap-2'>
                <div className='place-self-start'>
                    <h1 className='font-bold text-xl'>ความคิดเห็น</h1>
                </div>
                <input className='w-full h-20 place-self-center rounded border border-black bg-white-snow/75 p-2' placeholder='รีวิวที่นี่...' />
                <button className='self-end bg-light-purple text-white rounded px-4 py-1 drop-shadow-md'>แสดงความคิดเห็น</button>
                <div className='flex flex-col items-start gap-6'>
                    <p>User 1: eiieieiei</p>
                </div>
            </div>
        </div>
    )
}

export default BookPage