import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import SearchSVG from '../SVG/SearchSVG.js'
import UserSVG from '../SVG/UserSVG.js'
import { currentAdmin, currentUser } from '../functions/auth.js'
import useDebounce from '../functions/useDebounce.js'
import { logout as logoutAdmin } from '../store/adminSlice.js'
import { logout as logoutUser } from '../store/userSlice.js'

function SearchResult({ isLoading, data, search }) {

    return (
        <div>
            {data.length > 0 ?
                <div className="absolute top-3 right-0 px-2 pt-8 pb-2 flex flex-col items-center gap-2 w-full bg-light-purple text-white rounded-2xl z-30">
                    {isLoading && <div className="text-white">Loading...</div>}
                    {data && data.map((item, index) => {
                        if (index < 6) {
                            return (index < 5) ?
                                <div key={item._id} className="text-gray-100 py-2">
                                    <a href={'/book/' + item._id}>{item.title}</a>
                                </div> : <div key={item._id} className="text-gray-100 py-2">
                                    <a href={'/search/' + search}>See more ...</a>
                                </div>
                        }
                    }
                    )}
                </div>
                : ''}
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
            if (debouncedSearchTerm && debouncedSearchTerm.trim().length != 0) {
                // console.log('fetching')
                return await axios.get(process.env.REACT_APP_API + `/searchbook?name=${debouncedSearchTerm}`)
                    .then(res => setBook(res.data))
                    .catch(err => console.log(err))
            } else {
                setBook([])
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
            let adminRes = await currentAdmin(user.token, user.username)
            setAdminInfo(adminRes.data)
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
        // window.location.reload()
    }
    const onClickStateToAdmin = async () => {
        await new Promise(resolve => setTimeout(setIsAdminBar(true), 1000))
        navigate('/storeinfo/' + adminInfo._id)
    }
    const onClickStateToUser = async () => {
        await new Promise(resolve => setTimeout(setIsAdminBar(false), 1000))
        navigate('/personalinfo')
    }
    const onClickToCheck = async () => {
        await new Promise(resolve => setTimeout(navigate('/statusbookadmin/' + admin.id), 1000))
    }
    const onClickToStoreInfo = async () => {
        await new Promise(resolve => setTimeout(navigate('/storeinfo/' + admin.id), 1000))
    }
    return (
        <div className='flex w-full h-18 px-4 py-2 bg-dark-purple justify-between items-center'>
            <div className='text-white font-semibold'>
                <Link to={'/'}><p>Little Reader</p></Link>
            </div>
            {isAdminBar ?
                <div className='flex justify-between items-center gap-5'>
                    <div className='relative flex justify-between items-center bg-light-purple rounded-2xl px-2 text-white'>
                        <input type='search'
                            className='h-10 p-2 bg-light-purple rounded-full focus:outline-none z-40'
                            onChange={(e) => setSearch(e.target.value)}
                            value={search} />
                        <SearchResult isLoading={isLoading} data={book} search={search} />
                        <SearchSVG className='z-40' />
                    </div>
                    <button onClick={openMenu}>
                        {adminInfo.file != null ?
                            <div className='w-10 h-10'>
                                <img className='w-full h-full rounded-full' src={process.env.REACT_APP_IMG + '/' + adminInfo.file} />
                            </div>
                            : <UserSVG />}
                        {isClick ?
                            (<div className='absolute top-18 right-4 m-1 p-2 flex flex-col items-center gap-2 w-40 bg-light-purple text-white rounded-lg z-40'>
                                {user && user.token ? <div className='w-full flex flex-col items-center'><button className='w-full flex flex-col items-center' onClick={onClickToStoreInfo}>ข้อมูลร้านเช่า</button><hr className='w-3/4' /></div> : ''}
                                {user && user.token ? <div className='w-full flex flex-col items-center'><button className='w-full flex flex-col items-center' onClick={onClickToCheck}>ยอดที่ต้องตรวจสอบ</button><hr className='w-3/4' /></div> : ''}
                                {user && user.token ? <div className='w-full flex flex-col items-center'><a href='/allqueuebookadmin'>คิวหนังสือของฉัน</a><hr className='w-3/4' /></div> : ''}
                                {user && user.token ? <div className='w-full flex flex-col items-center'><button onClick={onClickStateToUser}>ผู้เช่ายืม</button><hr className='w-3/4' /></div> : <a href='/personalinfo'>สมาชิก</a>}
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
                        <SearchResult isLoading={isLoading} data={book} search={search} />
                        <SearchSVG className='z-40' />
                    </div>
                    <a href={'/status/reserved'} className='text-white'>สถานะหนังสือ</a>
                    <button onClick={openMenu}>
                        {userInfo.file != null ?
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