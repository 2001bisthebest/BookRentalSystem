import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { currentAdmin } from '../../functions/auth'

const AllQueueBook = () => {
    const [book, setBook] = useState([])
    const { user } = useSelector((state) => (state.user))
    const navigate = useNavigate()
    useEffect(() => {
        loadData();
    }, [user.id])
    const loadData = async () => {
        try {
            const adminResponse = await currentAdmin(user.token, user.username);
            const bookResponse = await axios.get(process.env.REACT_APP_API + '/queueliststore/' + adminResponse.data._id, {
                headers: {
                    authtoken: user.token
                }
            });
            setBook(bookResponse.data);
        } catch (error) {
            console.error(error);
        }
    };

    const onClickQueue = (id) => {
        navigate('/queuebookadmin/' + id)
    }
    return (
        <div className="w-full h-full grow py-20 border flex flex-col justify-start gap-10 bg-white-bg px-24">
            <h1 className='self-start font-bold text-lg lg:text-xl'>คิวหนังสือ</h1>
            {book.length > 0 ? book.map((item) =>
                <div className='flex flex-col gap-5 lg:gap-10 w-full ' key={item._id}>
                    <div className='flex w-full justify-between'>
                        <div className='flex gap-5 lg:gap-10'>
                            <div className='w-28 h-28 lg:w-36 lg:h-36 flex justify-center'>
                                <img src={process.env.REACT_APP_IMG + '/' + item.file} className='h-full rounded-lg' />
                            </div>
                            <div className='flex flex-col gap-1 lg:gap-2 justify-start items-start'>
                                <p className='font-semibold lg:text-lg'>{item.title}</p>
                                <p>รหัสหนังสือ</p>
                            </div>
                        </div>
                        <button type='button' className='text-white self-center lg:text-lg bg-light-purple px-2 rounded' onClick={() => onClickQueue(item._id)}>ดูคิว</button>
                    </div>
                    <hr className='w-1/3 self-center border-light-purple' />
                </div>
            ) : <p>ยังไม่มีคิว</p>}

        </div>
    )
}

export default AllQueueBook