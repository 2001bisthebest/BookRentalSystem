import React from 'react'
import BasketSVG from '../SVG/BasketSVG.js'
import SearchSVG from '../SVG/SearchSVG.js'
import UserSVG from '../SVG/UserSVG.js'

const Navbar = () => {
    return (
        <div className='flex w-full h-18 px-4 py-2 bg-dark-purple justify-between items-center'>
            <div className='text-white'>
                <p>Little Reader</p>
            </div>
            <div className='flex justify-between items-center gap-5'>
                <div className='flex justify-between items-center bg-light-purple rounded-full px-2'>
                    <input className='h-10 bg-light-purple rounded-full' />
                    <SearchSVG />
                </div>
                <BasketSVG />
                <UserSVG />
            </div>
        </div>
    )
}

export default Navbar