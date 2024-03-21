import React from 'react'

const ListItems = ({ children }) => {
    return (
        <div className='w-full h-full flex flex-row gap-10 justify-items-stretch items-center flex-nowrap'>
            {children ? children.map(item =>
                <div className='relative flex flex-col gap-2'>
                    <div className='absolute top-2 right-2 w-12 h-6 rounded bg-[#5DD971] text-white drop-shadow-md'>
                        <p>ว่าง</p>
                    </div>
                    <div className='border w-40 h-40 bg-gray'>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p>{item.title}</p>
                        <p>{item.price}</p>
                    </div>
                </div>
            )
                :
                <div className='flex flex-col gap-2'>
                    {/* <div className='border w-40 h-40 bg-gray'>
                        <button>
                            <p>Add book</p>
                        </button>
                    </div> */}
                </div>
            }
        </div>
    )
}

export default ListItems