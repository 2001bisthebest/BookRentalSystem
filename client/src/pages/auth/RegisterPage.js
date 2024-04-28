import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
    const [form, setForm] = useState({ bookPref: [] })
    const navigate = useNavigate()
    const [category, setCategory] = useState([])
    useEffect(() => {
        loadData()
    }, [])
    const loadData = async () => {
        await axios.get(process.env.REACT_APP_API + '/listcategory')
            .then(res => {
                console.log(res.data)
                setCategory(res.data)
            })
    }
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'file') {
            setForm({
                ...form,
                [name]: files[0]
            });
        } else if (type === 'checkbox') {
            if (name === 'bookPref') {
                const newSet = new Set(form.bookPref || []);
                if (checked) {
                    newSet.add(value);
                } else {
                    newSet.delete(value);
                }
                setForm({
                    ...form,
                    [name]: Array.from(newSet)
                });
            }
        } else {
            setForm({
                ...form,
                [name]: value
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formWithImgData = new FormData()
        for (const key in form) {
            formWithImgData.append(key, form[key])
        }
        console.log(formWithImgData.get("file"))
        // const data = new FormData(e.currentTarget)
        const register = {
            username: formWithImgData.get("username"),
            password: formWithImgData.get("password"),
            name: formWithImgData.get("name"),
            email: formWithImgData.get("email"),
            address: formWithImgData.get("address"),
            telephone: formWithImgData.get("telephone"),
            file: formWithImgData.get("file"),
        };
        try {
            const response = await axios.post(process.env.REACT_APP_API + '/register', register);
            console.log(response.data);
            const userId = response.data;

            if (userId && userId._id) {
                const bookPrefResponse = await axios.post(process.env.REACT_APP_API + '/addbookpref', {
                    AccId: userId._id,
                    CategoryId: form.bookPref
                });
                navigate('/');
            } else {
                console.error("Invalid user ID returned from registration.");
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='bg-dark-purple w-full h-full xl:pb-24 grid grid-cols-1 gap-10 justify-center items-center pt-10 pb-12 font-noto-sans-thai'>
            <div>
                <h1 className='text-white text-5xl md:text-6xl font-bold'>Little Reader</h1>
            </div>
            <form className='w-full flex justify-center' onSubmit={handleSubmit} encType='multipart/form-data'>
                <div className='flex flex-col gap-10 lg:gap-3 items-center w-1/2 bg-white-bg rounded-2xl'>
                    <div className='w-full grid grid-cols-3 justify-items-start content-center gap-5 p-10 lg:p-20'>
                        <p>Username</p>
                        <input type='text' name='username' className='p-1 w-full col-span-2 border border-gray-400 rounded-lg' placeholder='littleReader123' onChange={e => handleChange(e)} />
                        <p>Password</p>
                        <input type='password' name='password' className='p-1 w-full col-span-2 border border-gray-400 rounded-lg' placeholder='password' onChange={e => handleChange(e)} />
                        <p>ชื่อ</p>
                        <input type='text' name='name' className='p-1 w-full col-span-2 border border-gray-400 rounded-lg' placeholder='name' onChange={e => handleChange(e)} />
                        <p>E-mail</p>
                        <input type='text' name='email' className='p-1 w-full col-span-2 border border-gray-400 rounded-lg' placeholder='example@littlereader.com' onChange={e => handleChange(e)} />
                        <p>ที่อยู่</p>
                        <input type='text' name='address' className='p-1 w-full col-span-2 border border-gray-400 rounded-lg' placeholder='xx/xx Bangkok 1xxxx' onChange={e => handleChange(e)} />
                        <p>เบอร์โทร</p>
                        <input type='number' name='telephone' className='p-1 w-full col-span-2 border border-gray-400 rounded-lg' placeholder='0xx-xxx-xxxx' onChange={e => handleChange(e)} />
                        <p>หนังสือที่สนใจ</p>
                        <div className='w-full grid grid-cols-2 col-span-2 xl:grid-cols-3'>
                            {category ? category.map((item) =>
                                // <button type='button' className='border border-dark-purple m-1 text-sm rounded focus:bg-light-purple focus:text-white focus:border-none' key={item._id} value={item._id} onClick={e => handleClick(e)}>{item.name}</button>
                                <div className='w-full flex gap-1' key={item._id}>
                                    <input
                                        type='checkbox'
                                        name='bookPref'
                                        value={item._id}
                                        checked={form.bookPref?.includes(item._id)}
                                        onChange={handleChange}
                                    />
                                    <label>{item.name}</label>
                                </div>
                            ) : <p>ไม่มีหมวดหมู่หนังสือ</p>}
                        </div>
                        <p>รูป profile</p>
                        <input type='file' name='file' className='col-span-2 w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100' onChange={e => handleChange(e)} />
                    </div>
                    <div className='pb-10'>
                        <button type='submit' className='bg-light-purple opacity-75 p-4 rounded-lg hover:opacity-100 font-semibold'><p className='text-white'>Register Now</p></button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage