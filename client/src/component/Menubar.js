import React from 'react'
import { Link } from 'react-router-dom'

const Menubar = () => {
    return (
        <div>
            <div className='border border-light-purple flex justify-between gap-2 px-4 py-2 rounded-full w-full h-full bg-white-snow '>
                <Link to={'/'}><p className='hover:bg-light-purple hover:rounded-full hover:text-whiterounded-full w-full h-full hover:text-white'>หน้าหลัก</p></Link>
                <Link to={'/store'}><p className='hover:text-white'>ร้านเช่า</p></Link>
                <Link to={'/category'}><p>หมวดหมู่</p></Link>
                <p>กฏการใช้งาน</p>
                <p>ติดต่อเรา</p>
            </div>
        </div>
    )
}

export default Menubar