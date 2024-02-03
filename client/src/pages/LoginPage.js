import React from 'react'

const LoginPage = () => {
    return (
        <div className='bg-dark-purple w-screen h-screen flex flex-col gap-10 justify-center items-center'>
            <div>
                <h1 className='text-white text-5xl md:text-6xl font-bold'>Little Reader</h1>
            </div>
            <div className='flex flex-col gap-5 p-10 items-center'>
                <input className='p-6 rounded-xl w-60 h-8 md:w-80' placeholder='Username' />
                <input type='password' className='p-6 rounded-xl w-60 h-8 md:w-80' placeholder='Password' />
            </div>
            <div className='flex flex-col gap-1 items-center'>
                <button className='bg-light-purple px-6 py-2 rounded w-1.4 md:w-2/3'><p className='text-white'>Sign In</p></button>
                <div className='flex gap-1 text-white'>
                    <p>You don't have an account?</p>
                    <p className='underline'>Register</p>
                </div>

            </div>
        </div>
    )
}

export default LoginPage