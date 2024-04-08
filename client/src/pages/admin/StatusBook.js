import React from 'react'

const StatusBook = () => {
    return (
        <div className="w-full h-full grow py-20 border flex flex-col justify-start gap-10 bg-white-bg">
            <div className='w-full flex flex-col gap-5 px-20'>
                <h1 className='self-start font-semibold'>ยอดที่ต้องตรวจสอบ</h1>
                <div className='grid grid-cols-5 text-sm border rounded-md border-light-purple gap-2 py-2'>
                    <p className='font-semibold'>วันที่และเวลา</p>
                    <p className='font-semibold'>รายการหนังสือ</p>
                    <p className='font-semibold'>ชื่อผู้ใช้</p>
                    <p className='font-semibold'>ยอดเงินที่ได้รับ</p>
                    <p className='font-semibold'>จัดส่งภายในวันที่</p>
                    <hr className='col-span-full border-light-purple' />
                </div>
            </div>
            <div className='w-full flex flex-col gap-5 px-20'>
                <h1 className='self-start font-semibold'>หนังสือที่ต้องจัดส่ง</h1>
                <div className='grid grid-cols-5 text-sm border rounded-md border-light-purple gap-2 py-2'>
                    <p className='font-semibold'>วันที่และเวลา</p>
                    <p className='font-semibold'>รายการหนังสือ</p>
                    <p className='font-semibold'>ชื่อผู้ใช้</p>
                    <p className='font-semibold'>ยอดเงินที่ได้รับ</p>
                    <p className='font-semibold'>จัดส่งภายในวันที่</p>
                    <hr className='col-span-full border-light-purple' />
                </div>
            </div>
            <div className='w-full flex flex-col gap-5 px-20'>
                <h1 className='self-start font-semibold'>หนังสือที่ต้องได้รับคืน</h1>
                <div className='grid grid-cols-5 text-sm border rounded-md border-light-purple gap-2 py-2'>
                    <p className='font-semibold'>วันที่และเวลา</p>
                    <p className='font-semibold'>รายการหนังสือ</p>
                    <p className='font-semibold'>ชื่อผู้ใช้</p>
                    <p className='font-semibold'>ยอดเงินที่ได้รับ</p>
                    <p className='font-semibold'>จัดส่งภายในวันที่</p>
                    <hr className='col-span-full border-light-purple' />
                </div>
            </div>
        </div>
    )
}

export default StatusBook