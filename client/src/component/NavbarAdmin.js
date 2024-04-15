import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import SearchSVG from '../SVG/SearchSVG.js'
import { currentAdmin } from '../functions/auth.js'
import { logout as logoutAdmin } from '../store/adminSlice'
import { logout as logoutUser } from '../store/userSlice.js'

const NavbarAdmin = () => {
    const [isClick, setIsClick] = useState(false)
    const openMenu = () => {
        if (!isClick) {
            setIsClick(true)
        } else {
            setIsClick(false)
        }
    }
    const { user } = useSelector((state) => (state.user))
    const { admin } = useSelector((state) => (state.admin))
    const [adminInfo, setAdminInfo] = useState({})
    useEffect(() => {
        loadData()
    }, [admin.id])
    const loadData = async () => {
        await currentAdmin(user.token, user.username).then(res => setAdminInfo(res.data)).catch(err => console.log(err))
    }
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(logoutUser())
        dispatch(logoutAdmin())
        setIsClick(false)
        navigate('/')
    }
    return (
        <div className='flex w-full h-18 px-4 py-2 bg-dark-purple justify-between items-center'>
            <div className='text-white font-semibold '>
                <Link to={'/'}><p>Little Reader</p></Link>
            </div>
            <div className='flex justify-between items-center gap-5'>
                <div className='flex justify-between items-center bg-light-purple rounded-full px-2'>
                    <input className='h-10 bg-light-purple rounded-full' />
                    <SearchSVG />
                </div>
                <button onClick={openMenu}>
                    <div className='w-10 h-10'>
                        <img className='w-full h-full rounded-full' src={process.env.REACT_APP_IMG + '/' + adminInfo.file} />
                    </div>
                    {isClick ?
                        (<div className='absolute top-18 right-4 m-1 p-2 flex flex-col items-center gap-2 w-40 bg-light-purple text-white rounded-lg z-40'>
                            <a href={'/storeinfo/' + admin.id}>ข้อมูลร้านเช่า</a>
                            <hr className='w-3/4' />
                            <a href={'/statusbookadmin/' + admin.id}>ยอดที่ต้องตรวจสอบ</a>
                            <hr className='w-3/4' />
                            <a href='/allqueuebookadmin'>คิวหนังสือของฉัน</a>
                            <hr className='w-3/4' />
                            {user && user.token ? <div className='w-full flex flex-col items-center'><a href='/personalinfo'>ผู้เช่ายืม</a><hr className='w-3/4' /></div> : ''}
                            {user && user.token ? <button className='w-full' type='button' onClick={handleLogout}>ออกจากระบบ</button> : <a href='/login'>เข้าสู่ระบบ</a>}
                        </div>)
                        :
                        (<div>
                        </div>)}
                </button>
            </div>
        </div>
    )
}

export default NavbarAdmin