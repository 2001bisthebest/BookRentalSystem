import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CancelSVG from '../../SVG/CancelSVG'

const CartPage = () => {
    const [bankAcc, setBankAcc] = useState([])
    const orderId = useParams()
    const token = localStorage.getItem('token')
    const [order, setOrder] = useState({})
    const navigate = useNavigate()
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [file, setFile] = useState({})
    const openModal = () => {
        setIsOpenModal(!isOpenModal)
    }
    useEffect(() => {
        loadData()
    }, [orderId.id])
    useEffect(() => {
        if (order) {
            loadDataBank()
        }
    }, [order])
    const loadData = async () => {
        await axios.get(process.env.REACT_APP_API + '/showorder/' + orderId.id, {
            headers: {
                authtoken: token
            }
        })
            .then(res => {
                console.log(res.data)
                setOrder(res.data)
            })
            .catch(err => console.log(err))
    }
    const loadDataBank = async () => {
        const storeId = await order.StoreId
        await axios.get(process.env.REACT_APP_API + '/showbankacc/' + storeId)
            .then(res => {
                console.log(res.data)
                setBankAcc(res.data)
            })
            .catch(err => console.log(err))
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formWithImgData = new FormData()
        for (let key in file) {
            formWithImgData.append(key, file[key])
        }
        try {
            const submitResponse = await axios.post(process.env.REACT_APP_API + '/uploadpayment/' + orderId.id, formWithImgData, {
                headers: {
                    authtoken: token
                }
            })
            console.log(submitResponse)
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }
    const handleChange = (e) => {
        setIsOpenModal(!isOpenModal)
        const { files, type, name } = e.target
        if (type === 'file') {
            setFile({
                [name]: files[0]
            })
        }

    }
    console.log(file)
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
        <form className="relative w-full h-full grow py-8 flex flex-col justify-start items-center gap-10 bg-white-bg" onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className='self-center'>
                <h1 className='font-bold text-xl pb-1'>ตระกร้า</h1>
                <hr className='border-light-purple w-20' />
            </div>
            <div className='flex flex-col gap-5 lg:gap-10 w-full px-20'>
                <div className='flex w-full justify-between'>
                    <div className='flex gap-5'>
                        <div className='w-24 h-24 lg:w-32 lg:h-32 rounded-lg flex justify-center'>
                            <img className='h-full rounded-lg drop-shadow-md' src={process.env.REACT_APP_IMG + '/' + order.file} />
                        </div>
                        <div className='flex flex-col gap-1 lg:gap-2 justify-start items-start'>
                            <p className='font-semibold'>{order.title}</p>
                            <p>{order.storeName}</p>
                            <p>{dateFormat(order.startDate) + ' - ' + dateFormat(order.endDate)}</p>
                        </div>
                    </div>
                    <h1 className='font-bold self-end lg:text-lg'>ราคา {order.priceSummary} บาท</h1>
                </div>
                <hr className='w-1/3 self-center border-light-purple' />
            </div>
            <h1 className='font-bold self-end px-40 text-xl lg:text-2xl'>รวม {order.priceSummary} บาท</h1>
            <div className='self-center'>
                <h1 className='font-bold text-xl pb-1'>ช่องทางการชำระเงิน</h1>
                <hr className='border-light-purple w-56' />
            </div>

            <div className='flex gap-10 px-20 w-full'>
                <div className='flex gap-10 w-full'>
                    <div className='bg-light-gray w-24 h-24 lg:w-36 lg:h-36 rounded-lg'>
                    </div>
                    {bankAcc && bankAcc.length > 0 ? bankAcc.map((item) =>
                        <div className='flex flex-col gap-1 lg:gap-2 justify-start items-start'>
                            <p>ธนาคาร {item.bankName}</p>
                            <p>ชื่อบัญชี {item.accName}</p>
                            <p>{item.accNumber}</p>
                        </div>
                    ) : ''}
                </div>
                <button className='self-center bg-light-purple px-2 py-1 text-white rounded-md' onClick={openModal}>อัพโหลดสลิป</button>
            </div>
            <button type='submit' className='self-center bg-light-purple px-4 py-1 text-white rounded-md text-lg lg:text-xl font-bold'>ยืนยันการชำระเงิน</button>
            {isOpenModal ?
                <div className='absolute flex flex-col p-5 w-1/2 lg:w-1/3 h-1/3 bg-white-snow border border-dark-purple inset-y-1/2 inset-x-1/2 -translate-y-1/2 -translate-x-1/2 rounded-lg'>
                    <button type='button' className='self-end' onClick={openModal}>
                        <CancelSVG />
                    </button>
                    <p className='text-lg font-semibold'>อัพโหลดสลิปที่คุณทำรายการ</p>
                    <div className='flex flex-col gap-4 justify-center items-center text-white h-full'>
                        {/* onClick={(id) => onClickCancelQueue(item._id)} */}
                        <input type='file' name='file' className='col-span-2 w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100' onChange={e => handleChange(e)} />
                        <button type='button' className='bg-light-purple px-2 rounded-md' onClick={openModal}>ยืนยัน</button>
                        {/* <button className='bg-light-purple px-2 rounded-md' onClick={openModal}>ยกเลิก</button> */}
                    </div>
                </div> : ''}
        </form>
    )
}

export default CartPage