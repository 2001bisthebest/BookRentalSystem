import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import CancelSVG from '../../SVG/CancelSVG'
import PlusSVG from '../../SVG/PlusSVG'

const StorePersonalInfo = () => {
    const [book, setBook] = useState([])
    const { id } = useParams()
    const [storeInfo, setStoreInfo] = useState({})
    const [storeEdit, setStoreEdit] = useState({})
    const { user } = useSelector((state) => (state.user))
    const navigate = useNavigate()
    useEffect(() => {
        loadData()
    }, [id])
    const loadData = async () => {
        await axios.get(process.env.REACT_APP_API + '/listbook/' + id)
            .then(res => {
                setBook(res.data)
            })
            .catch(err => console.log(err))
        await axios.get(process.env.REACT_APP_API + '/storeinfo/' + id)
            .then(res => {
                setStoreInfo(res.data)
                setStoreEdit(res.data)
            })
            .catch(err => console.log(err))
    }
    const [isOpenAddBook, setOpenAddBook] = useState(false)
    const [isOpenAddBank, setOpenAddBank] = useState(false)
    const [isOpenEditInfo, setOpenEditInfo] = useState(false)
    const openModalAddBook = () => {
        setOpenAddBank(false)
        setOpenEditInfo(false)
        setOpenAddBook(!isOpenAddBook)
    }
    const openModalAddBank = () => {
        setOpenAddBook(false)
        setOpenEditInfo(false)
        setOpenAddBank(!isOpenAddBank)
    }
    const openModalEditInfo = () => {
        setOpenAddBook(false)
        setOpenAddBank(false)
        setOpenEditInfo(!isOpenEditInfo)

    }
    const handleChange = (e) => {
        if (e.target.name === 'file') {
            setStoreEdit({
                ...storeEdit,
                [e.target.name]: e.target.files[0]
            })
        } else {
            setStoreEdit({
                ...storeEdit,
                [e.target.name]: e.target.value
            })
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formWithImgData = new FormData()
        for (const key in storeEdit) {
            formWithImgData.append(key, storeEdit[key])
        }
        const storeE = {
            name: formWithImgData.get("name"),
            address: formWithImgData.get("address"),
            telephone: formWithImgData.get("telephone"),
            detailStore: formWithImgData.get("detailStore"),
            numberOfDayForShipping: formWithImgData.get("numberOfDayForShipping"),
            file: formWithImgData.get("file")
        }
        await axios.put(process.env.REACT_APP_API + '/editstoreinfo/' + id, { storeE }, {
            headers: {
                authtoken: user.token
            }
        }).then((res) => {
            console.log(res.data)
            setOpenEditInfo(false)
            navigate('/storeinfo/' + id)

        }).catch(err => console.log(err))
    }
    return (
        <div className="relative w-full h-full grow py-16 border flex flex-col justify-center gap-4 bg-white-bg">
            <div className='flex flex-col items-start gap-16'>
                <div className='flex gap-10 flex-col lg:flex-row items-center px-40 w-full'>
                    <img className='rounded-full w-40 h-40 lg:self-start' src={process.env.REACT_APP_IMG + '/' + storeInfo.file} />
                    <div className='grid grid-cols-2 justify-items-start gap-4 py-5'>
                        <p>ร้าน</p>
                        <p>{storeInfo.name}</p>
                        <p>ที่อยู่</p>
                        <p>{storeInfo.address}</p>
                        <p>เบอร์โทร</p>
                        <p>{storeInfo.telephone}</p>
                        <p>รายละเอียดร้านค้า</p>
                        <p>{storeInfo.detailStore}</p>
                        <p>วันทำการจัดส่ง</p>
                        <p>{storeInfo.numberOfDayForShipping}</p>
                        <button type='button' className='col-span-full place-self-center bg-light-purple px-2 rounded drop-shadow-md text-white' onClick={openModalEditInfo}>แก้ไขข้อมูล</button>
                    </div>
                </div>
                <div className='flex flex-col gap-8 justify-center items-start px-20'>
                    <div className='flex gap-3 items-center'>
                        <p className='text-lg font-semibold'>หนังสือทั้งหมด</p>
                        <div className='relative flex flex-col gap-2 bg-gray items-start'>
                            <button type='button' onClick={openModalAddBook} className='border w-16 h-5 px-2 py-3 gap-1 flex justify-center items-center rounded'>
                                <PlusSVG />
                                <p>Add</p>
                            </button>
                        </div>
                    </div>
                    <div className='w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10'>
                        {book ? book.map(item =>
                            <div className='flex flex-col gap-4 items-center'>
                                <div className='relative w-40 h-40'>
                                    <div className='absolute top-2 right-2 w-12 h-6 rounded bg-green-btn text-white drop-shadow-md z-40'>
                                        <p>ว่าง</p>
                                    </div>
                                    <a href={`/book/${item._id}`} className='w-full h-full'>{item.file ? <img src={process.env.REACT_APP_IMG + "/" + item.file} className='w-full h-full rounded-lg drop-shadow-md'></img> : ""}</a>
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <p className='font-semibold'>{item.title}</p>
                                    <p>{item.price} บาท</p>
                                </div>
                            </div>
                        )
                            : ''}
                    </div>
                    <div className='flex gap-3 items-center'>
                        <p className='text-lg font-semibold'>หนังสือแนะนำ</p>
                        <div className='relative flex flex-col gap-2 bg-gray items-start'>
                            <button type='button' onClick={openModalAddBook} className='border w-16 h-5 px-2 py-3 gap-1 flex justify-center items-center rounded'>
                                <PlusSVG />
                                <p>Add</p>
                            </button>
                        </div>
                    </div>
                    <div className='flex gap-3 items-center'>
                        <p className='text-lg font-semibold'>บัญชีธนาคาร</p>
                        <div className='relative flex flex-col gap-2 bg-gray items-start'>
                            <button type='button' onClick={openModalAddBank} className='border w-16 h-5 px-2 py-3 gap-1 flex justify-center items-center rounded'>
                                <PlusSVG />
                                <p>Add</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='absolute z-40 inset-y-1/2 inset-x-1/2 w-1/3 h-2/3'>
                {isOpenAddBook ?
                    <form className='bg-white-snow w-full flex flex-col border rounded-lg p-10 -translate-y-1/2 -translate-x-1/2 gap-4'>
                        <button type='button' className='self-end' onClick={openModalAddBook}>
                            <CancelSVG />
                        </button>
                        <div className='w-full h-full'>
                            <input type='file' className='self-center' />
                        </div>
                        <div className='grid grid-cols-3 justify-center items-start gap-4 w-full justify-items-start'>
                            <p className='font-bold'>ชื่อหนังสือ :</p>
                            <input type='text' className='col-span-2' />
                            <p className='font-bold'>ชื่อผู้แต่ง :</p>
                            <input type='text' className='col-span-2' />
                            <p className='font-bold'>ชื่อผู้แปล :</p>
                            <input type='text' className='col-span-2' />
                            <p className='font-bold'>สำนักพิมพ์ :</p>
                            <input type='text' className='col-span-2' />
                            <p className='font-bold'>ปีที่พิมพ์ :</p>
                            <input type='text' className='col-span-2' />
                            <p className='font-bold'>ราคาเช่า :</p>
                            <input type='text' className='col-span-2' />
                            <p className='font-bold'>จำนวน :</p>
                            <input type='text' className='col-span-2' />
                            <p className='font-bold'>หมวดหมู่ :</p>
                            <div className='col-span-2 grid grid-cols-3 gap-5'>
                                <button type='button' className='p-1 border border-light-purple place-self-center rounded'>eiei</button>
                                <button type='button' className='p-1 border border-light-purple place-self-center rounded'>eiei</button>
                            </div>
                        </div>
                        <button type='submit' className='bg-light-purple px-2 rounded-md w-20 self-center text-white'>บันทึก</button>
                    </form>
                    : ""}
            </div>
            <div className='absolute z-40 inset-y-1/2 inset-x-1/2 w-1/3 h-1/2'>
                {isOpenAddBank ?
                    <form className='w-full h-full border bg-white-snow p-10 rounded-lg flex flex-col gap-5 -translate-y-1/2 -translate-x-1/2'>
                        <button type='button' className='self-end' onClick={openModalAddBank}>
                            <CancelSVG />
                        </button>
                        <p className='font-semibold lg:text-lg'>เพิ่มบัญชีธนาคาร</p>
                        <div className='w-full grid grid-cols-3 gap-4'>
                            <p>เลขบัญชี :</p>
                            <input className='col-span-2' />
                            <p>ชื่อบัญชี :</p>
                            <input className='col-span-2' />
                            <p>ชื่อธนาคาร :</p>
                            <input className='col-span-2' />
                        </div>
                        <button type='submit' className='bg-light-purple px-2 rounded-md w-20 self-center text-white'>บันทึก</button>
                    </form> :
                    ''
                }
            </div>
            <div className='absolute z-40 inset-y-1/2 inset-x-1/2 w-1/3 h-1/2'>
                {isOpenEditInfo ?
                    <form className='bg-white-snow w-full h-full flex flex-col items-center border rounded-lg p-5 -translate-y-1/2 -translate-x-1/2 gap-4' encType='multipart/form-data' onSubmit={handleSubmit}>
                        <button type='button' className='self-end' onClick={openModalEditInfo}>
                            <CancelSVG />
                        </button>
                        <div className='w-full'>
                            <input type='file' className='self-center' name='file' onChange={(e) => handleChange(e)} />
                        </div>
                        <div className='grid grid-rows-2 xl:grid-cols-3 justify-center items-start gap-2 xl:gap-4 w-full justify-items-start px-10'>
                            <p className='font-bold'>ชื่อร้านค้า :</p>
                            <input type='text' className='col-span-2 w-full px-2' name='name' value={storeEdit.name} onChange={(e) => handleChange(e)} />
                            <p className='font-bold'>ที่อยู่ :</p>
                            <input type='text' className='col-span-2 w-full px-2' name='address' value={storeEdit.address} onChange={(e) => handleChange(e)} />
                            <p className='font-bold'>เบอร์โทร :</p>
                            <input type='text' className='col-span-2 w-full px-2' name='telephone' value={storeEdit.telephone} onChange={(e) => handleChange(e)} />
                            <p className='font-bold'>รายละเอียดร้านค้า :</p>
                            <input type='text' className='col-span-2 w-full px-2' name='detailStore' value={storeEdit.detailStore} onChange={(e) => handleChange(e)} />
                            <p className='font-bold'>วันทำการจัดส่ง :</p>
                            <input type='text' className='col-span-2 w-full px-2' name='numberOfDayForShipping' value={storeEdit.numberOfDayForShipping} onChange={(e) => handleChange(e)} />
                        </div>
                        <button type='submit' className='bg-light-purple px-2 rounded-md w-20 self-center text-white'>บันทึก</button>
                    </form>
                    : ""}
            </div>
        </div>
    )
}

export default StorePersonalInfo