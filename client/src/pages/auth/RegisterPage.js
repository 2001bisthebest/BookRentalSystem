import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
    const [form, setForm] = useState({})
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
        if (e.target.name === 'file') {
            setForm({
                ...form,
                [e.target.name]: e.target.files[0]
            })
        } else {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })
        }
    }
    const handleClick = async (e) => {
        e.preventDefault()
        console.log(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(form.profile)
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
            typeofbook: formWithImgData.get("typeofbook"),
            file: formWithImgData.get("file"),
        };
        console.log(register)

        await axios.post(process.env.REACT_APP_API + '/register', register).then((res) => {
            console.log(res.data)
            navigate('/')
        }).catch((err) => console.log(err))
    }

    return (
        <div className='bg-dark-purple w-full h-full lg:h-screen grid grid-cols-1 gap-10 justify-center items-center pt-10 pb-10 font-noto-sans-thai'>
            <div>
                <h1 className='text-white text-5xl md:text-6xl font-bold'>Little Reader</h1>
            </div>
            <form className='w-full flex justify-center' onSubmit={handleSubmit} encType='multipart/form-data'>
                <div className='flex flex-col gap-10 lg:gap-3 items-center w-1/2 bg-white-bg rounded-2xl'>
                    <div className='grid grid-cols-3 justify-items-start content-center gap-5 p-10 lg:p-20'>
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
                        {/* <select name='typeofbook' onChange={e => handleChange(e)}>
                            <option value="fiction">fiction</option>
                            <option value="nonfiction">non-fiction</option>
                        </select> */}
                        <div className='w-full grid grid-cols-2 col-span-2'>
                            {category ? category.map((item) =>
                                <button type='button' className='border border-dark-purple m-1 text-sm rounded' key={item._id} value={item._id} onClick={e => handleClick(e)}>{item.name}</button>
                            ) : 'eiei'}
                        </div>
                        <p>รูป profile</p>
                        <input type='file' name='file' onChange={e => handleChange(e)} />
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