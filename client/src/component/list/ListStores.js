import React from 'react'

const ListStores = ({ children }) => {
    return (
        <div className='w-full h-full flex flex-row gap-10 justify-items-stretch items-center flex-nowrap'>
            {children ? children.map(item =>
                <div className='flex flex-col gap-2'>
                    <div className='border w-40 h-40 bg-gray'>
                        <p>pic</p>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p>{item.name}</p>
                    </div>
                </div>
            )
                :
                <div className='flex flex-col gap-2'>
                    <div className='border w-40 h-40 bg-gray'>
                        <button>
                            <p>Don't have store</p>
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default ListStores