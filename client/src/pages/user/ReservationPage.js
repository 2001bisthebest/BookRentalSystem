import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Datepicker from "react-tailwindcss-datepicker";

const ReservationPage = () => {
    const [book, setBook] = useState({})
    const [bookCopy, setBookCopy] = useState([])
    const { id } = useParams()
    const [queueFullList, setQueueFullList] = useState([])
    const [value, setValue] = useState({
        startDate: new Date(),
        endDate: new Date().setMonth(3)
    });
    const navigate = useNavigate()
    const { user } = useSelector((state) => (state.user))
    const handleValueChange = (newValue) => {
        setValue(newValue);
    }
    useEffect(() => {
        loadData()
        loadQueueFull()
    }, [id])
    const loadData = async () => {
        await axios.get(process.env.REACT_APP_API + '/showbookinfopopstore/' + id)
            .then(res => {
                setBook(res.data)
            })
            .catch(err => console.log(err))
        await axios.get(process.env.REACT_APP_API + '/listbookcopy/' + id)
            .then(res => {
                setBookCopy(res.data)
            })
            .catch(err => console.log(err))
    }
    const loadQueueFull = async () => {
        await axios.get(process.env.REACT_APP_API + '/queuefulllist/' + id)
            .then(res => {
                setQueueFullList(res.data)
            })
    }
    console.log(queueFullList)
    const checkStatus = () => {
        return bookCopy.every(item => item.status === true)
    }
    const queueReserveCreate = async (value) => {
        await axios.put(process.env.REACT_APP_API + '/createqueue/' + id, { AccId: user.id, startDate: value.startDate, endDate: value.endDate }, {
            headers: {
                authtoken: user.token
            }
        })
            .then(res => {
                console.log(res)
                navigate('/status/reserved')
            })
            .catch(err => {
                console.log(err)
                alert('Please select date again')
            })

    }
    return (
        <div className="w-full h-screen grow py-8 flex flex-col justify-start gap-10 bg-white-bg">
            <div className='place-self-start px-20'>
                <h1 className='font-bold text-3xl'>{book.title}</h1>
            </div>
            <div className='flex flex-col lg:flex-row justify-start items-center gap-20 px-24'>
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
            </div>
            <div className='place-self-start px-20'>
                <h1 className='font-bold text-xl'>เลือกวันเวลาที่ต้องการจอง</h1>
            </div>
            <div className='grid grid-cols-2 justify-items-start px-24 gap-5 z-40'>
                <Datepicker
                    disabledDates={queueFullList}
                    primaryColor={"purple"}
                    value={value}
                    onChange={handleValueChange}
                />
                <button type='submit' className='self-start bg-light-purple text-white rounded px-2 drop-shadow-md' onClick={() => queueReserveCreate(value)}>ยืนยัน</button>
                <p>*ขั้นต่ำ 7 วันขึ้นไป</p>
            </div>
        </div >
    )
}

export default ReservationPage