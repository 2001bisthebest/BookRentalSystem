import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const BookPage = () => {
    const [book, setBook] = useState({})
    const [bookCopy, setBookCopy] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()
    const [review, setReview] = useState([])
    useEffect(() => {
        loadData()
    }, [id])
    const loadData = async () => {
        await axios.get(process.env.REACT_APP_API + '/showbookinfo/' + id)
            .then(res => {
                setBook(res.data)
            })
            .catch(err => console.log(err))
        await axios.get(process.env.REACT_APP_API + '/listbookcopy/' + id)
            .then(res => {
                setBookCopy(res.data)
            })
            .catch(err => console.log(err))
        await axios.get(process.env.REACT_APP_API + '/listreview/' + id)
            .then(res => setReview(res.data))
            .catch(err => console.log(err))
    }
    console.log(review)
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
            <div className='flex flex-col lg:flex-row items-center gap-20 px-20'>
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
                            <div className='w-14 h-6 rounded bg-yellow-btn text-white drop-shadow-md px-1'>
                                <p>รอคิว</p>
                            </div>
                            :
                            <div className='w-12 h-6 rounded bg-green-btn text-white drop-shadow-md'>
                                <p>ว่าง</p>
                            </div>}
                    </div>
                </div>
                <div className='lg:self-end'>
                    <button type='button' className='bg-light-purple text-white rounded px-2 drop-shadow-md' onClick={reserving}>จองคิว</button>
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
            <div className='place-self-center flex flex-col bg-light-purple/20 w-5/6 px-10 py-5 rounded-md gap-5'>
                <form className='w-full flex flex-col gap-5'>
                    <h1 className='place-self-start font-bold text-xl'>ความคิดเห็น</h1>
                    <input className='w-full h-20 place-self-center rounded border border-black bg-white-snow/75 p-2' placeholder='รีวิวที่นี่...' />
                    <button className='self-end bg-light-purple text-white rounded px-4 py-1 drop-shadow-md'>แสดงความคิดเห็น</button>
                </form>
                {review && review.length > 0 ? review.map((item) =>
                    <div className='flex flex-col items-start gap-5' key={item._id}>
                        <div className='flex gap-2'>
                            <p>{item.AccId.username}:</p>
                            <p>{item.comment}</p>
                        </div>
                    </div>
                ) : 'ยังไม่มีความคิดเห็นเกี่ยวกับหนังสือเล่มนี้'}

            </div>
        </div>
    )
}

export default BookPage