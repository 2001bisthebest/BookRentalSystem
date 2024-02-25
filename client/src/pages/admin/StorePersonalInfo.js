import React from 'react'

const StorePersonalInfo = () => {
    return (
        <div className='grid grid-row-1 w-full h-full'>
            <div className='w-full h-full'>
                <Navbar />
            </div>
            <div className='flex w-full h-full'>
                <Sidebar />
                <div className="w-full h-full grow py-8 border flex flex-col justify-center gap-4 bg-white-bg">
                    <div>
                        <p>store name</p>
                    </div>
                </div>
            </div>
            <div className='w-full h-full'>
                <Footer />
            </div>
        </div>
    )
}

export default StorePersonalInfo