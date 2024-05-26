import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const StatusBook = () => {
    const adminId = useParams()
    const [orderForCheck, setOrderForCheck] = useState([])
    const [orderForShipping, setOrderForShipping] = useState([])
    const [orderForReturn, setOrderForReturn] = useState([])
    // const { user } = useSelector((state) => state.user)
    const token = localStorage.getItem('token')
    // useEffect(() => {
    //     loadDataAdmin()
    // }, [user.id])
    useEffect(() => {
        loadDataOrder()
    }, [adminId.id])
    // const loadDataAdmin = async () => {
    //     try {
    //         let currentAdmin = currentAdmin(token, user.username)
    //         setAdmin(currentAdmin.data)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
    const loadDataOrder = async () => {
        try {
            let orderCheck = await axios.get(process.env.REACT_APP_API + '/listorderforcheckpayment/' + adminId.id, {
                headers: {
                    authtoken: token
                }
            })
            setOrderForCheck(orderCheck.data)
            console.log(orderCheck)
            let orderShip = await axios.get(process.env.REACT_APP_API + '/listorderforshipping/' + adminId.id, {
                headers: {
                    authtoken: token
                }
            })
            setOrderForShipping(orderShip.data)
            console.log(orderForShipping)
            let orderReturn = await axios.get(process.env.REACT_APP_API + '/listbookforreturn/' + adminId.id, {
                headers: {
                    authtoken: token
                }
            })
            setOrderForReturn(orderReturn.data)
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
    return (
        <div className="w-full h-screen grow py-20 border flex flex-col justify-start gap-10 bg-white-bg">
            <div className='w-full flex flex-col gap-5 px-20'>
                <h1 className='self-start font-semibold'>ยอดที่ต้องตรวจสอบ</h1>
                <div className='border rounded-md border-light-purple'>
                    <div className='grid grid-cols-5 text-sm  gap-2 py-2'>
                        <p className='font-semibold'>วันที่และเวลา</p>
                        <p className='font-semibold'>รายการหนังสือ</p>
                        <p className='font-semibold'>ชื่อผู้ใช้</p>
                        <p className='font-semibold'>สถานะการชำระเงิน</p>
                        <p className='font-semibold'>จัดส่งภายในวันที่</p>
                        <hr className='col-span-full border-light-purple' />
                    </div>
                    {orderForCheck.length > 0 ? orderForCheck.map(item => (
                        <a href={'/orderforcheck/' + item.orderId} className='grid grid-cols-5 text-sm gap-2 py-2'>
                            <p className='font-semibold'>{dateFormat(item.updatedAt)}</p>
                            <p className='font-semibold'>{item.title}</p>
                            <p className='font-semibold'>{item.accUsername}</p>
                            {item.statusOrder === 'WaitForPaid' ? <p className='font-semibold'>ยังไม่ชำระเงิน</p> : <p className='font-semibold'>ชำระเงินแล้ว</p>}
                            <p className='font-semibold'>{dateFormat(item.shippingDate)}</p>
                        </a>))
                        : <p className='col-span-full'>ยังไม่มีรายการที่ต้องตรวจสอบ</p>}
                </div>
            </div>
            <div className='w-full flex flex-col gap-5 px-20'>
                <h1 className='self-start font-semibold'>หนังสือที่ต้องจัดส่ง</h1>
                <div className='border rounded-md border-light-purple'>
                    <div className='grid grid-cols-5 text-sm  gap-2 py-2'>
                        <p className='font-semibold'>วันที่และเวลา</p>
                        <p className='font-semibold'>รายการหนังสือ</p>
                        <p className='font-semibold'>ชื่อผู้ใช้</p>
                        <p className='font-semibold'>สถานะการการจัดส่ง</p>
                        <p className='font-semibold'>จัดส่งภายในวันที่</p>
                        <hr className='col-span-full border-light-purple' />
                    </div>
                    {orderForShipping.length > 0 ? orderForShipping.map(item => (
                        <a href={'/orderforshipping/' + item.orderId} className='grid grid-cols-5 text-sm gap-2 py-2'>
                            <p className='font-semibold'>{dateFormat(item.updatedAt)}</p>
                            <p className='font-semibold'>{item.title}</p>
                            <p className='font-semibold'>{item.accUsername}</p>
                            {item.statusOrder === 'Shipped' ? <p className='font-semibold'>จัดส่งแล้ว</p> : <p className='font-semibold'>รอการจัดส่ง</p>}
                            <p className='font-semibold'>{dateFormat(item.shippingDate)}</p>
                        </a>))
                        : <p className='col-span-full'>ยังไม่มีรายการที่ต้องจัดส่ง</p>}
                </div>
            </div>
            <div className='w-full flex flex-col gap-5 px-20'>
                <h1 className='self-start font-semibold'>หนังสือที่ต้องได้รับคืน</h1>
                <div className='border rounded-md border-light-purple'>
                    <div className='grid grid-cols-5 text-sm  gap-2 py-2'>
                        <p className='font-semibold'>วันที่และเวลา</p>
                        <p className='font-semibold'>รายการหนังสือ</p>
                        <p className='font-semibold'>ชื่อผู้ใช้</p>
                        <p className='font-semibold'>วันสุดท้ายของการเช่า</p>
                        <p className='font-semibold'>สถานะการส่งคืน</p>
                        <hr className='col-span-full border-light-purple' />
                    </div>
                    {orderForReturn.length > 0 ? orderForReturn.map(item => (
                        <a href={'/orderforreturn/' + item.orderId} className='grid grid-cols-5 text-sm gap-2 py-2'>
                            <p className='font-semibold'>{dateFormat(item.updatedAt)}</p>
                            <p className='font-semibold'>{item.title}</p>
                            <p className='font-semibold'>{item.accUsername}</p>
                            <p className='font-semibold'>{dateFormat(item.endDate)}</p>
                            {item.statusOrder === 'Returned' ? <p className='font-semibold'>ส่งคืนแล้ว</p> : <p className='font-semibold'>ยังไม่ส่งคืน</p>}
                        </a>))
                        : <p className='col-span-full'>ยังไม่มีรายการที่ต้องตรวจสอบ</p>}
                </div>
            </div>
        </div>
    )
}

export default StatusBook