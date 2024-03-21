import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    const [category, setCategory] = useState([])
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        await axios.get(process.env.REACT_APP_API + '/listcategory').then(res => setCategory(res.data)).catch(err => console.log(err))
    }
    return (
        <div className='flex w-80 h-full bg-white-snow drop-shadow'>
            <div className='flex flex-col gap-2 px-10 py-20 items-start'>
                <Link to={'/'}><p>Little Reader</p></Link>
                <hr className='w-3/4 border-dark-purple' />
                <Link to={'/'}><p>หน้าหลัก</p></Link>
                <Link to={'/store'}><p>ร้านเช่า</p></Link>
                <Link to={'/category'}><p>หมวดหมู่</p></Link>
                <ul className='flex flex-col items-start px-2 list-disc list-inside'>
                    {category ? category.map((items) =>
                        <li key={items._id}>
                            {items.name}
                        </li>) : ''}
                </ul>
                <p>สมาชิก</p>
                <ul className='flex flex-col items-start px-2 list-disc list-inside'>
                    <li>ข้อมูลส่วนตัว</li>
                    <li>หนังสือที่จองคิวไว้</li>
                    <li>ร้านเช่าของฉัน</li>
                </ul>
                <p>กฏการใช้งาน</p>
                <p>ติดต่อเรา</p>
            </div>
        </div>
    )
}

export default Sidebar