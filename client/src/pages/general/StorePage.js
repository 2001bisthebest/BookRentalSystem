import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ListStores from '../../component/list/ListStores'

const StorePage = () => {
    const [data, setData] = useState([])
    const loadData = async () => {
        await axios.get(process.env.REACT_APP_API + '/storelist').then(res => setData(res.data)).catch(err => console.log(err))
    }
    useEffect(() => {
        loadData()
    }, [])
    return (
        <div className="w-full h-full grow py-8 border flex flex-col justify-start gap-4 bg-white-bg">
            <div>
                <p className='flex justify-start px-20 text-2xl font-bold'>ร้านเช่า</p>
            </div>
            <div className='px-20 py-5'>
                <ListStores children={data} />
            </div>
        </div>
    )
}

export default StorePage