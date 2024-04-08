import React from 'react'

const AllQueueBook = () => {
    return (
        <div className="w-full h-full grow py-20 border flex flex-col justify-start gap-10 bg-white-bg px-24">
            <h1 className='self-start font-semibold text-lg'>คิวหนังสือ</h1>
            <div className='flex flex-col gap-5 lg:gap-10 w-full '>
                <div className='flex w-full justify-between'>
                    <div className='flex gap-5 lg:gap-10'>
                        <div className='bg-light-gray w-28 h-28 lg:w-36 lg:h-36 rounded-lg'>
                        </div>
                        <div className='flex flex-col gap-1 lg:gap-2 justify-start items-start'>
                            <p className='font-semibold'>Title 1</p>
                            <p>รหัสหนังสือ</p>
                        </div>
                    </div>
                    <button className='text-white self-center lg:text-lg bg-light-purple px-2 rounded'>ดูคิว</button>
                </div>
                <hr className='w-1/3 self-center border-light-purple' />
            </div>
        </div>
    )
}

export default AllQueueBook