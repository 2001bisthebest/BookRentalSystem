import axios from 'axios'
import React, { useState } from 'react'
import MediaQuery from 'react-responsive'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {

    const [form, setForm] = useState({})
    const navigate = useNavigate()
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
        <div className='bg-dark-purple w-screen h-screen flex flex-col gap-10 justify-center items-center'>
            <div>
                <h1 className='text-white text-6xl font-bold'>Little Reader</h1>
            </div>
            <form className='w-full flex justify-center' onSubmit={handleSubmit} encType='multipart/form-data'>
                <MediaQuery minWidth={1284}>
                    {(matches) => matches ?
                        <div className='flex flex-col gap-10 items-center w-1/2 bg-white-bg rounded-2xl'>
                            <div className='w-full px-10 pt-10 flex  justify-center gap-20'>
                                <div className='flex flex-col gap-5'>
                                    <div className='flex flex-row gap-5 items-center'>
                                        <p>Username</p>
                                        <input type='text' name='username' className='p-1' placeholder='littleReader123' onChange={e => handleChange(e)} />
                                    </div>
                                    <div className='flex flex-row gap-5 items-center'>
                                        <p>Password</p>
                                        <input type='password' name='password' className='p-1' placeholder='password' onChange={e => handleChange(e)} />
                                    </div>
                                    <div className='flex flex-row gap-5 items-center'>
                                        <p>Name</p>
                                        <input type='text' name='name' className='p-1' placeholder='name' onChange={e => handleChange(e)} />
                                    </div>
                                    <div className='flex flex-row gap-5 items-center'>
                                        <p>E-mail</p>
                                        <input type='text' name='email' className='p-1' placeholder='example@littlereader.com' onChange={e => handleChange(e)} />
                                    </div>
                                </div>
                                <div className='flex flex-col gap-5'>
                                    <div className='flex flex-row gap-5 grow items-center'>
                                        <p>Address</p>
                                        <input type='text' name='address' className='p-1' placeholder='xx/xx Bangkok 1xxxx' onChange={e => handleChange(e)} />
                                    </div>
                                    <div className='flex flex-row gap-5 items-center'>
                                        <p>Telephone</p>
                                        <input type='number' name='telephone' className='p-1' placeholder='0xx-xxx-xxxx' onChange={e => handleChange(e)} />
                                    </div>
                                    <div className='flex flex-row gap-5 items-center'>
                                        <p>Type of book that you like</p>
                                        <select name='typeofbook' onChange={e => handleChange(e)}>
                                            <option value="fiction">fiction</option>
                                            <option value="nonfiction">non-fiction</option>
                                        </select>
                                    </div>
                                    <div className='flex flex-row gap-5 items-center'>
                                        <p>profile</p>
                                        <input type='file' name='file' onChange={e => handleChange(e)} />
                                    </div>
                                </div>
                            </div>
                            <div className='pb-10'>
                                <button type='submit' className='bg-light-purple opacity-75 p-4 rounded-lg hover:opacity-100'><p className='text-white'>Register Now</p></button>
                            </div>
                        </div>
                        :
                        <div className='flex flex-col gap-10 items-center w-1/2 bg-white-bg rounded-2xl'>
                            <div className='w-full px-10 pt-10 flex  justify-center gap-20'>
                                <div className='flex flex-col gap-5'>
                                    <div className='flex flex-row gap-5 items-center'>
                                        <p>Username</p>
                                        <input type='text' name='username' className='p-1' placeholder='littleReader123' onChange={e => handleChange(e)} />
                                    </div>
                                    <div className='flex flex-row gap-5 items-center'>
                                        <p>Password</p>
                                        <input type='password' name='password' className='p-1' placeholder='password' onChange={e => handleChange(e)} />
                                    </div>
                                    <div className='flex flex-row gap-5 items-center'>
                                        <p>Name</p>
                                        <input type='text' name='name' className='p-1' placeholder='name' onChange={e => handleChange(e)} />
                                    </div>
                                    <div className='flex flex-row gap-5 items-center'>
                                        <p>E-mail</p>
                                        <input type='text' name='email' className='p-1' placeholder='example@littlereader.com' onChange={e => handleChange(e)} />
                                    </div>
                                    <div className='flex flex-row gap-5 grow items-center'>
                                        <p>Address</p>
                                        <input type='text' name='address' className='p-1' placeholder='xx/xx Bangkok 1xxxx' onChange={e => handleChange(e)} />
                                    </div>
                                    <div className='flex flex-row gap-5 items-center'>
                                        <p>Telephone</p>
                                        <input type='number' name='telephone' className='p-1' placeholder='0xx-xxx-xxxx' onChange={e => handleChange(e)} />
                                    </div>
                                    <div className='flex flex-row gap-5 items-center'>
                                        <p>Type of book that you like</p>
                                        <select name='typeofbook' onChange={e => handleChange(e)}>
                                            <option value="fiction">fiction</option>
                                            <option value="nonfiction">non-fiction</option>
                                        </select>
                                    </div>
                                    <div className='flex flex-row gap-5 items-center'>
                                        <p>profile</p>
                                        <input type='file' name='file' onChange={e => handleChange(e)} />
                                    </div>
                                </div>
                            </div>
                            <div className='pb-10'>
                                <button type='submit' className='bg-light-purple opacity-75 p-4 rounded-lg hover:opacity-100'><p className='text-white'>Register Now</p></button>
                            </div>
                        </div>
                    }
                </MediaQuery>
            </form>
        </div>
    )
}

export default RegisterPage