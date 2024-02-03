import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='flex w-80 h-full bg-white-snow drop-shadow text-xl'>
            <div className='flex flex-col gap-2 px-10 py-20 items-start'>
                <p>Little Reader</p>
                <Link to={'/'}><p>หน้าหลัก</p></Link>
                <Link to={'/store'}><p>ร้านเช่า</p></Link>
                <Link to={'/category'}><p>หมวดหมู่</p></Link>
                <ul className='px-2 list-disc list-inside'>
                    <li>หนังสือพัฒนาตนเอง</li>
                    <li>นิยาย</li>
                    <li>การ์ตูน</li>
                </ul>
                <p>สมาชิก</p>
                <ul className='px-2 list-disc list-inside'>
                    <li>ข้อมูลส่วนตัว</li>
                    <li>หนังสือที่จองคิวไว้</li>
                    <li>ร้านเช่าของฉัน</li>
                </ul>
                <p>กฏการใช้งาน</p>
                <p>ติดต่อเรา</p>
            </div>
        </div>
    )
}

export default Sidebar