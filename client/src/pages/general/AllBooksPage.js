import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ListItems from '../../component/list/ListItems';

const AllBooksPage = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        // listBook().then(res => { console.log(res) }).catch(err => console.log(err))
        loadData()
    }, [])
    const loadData = async () => {
        await axios.get(process.env.REACT_APP_API + '/listbook')
            .then(res => {
                setData(res.data)
                console.log(res)
            })
            .catch(err => console.log(err))
    }
    console.log(data)
    return (
        <div className="w-full h-full grow py-8 border flex flex-col justify-start gap-4 bg-white-bg">
            <div>
                <p className='flex justify-start px-20 text-2xl font-bold'>หนังสือทั้งหมด</p>
            </div>
            <div className='px-20 py-5'>
                <ListItems children={data} />
            </div>
        </div>
    )
}

export default AllBooksPage