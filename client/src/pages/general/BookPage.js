import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { currentUser } from '../../functions/auth'

const BookPage = () => {
    const [book, setBook] = useState({})
    const [bookCopy, setBookCopy] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()
    const [review, setReview] = useState([])
    const [form, setForm] = useState({})
    const token = localStorage.getItem('token')
    const [user, setUser] = useState(null)
    const [checkPermissionToReview, setCheckPermissionToReview] = useState(false)
    const [store, setStore] = useState({})
    useEffect(() => {
        if (token) {
            currentUser(token).then(res => setUser(res.data)).catch(err => console.log(err))
        }
        loadData()
    }, [id])
    const loadData = async () => {
        try {
            let bookResponse = await axios.get(process.env.REACT_APP_API + '/showbookinfo/' + id)
            setBook(bookResponse.data)
            let bookCopyResponse = await axios.get(process.env.REACT_APP_API + '/listbookcopy/' + id)
            setBookCopy(bookCopyResponse.data)
            let reviewResponse = await axios.get(process.env.REACT_APP_API + '/listreview/' + id)
            setReview(reviewResponse.data)
            if (user != null) {
                let permissionResponse = await axios.post(process.env.REACT_APP_API + '/checkpermissiontoreview/' + id, { accId: user._id }, {
                    headers: {
                        authtoken: token
                    }
                })
                setCheckPermissionToReview(permissionResponse.data)
            }
            let storeResponse = await axios.get(process.env.REACT_APP_API + '/storeinfofrombook/' + id)
            setStore(storeResponse.data)
            console.log(storeResponse.data)
        } catch (err) {
            console.log(err)
        }
    }
    const checkStatus = () => {
        return bookCopy.every(item => item.status === true)
    }
    const reserving = () => {
        navigate('/reservation/' + id)
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
        console.log(form)
    }
    console.log(checkPermissionToReview)
    const handleSubmit = async (e) => {
        const formResult = {
            AccId: user._id,
            comment: form.comment
        }
        try {
            let reviewResponse = await axios.post(process.env.REACT_APP_API + '/addreview/' + id, formResult, {
                headers: {
                    authtoken: token
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="w-full h-full grow py-20 flex flex-col justify-start gap-10 bg-white-bg">
            <div className='place-self-start px-20'>
                <h1 className='font-bold text-3xl'>{book.title}</h1>
            </div>
            <div className='flex flex-col lg:flex-row items-center gap-20 px-20'>
                <div className='w-60 h-60 rounded-lg flex justify-center'>
                    <img src={process.env.REACT_APP_IMG + '/' + book.file} className='h-full rounded-lg drop-shadow-md' />
                </div>
                <div className='flex flex-col justify-center items-start gap-2'>
                    <p>รายละเอียดหนังสือ</p>
                    <div className='grid grid-cols-4 justify-items-start gap-1 px-2'>
                        <p>ชื่อผู้แต่ง :</p>
                        <p className='col-span-3'>{book.title}</p>
                        <p>ชื่อผู้แปล :</p>
                        <p className='col-span-3'>{book.translator}</p>
                        <p>สำนักพิมพ์ :</p>
                        <p className='col-span-3'>{book.publisher}</p>
                        <p>ปีที่พิมพ์ :</p>
                        <p className='col-span-3'>{book.year}</p>
                        <p>ราคาเช่า :</p>
                        <p className='col-span-3'>{book.price}</p>
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
                    <div className='rounded-full w-16 h-16'><img className='w-full h-full rounded-full' src={process.env.REACT_APP_IMG + '/' + store.file} /></div>
                    <p>{store.name}</p>
                </div>
                <button className='bg-light-purple text-white rounded px-4 py-2 drop-shadow-md'>ดูร้าน</button>
            </div>
            <div className='place-self-center flex flex-col bg-light-purple/20 w-5/6 px-10 py-5 rounded-md gap-5'>
                <form className='w-full flex flex-col gap-5' onSubmit={handleSubmit}>
                    <h1 className='place-self-start font-bold text-xl'>ความคิดเห็น</h1>
                    {user != null && checkPermissionToReview != false ? <input type='text' className='w-full h-20 place-self-center rounded border border-black bg-white-snow/75 p-2' name='comment' placeholder='รีวิวที่นี่...' onChange={e => handleChange(e)} /> : <input type='text' className='w-full h-20 place-self-center rounded border border-black bg-white-snow/75 p-2' name='review' placeholder='คุณต้องเข้าสู่ระบบ' onChange={e => handleChange(e)} disabled />}
                    <button className='self-end bg-light-purple text-white rounded px-4 py-1 drop-shadow-md' type='submit'>แสดงความคิดเห็น</button>
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