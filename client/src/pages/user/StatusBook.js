import React from 'react'

const StatusBook = () => {
    return (
        <div className="w-full h-full grow py-8 flex flex-col justify-start items-center gap-8 bg-white-bg">
            <h1 className='text-xl font-bold self-start px-20'>สถานะหนังสือ</h1>
            <div className='flex justify-center gap-10 lg:gap-20 font-bold'>
                <p>จองแล้ว</p>
                <p>รอการจัดส่ง</p>
                <p>จัดส่งแล้ว</p>
                <p>รอการส่งคืน</p>
            </div>
            <div className='flex flex-col gap-5 lg:gap-10 w-full px-20'>
                <div className='flex w-full justify-between'>
                    <div className='flex gap-5'>
                        <div className='bg-light-gray w-24 h-24 lg:w-32 lg:h-32 rounded-lg'>
                        </div>
                        <div className='flex flex-col gap-1 lg:gap-2 justify-start items-start'>
                            <p>Title 1</p>
                            <p>Store name 1</p>
                            <p>จำนวนวันที่เช่า</p>
                        </div>
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