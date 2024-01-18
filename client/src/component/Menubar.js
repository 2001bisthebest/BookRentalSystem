import React from 'react'

const Menubar = () => {
    return (
        <div >
            <div className='flex justify-between gap-2 px-4 py-2 border border-light-purple rounded-full w-full h-full'>
                <p>หน้าหลัก</p>
                <p>ร้านเช่า</p>
                <p>หมวดหมู่</p>
                <p>กฏการใช้งาน</p>
                <p>ติดต่อเรา</p>
            </div>
        </div>
    )
}

export default Menubar