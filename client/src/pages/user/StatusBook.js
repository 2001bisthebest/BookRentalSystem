import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CancelSVG from '../../SVG/CancelSVG';
import { currentUser } from '../../functions/auth';

const StatusBook = ({ initialStatus }) => {
    const [status, setStatus] = useState(initialStatus)
    const [user, setUser] = useState({})
    const [reserved, setReserved] = useState([])
    const [waitForPayment, setWaitForPayment] = useState([])
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const [isOpenCancel, setIsOpenCancel] = useState(false)
    const openModalCancel = () => {
        setIsOpenCancel(!isOpenCancel)
    }
    const onClickStatus = (e) => {
        setStatus(e.target.name)
        navigate(`/status/${e.target.name}`);
    }
    useEffect(() => {
        loadData()
    }, [user._id])
    const loadData = async () => {
        currentUser(token).then(res => setUser(res.data)).catch(err => console.log(err))
        await axios.get(process.env.REACT_APP_API + '/listqueueforuser/' + user._id, {
            headers: {
                authtoken: token
            }
        })
            .then(res => {
                setReserved(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
        await axios.get(process.env.REACT_APP_API + '/listorderuser/' + user._id, {
            headers: {
                authtoken: token
            }
        })
            .then(res => {
                setWaitForPayment(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }
    const onClickCancelQueue = async (id) => {
        await axios.delete(process.env.REACT_APP_API + '/cancelqueue/' + id, {
            headers: {
                authtoken: token
            }
        })
            .then(res => {
                setIsOpenCancel(false)
                window.location.reload()
            })
            // navigate('/queuebookadmin/' + bookIdString)
            .catch(err => console.log(err))
    }
    const onClickCancelOrder = async (id) => {
        await axios.delete(process.env.REACT_APP_API + '/cancelqueue/' + id, {
            headers: {
                authtoken: token
            }
        })
            .then(res => {
                setIsOpenCancel(false)
                window.location.reload()
            })
            // navigate('/queuebookadmin/' + bookIdString)
            .catch(err => console.log(err))
    }
    const onClickCart = (id) => {
        navigate('/cart/' + id)
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
    const renderContent = () => {
        switch (status) {
            case "reserved":
                return (
                    <div className='relative w-full h-full'>
                        {reserved && reserved.length > 0 ? reserved.map((item) =>
                            <div className='flex flex-col gap-5 w-full px-20 lg:px-32 pb-10 xl:pb-20'>
                                <div className='flex w-full justify-between'>
                                    <div className='flex gap-5'>
                                        <div className='w-24 h-24 lg:w-32 lg:h-32 rounded-lg flex justify-center'>
                                            <img className='h-full rounded-lg drop-shadow-md' src={process.env.REACT_APP_IMG + '/' + item.BookId.file} />
                                        </div>
                                        <div className='flex flex-col gap-1 lg:gap-2 items-start'>
                                            <p className='font-semibold'>{item.BookId.title}</p>
                                            <p>{item.StoreId.name}</p>
                                            <p>{dateFormat(item.startDate) + ' - ' + dateFormat(item.endDate)}</p>
                                        </div>
                                    </div>
                                    <div className='self-center flex flex-col justify-center'>
                                        <button className='font-bold text-white bg-red-btn py-1 px-3 rounded' onClick={openModalCancel}>ยกเลิก</button>
                                    </div>
                                </div>
                                <hr className='w-1/3 self-center border-light-purple' />
                                {isOpenCancel ?
                                    <div className='absolute flex flex-col gap-5 p-5 w-1/2 lg:w-1/3 h-1/3 bg-white-snow border border-dark-purple inset-y-1/2 inset-x-1/2 -translate-y-1/2 -translate-x-1/2 rounded-lg'>
                                        <button type='button' className='self-end' onClick={openModalCancel}>
                                            <CancelSVG />
                                        </button>
                                        <p className='text-lg font-semibold'>คุณต้องการที่จะยกเลิกการจองนี้ ?</p>
                                        <div className='flex gap-4 justify-center text-white h-1/5'>
                                            <button className='bg-red-btn px-2 rounded-md' onClick={(id) => onClickCancelQueue(item._id)}>ยืนยัน</button>
                                            <button className='bg-light-purple px-2 rounded-md' onClick={openModalCancel}>ยกเลิก</button>
                                        </div>
                                    </div> : ''}
                            </div>
                        ) : <p>คุณยังไม่ได้จองหนังสือ</p>}

                    </div>
                );
            case "pending":
                return (
                    <div className='relative w-full h-full'>
                        {waitForPayment && waitForPayment.length > 0 ? waitForPayment.map((item) =>
                            <div className='flex flex-col w-full gap-5 px-20 lg:px-32 pb-10 xl:pb-20'>
                                <div className='flex w-full justify-between'>
                                    <div className='flex gap-5'>
                                        <div className='w-24 h-24 lg:w-32 lg:h-32 flex justify-center'>
                                            <img className='h-full rounded-lg drop-shadow-md' src={process.env.REACT_APP_IMG + '/' + item.file} />
                                        </div>
                                        <div className='flex flex-col gap-1 lg:gap-2 items-start'>
                                            <p className='font-semibold'>{item.title}</p>
                                            <p>{item.storeName}</p>
                                            <p>{dateFormat(item.startDate) + ' - ' + dateFormat(item.endDate)}</p>
                                            <p>ราคา {item.priceSummary} บาท</p>
                                        </div>
                                    </div>
                                    <div className='self-center flex flex-col justify-center gap-2'>
                                        <button className='font-bold text-white bg-light-purple py-1 px-3 rounded' onClick={(id) => onClickCart(item.OrderId)}>ชำระเงิน</button>
                                        <button className='font-bold text-white bg-red-btn py-1 px-3 rounded' onClick={openModalCancel}>ยกเลิก</button>
                                    </div>
                                </div>
                                <hr className='w-1/3 self-center border-light-purple' />
                                {isOpenCancel ?
                                    <div className='absolute flex flex-col gap-5 p-5 w-1/2 lg:w-1/3 h-1/3 bg-white-snow border border-dark-purple inset-y-1/2 inset-x-1/2 -translate-y-1/2 -translate-x-1/2 rounded-lg'>
                                        <button type='button' className='self-end' onClick={openModalCancel}>
                                            <CancelSVG />
                                        </button>
                                        <p className='text-lg font-semibold'>คุณต้องการที่จะยกเลิกการจองนี้ ?</p>
                                        <div className='flex gap-4 justify-center text-white h-1/5'>
                                            <button className='bg-red-btn px-2 rounded-md' onClick={(id) => onClickCancelOrder(item._id)}>ยืนยัน</button>
                                            <button className='bg-light-purple px-2 rounded-md' onClick={openModalCancel}>ยกเลิก</button>
                                        </div>
                                    </div> : ''}
                            </div>
                        ) : <p>eiei</p>}
                    </div>
                );
            case "wait-for-shipment":
                return (
                    <div className='w-full h-full'>
                        <h2>Awaiting Shipment</h2>
                        <p>Your item is ready to be shipped. Please check your shipping details.</p>
                    </div>
                );
            case "shipped":
                return (
                    <div className='w-full h-full'>
                        <h2>Shipped</h2>
                        <p>Your order has been shipped. Track your order to see the estimated delivery date.</p>
                    </div>
                );
            case "wait-for-return":
                return (
                    <div className='w-full h-full'>
                        <h2>Return Initiated</h2>
                        <p>Please return your package by the due date.</p>
                    </div>
                );
            default:
                return <h2>Status Unknown</h2>;
        }
    };
    return (
        <div className="w-full h-full xl:h-screen grow py-8 flex flex-col justify-start items-center gap-8 bg-white-bg">
            <h1 className='text-xl font-bold self-start px-20'>สถานะหนังสือ</h1>
            <div className='flex justify-center gap-5 lg:gap-10 font-bold px-10 flex-wrap'>
                <button className='focus:underline focus:underline-offset-8 focus:decoration-light-purple' name='reserved' onClick={(e) => onClickStatus(e)}>จองแล้ว</button>
                <button className='focus:underline focus:underline-offset-8 focus:decoration-light-purple' name='pending' onClick={(e) => onClickStatus(e)}>รอการชำระเงิน</button>
                <button className='focus:underline focus:underline-offset-8 focus:decoration-light-purple' name='wait-for-shipment' onClick={(e) => onClickStatus(e)}>รอการจัดส่ง</button>
                <button className='focus:underline focus:underline-offset-8 focus:decoration-light-purple' name='shipped' onClick={(e) => onClickStatus(e)}>จัดส่งแล้ว</button>
                <button className='focus:underline focus:underline-offset-8 focus:decoration-light-purple' name='wait-for-return' onClick={(e) => onClickStatus(e)}>รอการส่งคืน</button>
            </div>
            <div className='w-full'>
                {renderContent()}
            </div>
        </div>
    )
}

export default StatusBook