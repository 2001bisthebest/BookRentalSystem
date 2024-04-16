import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
// import BasketSVG from '../SVG/BasketSVG.js'
import SearchSVG from '../SVG/SearchSVG.js'
import UserSVG from '../SVG/UserSVG.js'
import { currentAdmin, currentUser } from '../functions/auth.js'
import { logout as logoutAdmin } from '../store/adminSlice'
import { logout as logoutUser } from '../store/userSlice.js'

const NavbarUser = () => {
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
    const [userInfo, setUserInfo] = useState({})
    const [adminInfo, setAdminInfo] = useState({})
    const token = localStorage.getItem('token')
    useEffect(() => {
        loadData()
    }, [user.id])
    const loadData = async () => {
        try {
            const userFromCurrentUser = await currentUser(user.token)
            setUserInfo(userFromCurrentUser.data)
            // if (userInfo.haveStore) {
            await currentAdmin(user.token, user.username).then(res => setAdminInfo(res.data)).catch(err => console.log(err))
            // }
        } catch (err) {
            console.log(err)
        }
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
                <a href={'/status/reserved'} className='text-white'>สถานะหนังสือ</a>
                <button onClick={openMenu}>
                    {userInfo > 0 ?
                        <div className='w-10 h-10'>
                            <img className='w-full h-full rounded-full' src={process.env.REACT_APP_IMG + '/' + userInfo.file} />
                        </div>
                        : <UserSVG />}
                    {isClick ?
                        (<div className='absolute top-18 right-4 m-1 p-2 flex flex-col items-center gap-2 w-40 bg-light-purple text-white rounded-lg z-50'>
                            {user && token ? <div className='w-full flex flex-col items-center'><a href='/personalinfo'>สมาชิก</a><hr className='w-3/4' /></div> : ''}
                            <a href='/status/reserved'>สถานะหนังสือ</a>
                            <hr className='w-3/4' />
                            {user && userInfo.haveStore ? <a href={'/storeinfo/' + adminInfo._id}>ร้านเช่าของฉัน</a> : <a href={'/open_store/' + userInfo._id}>ร้านเช่าของฉัน</a>}
                            <hr className='w-3/4' />
                            {user && token ? <button className='w-full' type='button' onClick={handleLogout}>ออกจากระบบ</button> : <a href='/login'>เข้าสู่ระบบ</a>}
                        </div>)
                        :
                        (<div>

                        </div>)}
                </button>
            </div>
        </div>
    )
}

export default NavbarUser