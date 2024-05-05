import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CancelSVG from '../../SVG/CancelSVG'

const OrderCheck = () => {
    const [order, setOrder] = useState({})
    const orderId = useParams()
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const [isOpenModal, setIsOpenModal] = useState(false)

    useEffect(() => {
        loadData()
    }, [orderId.id])
    const loadData = async () => {
        try {
            let orderResponse = await axios.get(process.env.REACT_APP_API + '/orderforcheck/' + orderId.id, {
                headers: {
                    authtoken: token
                }
            })
            setOrder(orderResponse.data)
        } catch (err) {
            console.log(err)
        }
    }
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
    const onClickConfirm = async () => {
        try {
            let confirmResponse = await axios.post(process.env.REACT_APP_API + '/orderconfirmcheck/' + orderId.id, {}, {
                headers: {
                    authtoken: token
                }
            })
            console.log(confirmResponse)
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }
    const onClickCancel = async () => {
        try {
            let concelResponse = await axios.put(process.env.REACT_APP_API + '/cancelorder/' + orderId.id, {}, {
                headers: {
                    authtoken: token
                }
            })
            console.log(concelResponse)
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }
    const openModal = () => {
        setIsOpenModal(!isOpenModal)
    }
    return (
        <div className="relative w-full h-full grow py-20 border flex flex-col justify-start gap-10 bg-white-bg">
            <h1 className='font-semibold text-2xl self-start px-20'>order</h1>
            <div className='flex px-20 gap-4'>
                <div className='w-40 h-40 xl:w-60 xl:h-60 rounded-lg flex justify-center'>
                    <img src={process.env.REACT_APP_IMG + '/' + order.bookFile} className='h-full rounded-lg drop-shadow-md' />
                </div>
                <div className='flex flex-col items-start gap-2'>
                    <p>{order.title}</p>
                    <p>สำเนาเล่มที่ {order.copyNumber}</p>
                </div>
            </div>
            {order.statusOrder === 'WaitForConfirmPaid' ?
                <div className='grid grid-cols-4 justify-items-start px-20 gap-4'>
                    <p>วันที่และเวลา</p>
                    <p className='col-span-3'>{dateFormat(order.updatedAt)}</p>
                    <p>ชื่อผู้ใช้ที่จอง</p>
                    <p className='col-span-3'>{order.accUsername}</p>
                    <p>ยอดเงินที่ได้รับ</p>
                    <p className='col-span-3'>{order.price}</p>
                    <p>จัดส่งภายในวันที่</p>
                    <p className='col-span-3'>{dateFormat(order.shippingDate)}</p>
                    <p>รูปสลิปยืนยันการโอน</p>
                    <div className='h-full flex justify-center'>
                        <img src={process.env.REACT_APP_IMG + '/' + order.file} className='h-full drop-shadow-md' />
                    </div>
                </div> :
                <div className='grid grid-cols-4 justify-items-start px-20 gap-4'>
                    <p>วันที่และเวลา</p>
                    <p className='col-span-3'>{dateFormat(order.updatedAt)}</p>
                    <p>ชื่อผู้ใช้ที่จอง</p>
                    <p className='col-span-3'>{order.accUsername}</p>
                    <p>ยอดเงินที่ได้รับ</p>
                    <p className='col-span-3'>{order.price}</p>
                    <p>จัดส่งภายในวันที่</p>
                    <p className='col-span-3'>{dateFormat(order.shippingDate)}</p>
                    <p>รูปสลิปยืนยันการโอน</p>
                    <p className='col-span-3'>ยังไม่ได้รับยืนยันการโอน</p>
                </div>
            }
            {order.statusOrder === 'WaitForConfirmPaid' ?
                <div className='self-center flex gap-2'>
                    <button className='bg-light-purple px-2 py-1 text-white rounded-md' onClick={onClickConfirm}>ยืนยัน</button>
                    <button className='bg-red-btn px-2 py-1 text-white rounded-md' onClick={openModal}>ยกเลิก</button>
                </div> :
                <div className='self-center flex gap-2'>
                    <button className='bg-red-btn px-2 py-1 text-white rounded-md' onClick={openModal}>ยกเลิก</button>
                </div>
            }
            {isOpenModal ?
                <div className='absolute flex flex-col gap-5 p-5 w-1/2 lg:w-1/3 h-fit bg-white-snow border border-dark-purple inset-y-1/2 inset-x-1/2 -translate-y-1/2 -translate-x-1/2 rounded-lg'>
                    <button type='button' className='self-end' onClick={openModal}>
                        <CancelSVG />
                    </button>
                    <p className='text-lg font-semibold'>คุณต้องการที่จะยกเลิกการจองนี้ ?</p>
                    <div className='flex gap-4 justify-center text-white h-1/5 pb-10'>
                        <button className='bg-red-btn px-2 rounded-md' onClick={onClickCancel}>ยืนยัน</button>
                        <button className='bg-light-purple px-2 rounded-md' onClick={openModal}>ยกเลิก</button>
                    </div>
                </div> : ''}
        </div>
    )
}

export default OrderCheck