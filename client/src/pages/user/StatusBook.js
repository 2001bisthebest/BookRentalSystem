import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Datepicker from "react-tailwindcss-datepicker";
import CancelSVG from '../../SVG/CancelSVG';
import { currentUser } from '../../functions/auth';

const StatusBook = ({ initialStatus }) => {
    const [status, setStatus] = useState(initialStatus)
    const [user, setUser] = useState({})
    const [reserved, setReserved] = useState([])
    const [waitForPayment, setWaitForPayment] = useState([])
    const [waitForShipping, setWaitForShipping] = useState([])
    const [shipped, setShipped] = useState([])
    const [toReturn, setToReturn] = useState([])
    const [orderSuccess, setOrderSuccess] = useState([])
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const [isOpenModal, setIsOpenModal] = useState(false)

    const [form, setForm] = useState({})
    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });
    const handleValueChange = (newValue) => {
        setValue(newValue);
    }
    const openModal = () => {
        setIsOpenModal(!isOpenModal)
    }
    const onClickStatus = (e) => {
        setIsOpenModal(false)
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
        await axios.get(process.env.REACT_APP_API + '/listwaitforshipping/' + user._id, {
            headers: {
                authtoken: token
            }
        })
            .then(res => {
                setWaitForShipping(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
        await axios.get(process.env.REACT_APP_API + '/listshipped/' + user._id, {
            headers: {
                authtoken: token
            }
        })
            .then(res => {
                setShipped(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
        await axios.get(process.env.REACT_APP_API + '/listreturn/' + user._id, {
            headers: {
                authtoken: token
            }
        })
            .then(res => {
                setToReturn(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
        await axios.get(process.env.REACT_APP_API + '/listordersuccessuser/' + user._id, {
            headers: {
                authtoken: token
            }
        })
            .then(res => {
                setOrderSuccess(res.data)
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
                setIsOpenModal(false)
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
                setIsOpenModal(false)
                window.location.reload()
            })
            // navigate('/queuebookadmin/' + bookIdString)
            .catch(err => console.log(err))
    }
    const onClickConfirmReceiveBook = async (id) => {
        await axios.put(process.env.REACT_APP_API + '/confirmreceivebook/' + id, {}, {
            headers: {
                authtoken: token
            }
        })
            .then(res => {
                setIsOpenModal(false)
                window.location.reload()
            })
            // navigate('/queuebookadmin/' + bookIdString)
            .catch(err => console.log(err))
    }
    const onClickCart = (id) => {
        navigate('/cart/' + id)
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    }
    const handleSubmit = async (e, id) => {
        e.preventDefault()
        const formResult = {
            shippingFromCustomerDate: value.startDate,
            trackNumberFromCustomer: form.trackNumberFromCustomer,
            shippingNameFromCustomer: form.shippingNameFromCustomer
        }
        console.log(formResult)
        try {
            let orderResponse = await axios.put(process.env.REACT_APP_API + '/addreturninfo/' + id, formResult, {
                headers: {
                    authtoken: token
                }
            })
            console.log(orderResponse.data)
            // setOrder(orderResponse.data)
            // navigate('/statusbookadmin/' + admin.id)
            setIsOpenModal(false)
            window.location.reload()
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
                                        <button className='font-bold text-white bg-red-btn py-1 px-3 rounded' onClick={openModal}>ยกเลิก</button>
                                    </div>
                                </div>
                                <hr className='w-1/3 self-center border-light-purple' />
                                {isOpenModal ?
                                    <div className='absolute flex flex-col gap-5 p-5 w-1/2 lg:w-1/3 h-fit bg-white-snow border border-dark-purple inset-y-1/2 inset-x-1/2 -translate-y-1/2 -translate-x-1/2 rounded-lg'>
                                        <button type='button' className='self-end' onClick={openModal}>
                                            <CancelSVG />
                                        </button>
                                        <p className='text-lg font-semibold'>คุณต้องการที่จะยกเลิกการจองนี้ ?</p>
                                        <div className='flex gap-4 justify-center text-white h-1/5 pb-10'>
                                            <button className='bg-red-btn px-2 rounded-md' onClick={(id) => onClickCancelQueue(item._id)}>ยืนยัน</button>
                                            <button className='bg-light-purple px-2 rounded-md' onClick={openModal}>ยกเลิก</button>
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
                                    {item.fileSlip != null ?
                                        <div className='self-center flex flex-col justify-center'>
                                            <p className='font-semibold'>ชำระเงินแล้ว</p>
                                            <p>รอการตรวจสอบ</p>
                                        </div>
                                        :
                                        <div className='self-center flex flex-col justify-center gap-2'>
                                            <button className='font-bold text-white bg-light-purple py-1 px-3 rounded' onClick={(id) => onClickCart(item.OrderId)}>ชำระเงิน</button>
                                            <button className='font-bold text-white bg-red-btn py-1 px-3 rounded' onClick={openModal}>ยกเลิก</button>
                                        </div>
                                    }

                                </div>
                                <hr className='w-1/3 self-center border-light-purple' />
                                {isOpenModal ?
                                    <div className='absolute flex flex-col gap-5 p-5 w-1/2 lg:w-1/3 h-fit bg-white-snow border border-dark-purple inset-y-1/2 inset-x-1/2 -translate-y-1/2 -translate-x-1/2 rounded-lg'>
                                        <button type='button' className='self-end' onClick={openModal}>
                                            <CancelSVG />
                                        </button>
                                        <p className='text-lg font-semibold'>คุณต้องการที่จะยกเลิกการจองนี้ ?</p>
                                        <div className='flex gap-4 justify-center text-white h-1/5 pb-10'>
                                            <button className='bg-red-btn px-2 rounded-md' onClick={(id) => onClickCancelOrder(item._id)}>ยืนยัน</button>
                                            <button className='bg-light-purple px-2 rounded-md' onClick={openModal}>ยกเลิก</button>
                                        </div>
                                    </div> : ''}
                            </div>
                        ) : <p>คุณยังไม่มีรายการที่รอการชำระเงิน</p>}
                    </div>
                );
            case "wait-for-shipment":
                return (
                    <div className='relative w-full h-full'>
                        {waitForShipping && waitForShipping.length > 0 ? waitForShipping.map((item) =>
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
                                            <p>จะถูกจัดส่งภายในวันที่ {dateFormat(item.shippingDate)}</p>
                                            <p>ราคา {item.priceSummary} บาท</p>
                                        </div>
                                    </div>
                                </div>
                                <hr className='w-1/3 self-center border-light-purple' />
                            </div>
                        ) : <p>คุณยังไม่มีรายการที่รอการจัดส่ง</p>}
                    </div>
                );
            case "shipped":
                return (
                    <div className='relative w-full h-full'>
                        {shipped && shipped.length > 0 ? shipped.map((item) =>
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
                                            <p>จะถูกจัดส่งภายในวันที่ {dateFormat(item.shippingDate)}</p>
                                            <p>ราคา {item.priceSummary} บาท</p>
                                        </div>
                                    </div>
                                    <div className='self-center flex flex-col justify-center'>
                                        <button className='font-bold text-white bg-light-purple py-1 px-3 rounded' onClick={openModal}>ได้รับหนังสือแล้ว</button>
                                    </div>
                                </div>
                                <hr className='w-1/3 self-center border-light-purple' />
                                {isOpenModal ?
                                    <div className='absolute flex flex-col gap-5 p-5 w-1/2 lg:w-1/3 h-fit bg-white-snow border border-dark-purple inset-y-1/2 inset-x-1/2 -translate-y-1/2 -translate-x-1/2 rounded-lg'>
                                        <button type='button' className='self-end' onClick={openModal}>
                                            <CancelSVG />
                                        </button>
                                        <p className='text-lg font-semibold'>คุณต้องการยืนยันได้รับหนังสือแล้ว?</p>
                                        <div className='flex gap-4 justify-center text-white h-1/5 pb-10'>
                                            <button className='bg-light-purple px-2 rounded-md' onClick={(id) => onClickConfirmReceiveBook(item.OrderId)}>ยืนยัน</button>
                                            <button className='bg-red-btn px-2 rounded-md' onClick={openModal}>ยกเลิก</button>
                                        </div>
                                    </div> : ''}
                            </div>
                        ) : <p>คุณยังไม่มีรายการที่จัดส่งแล้ว</p>}
                    </div>
                );
            case "wait-for-return":
                return (
                    <div className='relative w-full h-full'>
                        {toReturn && toReturn.length > 0 ? toReturn.map((item) =>
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
                                            <p>ต้องส่งคืนภายในวันที่ {dateFormat(item.returnDate)}</p>
                                        </div>
                                    </div>
                                    {item.trackNumberFromCustomer != null ?
                                        <div className='self-center flex flex-col justify-center'>
                                            <p className='font-semibold'>เลขแทร็ก</p>
                                            <p>{item.trackNumberFromCustomer}</p>
                                        </div>
                                        : <div className='self-center flex flex-col justify-center'>
                                            <button className='font-bold text-white bg-light-purple py-1 px-3 rounded' onClick={openModal}>กรอกเลขแทร็ก</button>
                                        </div>
                                    }
                                </div>
                                <hr className='w-1/3 self-center border-light-purple' />
                                {isOpenModal ?
                                    <form className='absolute flex flex-col gap-5 p-5 w-1/2 lg:w-1/3 h-fit bg-white-snow border border-dark-purple inset-y-1/2 inset-x-1/2 -translate-y-1/2 -translate-x-1/2 rounded-lg' onSubmit={(e, id) => handleSubmit(e, item.OrderId)}>
                                        <button type='button' className='self-end' onClick={openModal}>
                                            <CancelSVG />
                                        </button>
                                        <p className='text-lg font-semibold'>คุณต้องการยืนยันได้รับหนังสือแล้ว?</p>
                                        <div className='grid grid-cols-3 gap-4 justify-items-start place-items-center w-full'>
                                            <p>เลือกวันที่จัดส่ง</p>
                                            <div className='col-span-2'>
                                                <Datepicker
                                                    asSingle={true}
                                                    value={value}
                                                    onChange={handleValueChange}
                                                />
                                            </div>
                                            <p>เลขแทร็ก</p>
                                            <input name='trackNumberFromCustomer' className='col-span-2 border border-light-purple rounded-md px-2 py-1 focus:outline-none w-full' type='text' onChange={e => handleChange(e)} />
                                            <p>ชื่อบริษัทขนส่ง</p>
                                            <select name='shippingNameFromCustomer' className='col-span-2 border border-light-purple rounded-md px-2 py-1 focus:outline-none w-full' onChange={(e) => handleChange(e)}>
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
                                        <button className='bg-light-purple px-2 rounded-md text-white mb-5' type='submit'>ยืนยัน</button>
                                    </form> : ''}
                            </div>
                        ) : <p>คุณยังไม่มีรายการที่จัดส่งแล้ว</p>}
                    </div>
                );
            case "order-success":
                return (
                    <div className='relative w-full h-full'>
                        {orderSuccess && orderSuccess.length > 0 ? orderSuccess.map((item) =>
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
                                            <p>ส่งคืนวันที่ {dateFormat(item.shippingFromCustomerDate)}</p>
                                            <p>เลขแทร็ก {item.trackNumberFromCustomer}</p>
                                        </div>
                                    </div>
                                </div>
                                <hr className='w-1/3 self-center border-light-purple' />
                            </div>
                        ) : <p>คุณยังไม่มีหนังสือที่เคยเช่า</p>}
                    </div>
                );
            default:
                return <h2>Login or Register first</h2>;
        }
    };
    return (
        <div className="w-full h-full grow py-8 flex flex-col justify-start items-center gap-8 bg-white-bg">
            <h1 className='text-xl font-bold self-start px-20'>สถานะหนังสือ</h1>
            <div className='flex justify-center gap-5 lg:gap-10 font-bold px-10 flex-nowrap '>
                <button className='focus:underline focus:underline-offset-8 focus:decoration-light-purple' name='reserved' onClick={(e) => onClickStatus(e)}>จองแล้ว</button>
                <button className='focus:underline focus:underline-offset-8 focus:decoration-light-purple' name='pending' onClick={(e) => onClickStatus(e)}>รอการชำระเงิน</button>
                <button className='focus:underline focus:underline-offset-8 focus:decoration-light-purple' name='wait-for-shipment' onClick={(e) => onClickStatus(e)}>รอการจัดส่ง</button>
                <button className='focus:underline focus:underline-offset-8 focus:decoration-light-purple' name='shipped' onClick={(e) => onClickStatus(e)}>จัดส่งแล้ว</button>
                <button className='focus:underline focus:underline-offset-8 focus:decoration-light-purple' name='wait-for-return' onClick={(e) => onClickStatus(e)}>รอการส่งคืน</button>
                <button className='focus:underline focus:underline-offset-8 focus:decoration-light-purple' name='order-success' onClick={(e) => onClickStatus(e)}>หนังสือที่เคยยืม</button>
            </div>
            <div className='w-full'>
                {renderContent()}
            </div>
        </div>
    )
}

export default StatusBook