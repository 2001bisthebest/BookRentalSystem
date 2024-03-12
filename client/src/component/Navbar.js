import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import BasketSVG from '../SVG/BasketSVG.js'
import SearchSVG from '../SVG/SearchSVG.js'
import UserSVG from '../SVG/UserSVG.js'

const Navbar = () => {
    const [isClick, setIsClick] = useState(false)
    const openMenu = () => {
        if (!isClick) {
            setIsClick(true)
        } else {
            setIsClick(false)
        }
    }
    const { user } = useSelector((state) => ({ ...state }))
    const idUser = user.user.id
    const haveStore = user.user.haveStore
    return (
        <div className='flex w-full h-18 px-4 py-2 bg-dark-purple justify-between items-center'>
            <div className='text-white'>
                <a href='/'>Little Reader</a>
            </div>
            <div className='flex justify-between items-center gap-5'>
                <div className='flex justify-between items-center bg-light-purple rounded-full px-2'>
                    <input className='h-10 bg-light-purple rounded-full' />
                    <SearchSVG />
                </div>
                <BasketSVG />
                <button onClick={openMenu}>
                    <UserSVG />
                    {isClick ?
                        (<div className='absolute top-18 right-4 m-1 p-2 flex flex-col items-center gap-2 w-40 bg-light-purple text-white rounded-lg'>
                            <a href='/personalinfo'>profile</a>
                            <hr className='w-3/4' />
                            <a>สถานะหนังสือ</a>
                            <hr className='w-3/4' />
                            {haveStore ? <a href={'/storeinfo/' + idUser}>ร้านเช่าของฉัน</a> : <a href={'/open_store/' + idUser}>ร้านเช่าของฉัน</a>}
                            <hr className='w-3/4' />
                            {user.user.token ? <p>ออกจากระบบ</p> : <a href='login'>เข้าสู่ระบบ</a>}
                        </div>)
                        :
                        (<div>

                        </div>)}
                </button>
            </div>
        </div>
    )
}

export default Navbar