import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// import currentAdmin from '../../functions/auth'
import { useSelector } from 'react-redux'

const OrderReturn = () => {
    const orderId = useParams()
    const [order, setOrder] = useState({})
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    // const [admin, setAdmin] = useState({})
    const { admin } = useSelector(state => state.admin)

    useEffect(() => {
        loadData()
    }, [orderId.id])
    const loadData = async () => {
        try {
            let orderResponse = await axios.get(process.env.REACT_APP_API + '/orderforreturn/' + orderId.id, {
                headers: {
                    authtoken: token
                }
            })
            setOrder(orderResponse.data)
            // let adminResponse = currentAdmin()
            // setOrder(orderResponse.data)
            console.log(order)
        } catch (err) {
            console.log(err)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let orderResponse = await axios.put(process.env.REACT_APP_API + '/confirmordercomplete/' + orderId.id, {}, {
                headers: {
                    authtoken: token
                }
            })
            console.log(orderResponse)
            navigate('/statusbookadmin/' + admin.id)
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
        <div className="w-full h-full grow py-20 border flex flex-col justify-start gap-10 bg-white-bg" >
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
            {order.shippingFromCustomerDate != null && order.trackNumberFromCustomer != null && order.shippingNameFromCustomer != null ?
                <div className='grid grid-cols-4 justify-items-start px-20 gap-4'>
                    <p>วันที่และเวลา</p>
                    <p className='col-span-3'>{dateFormat(order.createdAt)}</p>
                    <p>ชื่อผู้ใช้ที่เช่า</p>
                    <p className='col-span-3'>{order.accUsername}</p>
                    <p>ช่วงระยะเวลาเช่า</p>
                    <p className='col-span-3'>{dateFormat(order.startDate) + ' - ' + dateFormat(order.endDate)}</p>
                    <h1 className='col-span-full font-semibold'>การจัดส่งจากร้านค้า</h1>
                    <div className='col-span-full grid grid-cols-4 px-10 justify-items-start gap-2'>
                        <p>วันที่จัดส่ง</p>
                        <p className='col-span-3'>{dateFormat(order.shippingFromStoreDate)}</p>
                        <p>กรอกเลขแทร็ก</p>
                        <p className='col-span-3'>{order.trackNumberFromStore}</p>
                        <p>บริษัทขนส่ง</p>
                        <p className='col-span-3'>{order.shippingNameFromStore}</p>
                    </div>
                    <h1 className='col-span-full font-semibold'>การจัดส่งคืนจากผู้เช่า</h1>
                    <div className='col-span-full grid grid-cols-4 px-10 justify-items-start gap-2'>
                        <p>วันที่จัดส่ง</p>
                        <p className='col-span-3'>{order.shippingFromCustomerDate ? dateFormat(order.shippingFromCustomerDate) : ''}</p>
                        <p>กรอกเลขแทร็ก</p>
                        <p className='col-span-3'>{order.trackNumberFromCustomer ? order.trackNumberFromCustomer : ''}</p>
                        <p>บริษัทขนส่ง</p>
                        <p className='col-span-3'>{order.shippingNameFromCustomer ? order.shippingNameFromCustomer : ''}</p>
                    </div>
                </div>
                : <div className='grid grid-cols-4 justify-items-start px-20 gap-4'>
                    <p>วันที่และเวลา</p>
                    <p className='col-span-3'>{dateFormat(order.createdAt)}</p>
                    <p>ชื่อผู้ใช้ที่เช่า</p>
                    <p className='col-span-3'>{order.accUsername}</p>
                    <p>ช่วงระยะเวลาเช่า</p>
                    <p className='col-span-3'>{dateFormat(order.startDate) + ' - ' + dateFormat(order.endDate)}</p>
                    <h1 className='col-span-full font-semibold'>การจัดส่งจากร้านค้า</h1>
                    <div className='col-span-full grid grid-cols-4 px-10 justify-items-start gap-2'>
                        <p>วันที่จัดส่ง</p>
                        <p className='col-span-3'>{dateFormat(order.shippingFromStoreDate)}</p>
                        <p>กรอกเลขแทร็ก</p>
                        <p className='col-span-3'>{order.trackNumberFromStore}</p>
                        <p>บริษัทขนส่ง</p>
                        <p className='col-span-3'>{order.shippingNameFromStore}</p>
                    </div>
                </div>}
            {order.shippingFromCustomerDate != null && order.trackNumberFromCustomer != null && order.shippingNameFromCustomer != null ?
                <form onSubmit={handleSubmit} className='self-center flex flex-col gap-2 items-center'>
                    <p>กด "ยืนยัน" หากได้รับหนังสือคืนสำเร็จ</p>
                    <button type='submit' className='bg-light-purple px-2 py-1 text-white rounded-md w-16'>ยืนยัน</button>
                </form> : ''}
        </div>
    )
}

export default OrderReturn