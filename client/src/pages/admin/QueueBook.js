import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import CancelSVG from '../../SVG/CancelSVG'

const QueueBook = () => {
    const [book, setBook] = useState({})
    const [bookCopy, setBookCopy] = useState([])
    const [queue, setQueue] = useState([])
    const bookId = useParams()
    const { user } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    useEffect(() => {
        loadData()
    }, [bookId])

    const loadData = async () => {
        await axios.get(process.env.REACT_APP_API + '/showbookinfo/' + bookId.id)
            .then(res => {
                setBook(res.data)
            })
            .catch(err => console.log(err))
        await axios.get(process.env.REACT_APP_API + '/listbookcopy/' + bookId.id)
            .then(res => {
                setBookCopy(res.data)
            })
            .catch(err => console.log(err))
        await axios.get(process.env.REACT_APP_API + '/listqueue/' + bookId.id)
            .then(res => {
                setQueue(res.data)
            })
            .catch(err => console.log(err))
    }
    // const dayLength = []
    // queue.map((item) => {
    //     let start = new Date(item.startDate)
    //     let end = new Date(item.endDate)
    //     const days = Math.floor((end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000));
    //     console.log(days)
    //     let data = {
    //         id: item._id,
    //         days: days
    //     }
    //     dayLength.push(data)
    // })
    // const checkEquals = (idA, idB) => {
    //     return idA.equals(idB)
    // }

    const dateFormat = (date) => {
        let newDate = new Date(date)
        let year = newDate.getFullYear()
        let month = newDate.getMonth() + 1
        let day = newDate.getDate()
        let result
        if (month < 10) {
            result = `${day}/0${month}/${year}`
        } else {
            result = `${day}/${month}/${year}`
        }
        return result
    }
    const [isOpenCancel, setIsOpenCancel] = useState(false)
    const openModalCancel = () => {
        setIsOpenCancel(!isOpenCancel)
    }
    const [isOpenConfirm, setIsOpenConfirm] = useState(false)
    const openModalConfirm = () => {
        setIsOpenConfirm(!isOpenConfirm)
    }
    const onClickConfirmQueue = async (id) => {
        await axios.post(process.env.REACT_APP_API + '/addorder/' + id, {}, {
            headers: {
                authtoken: user.token
            }
        })
            .then(res => {
                setIsOpenConfirm(false)
                window.location.reload()
            })
            .catch(err => console.log(err))
    }
    const onClickCancelQueue = async (id) => {
        await axios.delete(process.env.REACT_APP_API + '/cancelqueue/' + id, {
            headers: {
                authtoken: user.token
            }
        })
            .then(res => {
                setIsOpenCancel(false)
                window.location.reload()
            })
            // navigate('/queuebookadmin/' + bookIdString)
            .catch(err => console.log(err))
    }

    return (
        <div className="relative w-full h-full grow py-20 border flex flex-col justify-start gap-10 bg-white-bg px-24">
            <h1 className='self-start font-bold text-lg'>คิวหนังสือ {book.title}</h1>
            <div className='flex gap-5 lg:gap-10'>
                <div className='w-28 h-28 lg:w-36 lg:h-36 flex justify-center'>
                    <img className='h-full rounded-lg' src={process.env.REACT_APP_IMG + '/' + book.file} />
                </div>

                <div className='h-1/2 grid grid-cols-2 gap-1 lg:gap-2 justify-items-start'>
                    <p className='col-span-full font-semibold'>{book.title}</p>
                    <p>สำเนาหนังสือ</p>
                    <p>{bookCopy.length} เล่ม</p>
                </div>
            </div>
            <div className='grid grid-cols-5 text-sm border rounded-md border-light-purple gap-2 py-2'>
                <p className='font-semibold'>วันที่และเวลา</p>
                <p className='font-semibold'>สำเนาหนังสือเล่มที่</p>
                <p className='font-semibold'>ชื่อผู้ใช้ที่จอง</p>
                <p className='font-semibold'>ช่วงระยะเวลาเช่า</p>
                <p className='font-semibold'>ยืนยันการจอง</p>
                <hr className='col-span-full border-light-purple' />
                {queue.length > 0 ? queue.map((item) => (
                    <div className='col-span-full w-full h-full grid grid-cols-5 text-sm rounded-md gap-2 py-2' key={item._id}>
                        <p>{dateFormat(item.createdAt)}</p>
                        <p>{item.CopyId.copyNumber}</p>
                        <p>{item.AccId.username}</p>
                        <p>{dateFormat(item.startDate)} - {dateFormat(item.endDate)}</p>
                        <div className='flex flex-col lg:flex-row gap-2 text-white justify-center lg:px-0 px-2'>
                            <button className='bg-light-purple px-2 rounded-md' onClick={openModalConfirm}>ยืนยัน</button>
                            <button type='button' className='bg-red-btn px-2 rounded-md' onClick={openModalCancel}>ยกเลิก</button>
                        </div>
                        {isOpenCancel ?
                            <div className='absolute flex flex-col gap-5 p-5 w-1/2 lg:w-1/3 h-1/3 bg-white-snow border border-dark-purple inset-y-1/2 inset-x-1/2 -translate-y-1/2 -translate-x-1/2 rounded-lg'>
                                <button type='button' className='self-end' onClick={openModalCancel}>
                                    <CancelSVG />
                                </button>
                                <p className='text-lg font-semibold'>คุณต้องการที่จะยกเลิกคิวนี้ ?</p>
                                <div className='flex gap-4 justify-center text-white h-1/5'>
                                    <button className='bg-red-btn px-2 rounded-md' onClick={(id) => onClickCancelQueue(item._id)}>ยืนยัน</button>
                                    <button className='bg-light-purple px-2 rounded-md' onClick={openModalCancel}>ยกเลิก</button>
                                </div>
                            </div> : ''}
                        {isOpenConfirm ?
                            <div className='absolute flex flex-col gap-5 p-5 w-1/2 lg:w-1/3 h-1/3 bg-white-snow border border-dark-purple inset-y-1/2 inset-x-1/2 -translate-y-1/2 -translate-x-1/2 rounded-lg'>
                                <button type='button' className='self-end' onClick={openModalConfirm}>
                                    <CancelSVG />
                                </button>
                                <p className='text-lg font-semibold'>คุณต้องการยืนยันคิวเพื่อเพิ่มไปยังออร์เดอร์หรือไม่?</p>
                                <div className='flex gap-4 justify-center text-white h-1/5'>
                                    <button className='bg-light-purple px-2 rounded-md' onClick={(id) => onClickConfirmQueue(item._id)}>ยืนยัน</button>
                                    <button className='bg-red-btn px-2 rounded-md' onClick={openModalConfirm}>ยกเลิก</button>
                                </div>
                            </div> : ''}
                    </div>
                )) : <p className='col-span-full w-full h-full'>ยังไม่มีคิว</p>}
            </div>
        </div>
    )
}

export default QueueBook