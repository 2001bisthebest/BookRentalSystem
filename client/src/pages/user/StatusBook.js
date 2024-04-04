import React from 'react'

const StatusBook = () => {
    return (
        <div className="w-full h-full grow py-8 flex flex-col justify-start items-center gap-8 bg-white-bg">
            <h1 className='text-xl font-bold self-start px-20'>สถานะหนังสือ</h1>
            <div className='flex justify-center gap-20 font-bold'>
                <p>จองแล้ว</p>
                <p>รอการจัดส่ง</p>
                <p>จัดส่งแล้ว</p>
                <p>รอการส่งคืน</p>
            </div>
            <div className='flex flex-col gap-10'>
                <div className='flex jutify-center gap-10 px-32'>
                    <div className='bg-light-gray w-36 h-36 rounded-lg'>
                    </div>
                    <div className='flex flex-col gap-2 justify-start items-start pr-96'>
                        <p className='font-bold'>Title 1</p>
                        <p>Store name 1</p>
                        <p>วันที่เช่า</p>
                        <p>จำนวนวันที่เช่า</p>
                    </div>
                    <div className='self-center flex flex-col justify-center'>
                        <p>xxx บาท</p>
                        <button className='font-bold text-white bg-red-btn py-1 px-3 rounded'>ยกเลิก</button>
                    </div>
                </div>
                <hr className='w-1/3 self-center border-light-purple' />
            </div>
        </div>
    )
}

export default StatusBook