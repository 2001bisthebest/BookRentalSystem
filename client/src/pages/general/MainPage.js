import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { currentUser } from '../../functions/auth';
import bookPhoto from '../../images/book.jpg';

function MainPage() {
    const [book, setBook] = useState([])
    const [bookReccom, setBookReccom] = useState([])
    const [user, setUser] = useState(null)
    const token = localStorage.getItem('token')
    useEffect(() => {
        loadData()
    }, [])
    useEffect(() => {
        if (user) {
            loadDataBookRec()
        }
    }, [user])
    const loadData = async () => {
        currentUser(token).then(res => setUser(res.data)).catch(err => console.log(err))
        await axios.get(process.env.REACT_APP_API + '/listnewbook')
            .then(res => {
                setBook(res.data)
            })
            .catch(err => console.log(err))
    }
    const loadDataBookRec = async () => {
        const userId = await user._id
        try {
            let bookRecResponse = await axios.get(process.env.REACT_APP_API + '/listreccomandbook/' + userId)
            setBookReccom(bookRecResponse.data)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="w-full h-full grow py-8 border flex flex-col justify-center gap-20 bg-white-bg">
            <div className='w-4/5 place-self-center overflow-hidden'>
                <img src={bookPhoto} className='w-full' />
            </div>
            <div className='flex flex-col w-full h-full px-20 items-center justify-center gap-10'>
                <p className='font-semibold lg:text-xl'>หนังสือแนะนำ</p>
                <div className='w-full h-full flex flex-cols gap-10 overflow-x-auto overflow-y-hidden'>
                    {bookReccom.length > 1 && user != null ? bookReccom.map((item) =>
                        <div className='flex flex-col gap-4 items-center w-40' key={bookReccom._id}>
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
                            <div className='flex flex-col gap-1 text-sm lg:text-base'>
                                <p className='font-semibold'>{item.title}</p>
                                <p>{item.price} บาท</p>
                            </div>
                        </div>
                    ) : <p>ยังไม่มีหนังสือแนะนำ</p>}
                </div>
                <p className='font-semibold lg:text-xl'>หนังสือใหม่</p>
                <div className='w-full h-full flex flex-cols gap-10 overflow-x-auto overflow-y-hidden'>
                    {book != null ? book.map((item) =>
                        <div className='flex flex-col gap-4 items-center w-40' key={book._id}>
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
                            <div className='flex flex-col gap-1 text-sm lg:text-base'>
                                <p className='font-semibold'>{item.title}</p>
                                <p>{item.price} บาท</p>
                            </div>
                        </div>
                    ) : <div><p>ยังไม่มีหนังสือใหม่</p></div>}
                </div>
            </div>
        </div>
    );
}

export default MainPage;