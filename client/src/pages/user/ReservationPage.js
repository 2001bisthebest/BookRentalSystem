import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Datepicker from "react-tailwindcss-datepicker";

const ReservationPage = () => {
    const [book, setBook] = useState({})
    const [bookCopy, setBookCopy] = useState([])
    const { id } = useParams()
    const [value, setValue] = useState({
        startDate: new Date(),
        endDate: new Date().setMonth(11)
    });
    const navigate = useNavigate()
    const { user } = useSelector((state) => ({ ...state }))
    console.log(value)
    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue);
        setValue(newValue);
    }

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
    const queueReserveCreate = async (value) => {
        await axios.put(process.env.REACT_APP_API + '/createqueue/' + id, value)
            // { startDate: value.startDate, endDate: value.endDate }
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
        navigate('/cart/' + user.id)
    }
    return (
        <div className="w-full h-full grow py-8 flex flex-col justify-start gap-10 bg-white-bg">
            <div className='place-self-start px-20'>
                <h1 className='font-bold text-3xl'>{book.title}</h1>
            </div>
            <div className='flex justify-start items-center gap-20 px-24'>
                <div className='bg-light-gray w-60 h-60 rounded-lg '>
                </div>
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
            </div>
            <div className='place-self-start px-20'>
                <h1 className='font-bold text-xl'>เลือกวันเวลาที่ต้องการจอง</h1>
            </div>
            <div className='grid grid-cols-2 justify-items-start px-24 gap-5'>
                <Datepicker
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