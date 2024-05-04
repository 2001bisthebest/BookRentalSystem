import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { currentAdmin } from '../../functions/auth'
import { addStore } from '../../functions/store'
import { openStore as openStoreFn } from '../../functions/user'

const OpenStore = () => {
    const { user } = useSelector((state) => (state.user))
    const navigate = useNavigate()
    // currentUser(user.user.token).then(res => console.log('datafrom ', res))

    const openStore = async () => {
        try {
            await addStore(user.id, user.token).catch(err => console.log(err))
            await openStoreFn(user.id, user.token).catch(err => console.log(err))
            let adminRes = await currentAdmin(user.token, user.username)
            await new Promise(resolve => setTimeout(navigate('/storeinfo/' + adminRes.data._id), 1000))
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="w-full h-screen grow py-8 border flex flex-col justify-center gap-4 bg-white-bg items-center">
            <div className='w-[480px] p-20 border border-light-purple flex flex-col gap-10 items-center rounded-2xl'>
                <p>คุณยังไม่ได้เปิดใช้งานร้านเช่าของฉัน</p>
                <button onClick={openStore} className='bg-light-purple p-1 w-1/2 rounded-lg text-white'>เปิดใช้งาน</button>
            </div>
        </div>
    )
}

export default OpenStore