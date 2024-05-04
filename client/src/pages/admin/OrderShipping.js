import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Datepicker from "react-tailwindcss-datepicker";

const OrderShipping = () => {
    const [order, setOrder] = useState({})
    const orderId = useParams()
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { admin } = useSelector(state => state.admin)
    const [form, setForm] = useState({})
    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });
    const handleValueChange = (newValue) => {
        setValue(newValue);
    }
    useEffect(() => {
        loadData()
    }, [orderId.id])
    const loadData = async () => {
        try {
            let orderResponse = await axios.get(process.env.REACT_APP_API + '/orderforshipping/' + orderId.id, {
                headers: {
                    authtoken: token
                }
            })
            console.log(orderResponse.data)
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
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formResult = {
            shippingFromStoreDate: value.startDate,
            trackNumberFromStore: form.trackNumberFromStore,
            shippingNameFromStore: form.shippingNameFromStore
        }
        try {
            let orderResponse = await axios.post(process.env.REACT_APP_API + '/addshippingday/' + orderId.id, formResult, {
                headers: {
                    authtoken: token
                }
            })
            setOrder(orderResponse.data)
            navigate('/statusbookadmin/' + admin.id)
        } catch (err) {
            console.log(err)
        }
    }
    console.log(order)
    return (
        <form onSubmit={handleSubmit} className="w-full h-full grow py-20 border flex flex-col justify-start gap-10 bg-white-bg" >
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
            {order.statusOrder === 'WaitForShipping' ?
                <div className='flex flex-col gap-10 w-full'>
                    <div className='grid grid-cols-4 justify-items-start place-items-center px-20 gap-4'>
                        <p>วันที่และเวลา</p>
                        <p className='col-span-3'>{dateFormat(order.createdAt)}</p>
                        <p>ชื่อผู้ใช้ที่จอง</p>
                        <p className='col-span-3'>{order.accUsername}</p>
                        <p>ช่วงระยะเวลาจอง</p>
                        <p className='col-span-3'>{dateFormat(order.startDate) + ' - ' + dateFormat(order.endDate)}</p>
                        <p>ต้องจัดส่งภายในวันที่</p>
                        <p className='col-span-3'>{dateFormat(order.shippingDate)}</p>
                        <p>วันที่จัดส่ง</p>
                        <div className='col-span-3'>
                            <Datepicker
                                asSingle={true}
                                value={value}
                                onChange={handleValueChange}
                            />
                        </div>
                        <p>กรอกเลขแทร็ก</p>
                        <input name='trackNumberFromStore' className='col-span-3 border border-light-purple rounded-md px-2 py-1 focus:outline-none' type='text' onChange={e => handleChange(e)} />
                        <p>กรอกชื่อบริษัทขนส่ง</p>
                        <select name='shippingNameFromStore' className='col-span-3 border border-light-purple rounded-md px-2 py-1 focus:outline-none' onChange={e => handleChange(e)}>
                            <option value="none">เลือกบริษัทขนส่ง</option>
                            <option value="Kerry Express">Kerry Express</option>
                            <option value="J&T EXPRESS">J&T EXPRESS</option>
                            <option value="FLASH EXPRESS">FLASH EXPRESS</option>
                            <option value="BEST EXPRESS">BEST EXPRESS</option>
                            <option value="SCG EXPRESS">SCG EXPRESS</option>
                            <option value="NINJA VAN">NINJA VAN</option>
                            <option value="ThaiPost">ไปรษณีย์ไทย</option>
                            <option value="DHL EXPRESS">DHL EXPRESS</option>
                        </select>
                    </div>
                    <div className='self-center flex gap-2'>
                        <button type='submit' className='bg-light-purple px-2 py-1 text-white rounded-md'>ยืนยัน</button>
                    </div>
                </div>
                :
                <div className='grid grid-cols-4 justify-items-start place-items-center px-20 gap-4'>
                    <p>วันที่และเวลา</p>
                    <p className='col-span-3'>{dateFormat(order.createdAt)}</p>
                    <p>ชื่อผู้ใช้ที่จอง</p>
                    <p className='col-span-3'>{order.accUsername}</p>
                    <p>ช่วงระยะเวลาจอง</p>
                    <p className='col-span-3'>{dateFormat(order.startDate) + ' - ' + dateFormat(order.endDate)}</p>
                    <p>ต้องจัดส่งภายในวันที่</p>
                    <p className='col-span-3'>{dateFormat(order.shippingDate)}</p>
                    <p>วันที่จัดส่ง</p>
                    <p className='col-span-3'>{dateFormat(order.shippingFromStoreDate)}</p>
                    <p>กรอกเลขแทร็ก</p>
                    <p className='col-span-3'>{order.trackNumberFromStore}</p>
                    <p>กรอกชื่อบริษัทขนส่ง</p>
                    <p className='col-span-3'>{order.shippingNameFromStore}</p>
                </div>
            }
        </form>
    )
}

export default OrderShipping