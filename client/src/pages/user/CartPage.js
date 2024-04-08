import React from 'react'

const CartPage = () => {

    return (
        <div className="w-full h-full grow py-8 flex flex-col justify-start items-center gap-10 bg-white-bg">
            <div className='self-center'>
                <h1 className='font-bold text-xl pb-1'>ตระกร้า</h1>
                <hr className='border-light-purple w-20' />
            </div>
            <div className='flex flex-col gap-5 lg:gap-10 w-full px-20'>
                <div className='flex w-full justify-between'>
                    <div className='flex gap-5'>
                        <input type='checkbox' />
                        <div className='bg-light-gray w-24 h-24 lg:w-36 lg:h-36 rounded-lg'>
                        </div>
                        <div className='flex flex-col gap-1 lg:gap-2 justify-start items-start'>
                            <p>Title 1</p>
                            <p>Store name 1</p>
                            <p>จำนวนวันที่เช่า</p>
                        </div>
                    </div>
                    <h1 className='font-bold self-end lg:text-lg'>ราคา XX บาท</h1>
                </div>
                <hr className='w-1/3 self-center border-light-purple' />
            </div>
            <h1 className='font-bold self-end px-40 text-xl lg:text-2xl'>รวม XX บาท</h1>
            <div className='self-center'>
                <h1 className='font-bold text-xl pb-1'>ช่องทางการชำระเงิน</h1>
                <hr className='border-light-purple w-56' />
            </div>

            <div className='flex gap-10 px-20 w-full'>
                <div className='flex gap-10 w-full'>
                    <div className='bg-light-gray w-24 h-24 lg:w-36 lg:h-36 rounded-lg'>
                    </div>
                    <div className='flex flex-col gap-1 lg:gap-2 justify-start items-start'>
                        <p>ธนาคาร xxx</p>
                        <p>ชื่อบัญชี xxxxxx</p>
                        <p>x-xxx-xxxx-x</p>
                    </div>
                </div>
                <button className='self-center bg-light-purple px-2 py-1 text-white rounded-md'>อัพโหลดสลิป</button>
            </div>
            <button className='self-center bg-light-purple px-4 py-1 text-white rounded-md text-lg lg:text-xl font-bold'>ยืนยันการชำระเงิน</button>
        </div>
    )
}

export default CartPage