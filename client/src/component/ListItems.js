import React from 'react'

const ListItems = ({ children }) => {
    return (
        <div className='w-full h-full flex flex-row gap-10 justify-items-stretch items-center flex-nowrap overflow-x-scroll'>
            {children ? children.map(item =>
                <div className='flex flex-col gap-2'>
                    <div className='border w-40 h-40 bg-gray'>
                        <p>pic</p>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p>{item.title}</p>
                        <p>{item.price}</p>
                    </div>
                </div>

            )
                :
                <div>
                    eiei
                </div>
            }
        </div>
    )
}

export default ListItems