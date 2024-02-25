import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
    const [form, setForm] = useState({})
    const navigate = useNavigate()
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const login = {
            username: data.get("username"),
            password: data.get("password")
        }
        await axios.post(process.env.REACT_APP_API + '/login', login).then((res) => {
            console.log(res)
            navigate('/')
        }).catch(err => console.log(err))
    }
    return (
        <div className='bg-dark-purple w-screen h-screen flex flex-col gap-10 justify-center items-center'>
            <form className='flex flex-col gap-10' onSubmit={handleSubmit}>
                <div>
                    <h1 className='text-white text-5xl md:text-6xl font-bold'>Little Reader</h1>
                </div>
                <div className='flex flex-col gap-5 p-10 items-center'>
                    <input type='text' name='username' className='p-6 rounded-xl w-60 h-8 md:w-80' placeholder='Username' onChange={e => handleChange(e)} />
                    <input type='password' name='password' className='p-6 rounded-xl w-60 h-8 md:w-80' placeholder='Password' onChange={e => handleChange(e)} />
                </div>
                <div className='flex flex-col gap-1 items-center'>
                    <button className='bg-light-purple px-6 py-2 rounded w-1.4 md:w-2/3'><p className='text-white'>Sign In</p></button>
                    <div className='flex gap-1 text-white'>
                        <p>You don't have an account?</p>
                        <p className='underline'>Register</p>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default LoginPage