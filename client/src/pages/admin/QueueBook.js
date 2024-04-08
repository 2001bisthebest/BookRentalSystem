import React from 'react'

const QueueBook = () => {
    return (
        <div className="w-full h-full grow py-20 border flex flex-col justify-start gap-10 bg-white-bg px-24">
            <h1 className='self-start font-bold text-lg'>คิวหนังสือ Title 1</h1>
            <div className='flex gap-5 lg:gap-10'>
                <div className='bg-light-gray w-28 h-28 lg:w-36 lg:h-36 rounded-lg'>
                </div>
                <div className='flex flex-col gap-1 lg:gap-2 justify-start items-start'>
                    <p className='font-semibold'>Title 1</p>
                    <p>รหัสหนังสือ</p>
                </div>
            </div>
            <div className='grid grid-cols-5 text-sm border rounded-md border-light-purple gap-2 py-2'>
                <p className='font-semibold'>วันที่และเวลา</p>
                <p className='font-semibold'>book copy</p>
                <p className='font-semibold'>ชื่อผู้ใช้ที่จอง</p>
                <p className='font-semibold'>ระยะเวลาเช่า</p>
                <p className='font-semibold'>ยืนยันการจอง</p>
                <hr className='col-span-full border-light-purple' />
                <p>วันที่และเวลา</p>
                <p>รายการหนังสือ</p>
                <p>ชื่อผู้ใช้ที่จอง</p>
                <p>ระยะเวลาเช่า</p>
                <div className='flex  flex-col lg:flex-row gap-2 text-white justify-center lg:px-0 px-2'>
                    <button className='bg-light-purple px-2 rounded-md'>ยืนยัน</button>
                    <button className='bg-red-btn px-2 rounded-md'>ยกเลิก</button>
                </div>
                <hr className='col-span-full border-light-purple' />
                <p>วันที่และเวลา</p>
                <p>รายการหนังสือ</p>
                <p>ชื่อผู้ใช้ที่จอง</p>
                <p>ระยะเวลาเช่า</p>
                <div className='flex flex-col lg:flex-row gap-2 text-white justify-center lg:px-0 px-2'>
                    <button className='bg-light-purple px-2 rounded-md'>ยืนยัน</button>
                    <button className='bg-red-btn px-2 rounded-md'>ยกเลิก</button>
                </div>
            </div>
        </div>
    )
}

export default QueueBook