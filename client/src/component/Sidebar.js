import React from 'react'

const Sidebar = () => {
    return (
        <div className='flex w-80 h-full bg-white-snow drop-shadow'>
            <div className='flex flex-col gap-2 px-10 py-20'>
                <p>Little Reader</p>
                <p>หน้าหลัก</p>
                <p>ร้านเช่า</p>
                <p>หมวดหมู่</p>
                <ul className='px-2 list-disc list-inside'>
                    <li className=''>หนังสือพัฒนาตนเอง</li>
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