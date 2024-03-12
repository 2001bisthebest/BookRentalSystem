import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
        <div className="w-full h-full grow py-8 border flex flex-col justify-center gap-4 bg-white-bg">
            {/* <div className='items-center px-36'>
                        <Menubar />
                    </div> */}
            <div>
                <p className='flex justify-start px-20 text-2xl font-bold'>หนังสือทั้งหมด</p>
            </div>
            <div className='px-20 py-5'>
                {/* <ListItems /> */}
            </div>
        </div>
    )
}

export default AllBooksPage