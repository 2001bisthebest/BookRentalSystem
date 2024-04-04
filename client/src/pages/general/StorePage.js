import axios from 'axios'
import React, { useEffect, useState } from 'react'

const StorePage = () => {
    const [data, setData] = useState([])
    const loadData = async () => {
        await axios.get(process.env.REACT_APP_API + '/storelist').then(res => setData(res.data)).catch(err => console.log(err))
    }
    useEffect(() => {
        loadData()
    }, [])
    return (
        <div className="w-full h-screen grow py-20 border flex flex-col justify-start gap-4 bg-white-bg">
            <div>
                <p className='flex justify-start px-20 text-2xl font-bold'>ร้านเช่า</p>
            </div>
            <div className='px-20 py-5'>
                <div className='w-full h-full flex flex-row gap-10 justify-items-stretch items-center flex-nowrap'>
                    {data ? data.map(item =>
                        <div className='flex flex-col gap-2'>
                            <a href={`/store/${item._id}`} className='w-full h-full'>{item.file ? <img src={process.env.REACT_APP_IMG + "/" + item.file} className='w-full h-full rounded-lg drop-shadow-md'></img> : ""}</a>
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
            </div>
        </div>
    )
}

export default StorePage