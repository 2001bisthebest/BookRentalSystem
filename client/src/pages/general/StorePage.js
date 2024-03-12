import React from 'react'
import ListItems from '../../component/ListItems'

const StorePage = () => {
    return (
        <div className="w-full h-full grow py-8 border flex flex-col justify-center gap-4 bg-white-bg">
            {/* <div className='items-center mx-36'>
                        <Menubar />
                    </div> */}
            <div>
                <p className='flex justify-start px-20 text-2xl font-bold'>ร้านเช่า</p>
            </div>
            <div className='px-20 py-5'>
                <ListItems />
            </div>
        </div>
    )
}

export default StorePage