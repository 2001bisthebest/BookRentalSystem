import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
// import BasketSVG from '../SVG/BasketSVG.js'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import SearchSVG from '../SVG/SearchSVG.js'
import UserSVG from '../SVG/UserSVG.js'
import { currentAdmin, currentUser } from '../functions/auth.js'
import useDebounce from '../functions/useDebounce.js'
import { logout as logoutAdmin } from '../store/adminSlice.js'
import { logout as logoutUser } from '../store/userSlice.js'

function SearchResult({ isLoading, data }) {
    return (
        <div>
            {data != '' ?
                <div className="absolute top-3 right-0 px-2 pt-8 pb-2 flex flex-col items-center gap-2 w-full bg-light-purple text-white rounded-2xl z-10">
                    {isLoading && <div className="text-white">Loading...</div>}
                    {data && data.map((item) => (
                        <div key={item.id} className="text-gray-100 py-2">
                            {item.title}
                        </div>
                    ))}
                </div> : ''}
        </div>
    )
}
const Navbar = () => {
    const [isClick, setIsClick] = useState(false)
    const [isAdminBar, setIsAdminBar] = useState(() => {
        const storedIsAdminBar = localStorage.getItem('isAdminBar');
        return storedIsAdminBar ? JSON.parse(storedIsAdminBar) : false;
    });
    const { user } = useSelector((state) => (state.user))
    const { admin } = useSelector((state) => (state.admin))
    const [userInfo, setUserInfo] = useState({})
    const [adminInfo, setAdminInfo] = useState({})
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [book, setBook] = useState([])
    const debouncedSearchTerm = useDebounce(search, 200)
    const { isLoading, error } = useQuery({
        queryKey: ['search', debouncedSearchTerm],
        queryFn: async () => {
            if (debouncedSearchTerm) {
                console.log('fetching')
                return await axios.get(process.env.REACT_APP_API + `/searchbook?name=${debouncedSearchTerm}`).then(res => setBook(res.data)).catch(err => console.log(err))
            }
            return book
        }
    })
    useEffect(() => {
        localStorage.setItem('isAdminBar', JSON.stringify(isAdminBar));
    }, [isAdminBar]);
    const openMenu = () => {
        if (!isClick) {
            setIsClick(true)
        } else {
            setIsClick(false)
        }
    }
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
    const handleLogout = () => {
        dispatch(logoutUser())
        dispatch(logoutAdmin())
        setIsClick(false)
        navigate('/')
    }
    const onClickStateToAdmin = () => {
        setIsAdminBar(true)
        navigate('/storeinfo/' + adminInfo._id)
    }
    const onClickStateToUser = () => {
        setIsAdminBar(false)
        navigate('/personalinfo')
    }
    return (
        <div className='flex w-full h-18 px-4 py-2 bg-dark-purple justify-between items-center'>
            <div className='text-white font-semibold '>
                <Link to={'/'}><p>Little Reader</p></Link>
            </div>
            {isAdminBar ?
                <div className='flex justify-between items-center gap-5'>
                    <div className='relative flex justify-between items-center bg-light-purple rounded-2xl px-2 text-white'>
                        <input type='search'
                            className='h-10 p-2 bg-light-purple rounded-full focus:outline-none z-40'
                            onChange={(e) => setSearch(e.target.value)}
                            value={search} />
                        <SearchResult isLoading={isLoading} data={book} />
                        <SearchSVG className='z-40' />
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
                                {user && user.token ? <div className='w-full flex flex-col items-center'><button onClick={onClickStateToUser}>ผู้เช่ายืม</button><hr className='w-3/4' /></div> : ''}
                                {user && user.token ? <button className='w-full' type='button' onClick={handleLogout}>ออกจากระบบ</button> : <a href='/login'>เข้าสู่ระบบ</a>}
                            </div>)
                            :
                            (<div>
                            </div>)}
                    </button>
                </div>
                :
                <div className='flex justify-between items-center gap-5'>
                    <div className='relative flex justify-between items-center bg-light-purple rounded-2xl px-2 text-white'>
                        <input type='search'
                            className='h-10 p-2 bg-light-purple rounded-full focus:outline-none z-40'
                            onChange={(e) => setSearch(e.target.value)}
                            value={search} />
                        <SearchResult isLoading={isLoading} data={book} />
                        <SearchSVG className='z-40' />
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
                                {user && userInfo.haveStore ? <button onClick={onClickStateToAdmin}>ร้านเช่าของฉัน</button> : <a href={'/open_store/' + userInfo._id}>ร้านเช่าของฉัน</a>}
                                <hr className='w-3/4' />
                                {user && token ? <button className='w-full' type='button' onClick={handleLogout}>ออกจากระบบ</button> : <a href='/login'>เข้าสู่ระบบ</a>}
                            </div>)
                            :
                            (<div>
                            </div>)}
                    </button>
                </div>
            }
        </div>
    )
}

export default Navbar