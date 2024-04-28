import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const OrderCheck = () => {
    const [order, setOrder] = useState({})
    const orderId = useParams()
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

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
    return (
        <div className="w-full h-full grow py-20 border flex flex-col justify-start gap-10 bg-white-bg">
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
            </div>
            <div className='self-center flex gap-2'>
                <button className='bg-light-purple px-2 py-1 text-white rounded-md' onClick={onClickConfirm}>ยืนยัน</button>
                <button className='bg-red-btn px-2 py-1 text-white rounded-md'>ยกเลิก</button>
            </div>
        </div>
    )
}

export default OrderCheck