import React from 'react'

const AddBook = ({ props }) => {
  return (
    <div className='relative '>
      {props ?
        <div className='absolute top-0 left-0 bottom-0 right-0 bg-white-snow w-96 h-80 flex justify-center border rounded-lg p-10'>
          <form className='w-full h-full flex flex-col justify-center items-start'>
            <div className='w-50 h-50 flex justify-center border-gray'>
              <p>pic</p>
            </div>
            <div className='grid grid-cols-2 justify-center items-start gap-2 w-full'>
              <p className='place-self-start font-bold'>ชื่อหนังสือ :</p>
              <input type='text' className='place-self-start' />
              <p className='place-self-start font-bold'>ชื่อผู้แต่ง :</p>
              <input type='text' />
              <p className='place-self-start font-bold'>ชื่อผู้แปล :</p>
              <input type='text' />
              <p className='place-self-start font-bold'>สำนักพิมพ์ :</p>
              <input type='text' />
              <p className='place-self-start font-bold'>ปีที่พิมพ์ :</p>
              <input type='text' />
              <p className='place-self-start font-bold'>ราคาเช่า :</p>
              <input type='text' />
              <p className='place-self-start font-bold'>จำนวน :</p>
              <input type='text' />
              <p className='place-self-start font-bold'>หมวดหมู่ :</p>
              <div className='grid grid-cols-4 gap-5'>
                <button type='button' className='p-1 border border-light-purple place-self-center rounded'>eiei</button>
                <button type='button' className='p-1 border border-light-purple place-self-center rounded'>eiei</button>
              </div>
            </div>
          </form>
        </div>
        : ""}
    </div>
  )
}

export default AddBook