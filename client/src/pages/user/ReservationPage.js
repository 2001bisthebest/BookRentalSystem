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
        console.log(newValue)
        let startDate = new Date(newValue.startDate)
        let endDate = new Date(newValue.endDate)
        let resultDate = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
        if (resultDate >= 7) {
            setValue(newValue);
        } else {
            alert('กรุณาจอง 7 วันหรือมากกว่าเป็นต้นไป')
        }
    }
    useEffect(() => {
        loadData()
    }, [id])
    const loadData = async () => {
        try {
            let queueFullListRes = await axios.get(process.env.REACT_APP_API + '/queuefulllist/' + id)
            setQueueFullList(queueFullListRes.data)
            console.log(queueFullListRes.data)
            let bookRes = await axios.get(process.env.REACT_APP_API + '/showbookinfopopstore/' + id)
            setBook(bookRes.data)
            let bookCopyRes = await axios.get(process.env.REACT_APP_API + '/listbookcopy/' + id)
            setBookCopy(bookCopyRes.data)
        } catch (err) {
            console.log(err)
        }
    }
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
                <div className='w-60 h-60 flex justify-center'>
                    <img src={process.env.REACT_APP_IMG + '/' + book.file} className='h-full rounded-lg drop-shadow-md' />
                </div>
                <div className='flex flex-col justify-center items-start gap-2'>
                    <p>รายละเอียดหนังสือ : </p>
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