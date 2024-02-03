import React from 'react'
import MediaQuery from 'react-responsive'

const RegisterPage = () => {
    return (
        <div className='bg-dark-purple w-screen h-screen flex flex-col gap-10 justify-center items-center'>
            <div>
                <h1 className='text-white text-6xl font-bold'>Little Reader</h1>
            </div>
            <MediaQuery minWidth={1284}>
                {(matches) => matches ?
                    <div className='flex flex-col gap-10 items-center w-1/2 bg-white-bg rounded-2xl'>
                        <div className='w-full px-10 pt-10 flex  justify-center gap-20'>
                            <div className='flex flex-col gap-5'>
                                <div className='flex flex-row gap-5 items-center'>
                                    <p>Username</p>
                                    <input className='p-1' placeholder='littleReader123' />
                                </div>
                                <div className='flex flex-row gap-5 items-center'>
                                    <p>Password</p>
                                    <input type='password' className='p-1' placeholder='password' />
                                </div>
                                <div className='flex flex-row gap-5 items-center'>
                                    <p>Name</p>
                                    <input className='p-1' placeholder='name' />
                                </div>
                                <div className='flex flex-row gap-5 items-center'>
                                    <p>E-mail</p>
                                    <input className='p-1' placeholder='example@littlereader.com' />
                                </div>
                            </div>
                            <div className='flex flex-col gap-5'>
                                <div className='flex flex-row gap-5 grow items-center'>
                                    <p>Address</p>
                                    <input className='p-1' placeholder='xx/xx Bangkok 1xxxx' />
                                </div>
                                <div className='flex flex-row gap-5 items-center'>
                                    <p>Telephone</p>
                                    <input className='p-1' placeholder='0xx-xxx-xxxx' />
                                </div>
                                <div className='flex flex-row gap-5 items-center'>
                                    <p>Type of book that you like</p>
                                    <select>
                                        <option value="fiction">fiction</option>
                                        <option value="nonfiction">non-fiction</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='pb-10'>
                            <button className='bg-light-purple opacity-75 p-4 rounded-lg hover:opacity-100'><p className='text-white'>Register Now</p></button>
                        </div>
                    </div>
                    :
                    <div className='flex flex-col gap-10 items-center w-1/2 bg-white-bg rounded-2xl'>
                        <div className='w-full px-10 pt-10 flex  justify-center gap-20'>
                            <div className='flex flex-col gap-5'>
                                <div className='flex flex-row gap-5 items-center'>
                                    <p>Username</p>
                                    <input className='p-1' placeholder='littleReader123' />
                                </div>
                                <div className='flex flex-row gap-5 items-center'>
                                    <p>Password</p>
                                    <input type='password' className='p-1' placeholder='password' />
                                </div>
                                <div className='flex flex-row gap-5 items-center'>
                                    <p>Name</p>
                                    <input className='p-1' placeholder='name' />
                                </div>
                                <div className='flex flex-row gap-5 items-center'>
                                    <p>E-mail</p>
                                    <input className='p-1' placeholder='example@littlereader.com' />
                                </div>
                                <div className='flex flex-row gap-5 grow items-center'>
                                    <p>Address</p>
                                    <input className='p-1' placeholder='xx/xx Bangkok 1xxxx' />
                                </div>
                                <div className='flex flex-row gap-5 items-center'>
                                    <p>Telephone</p>
                                    <input className='p-1' placeholder='0xx-xxx-xxxx' />
                                </div>
                                <div className='flex flex-row gap-5 items-center'>
                                    <p>Type of book that you like</p>
                                    <select>
                                        <option value="fiction">fiction</option>
                                        <option value="nonfiction">non-fiction</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='pb-10'>
                            <button className='bg-light-purple opacity-75 p-4 rounded-lg hover:opacity-100'><p className='text-white'>Register Now</p></button>
                        </div>
                    </div>
                }
            </MediaQuery>
        </div>
    )
}

export default RegisterPage