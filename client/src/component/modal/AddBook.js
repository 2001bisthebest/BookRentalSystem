import React from 'react'

const AddBook = ({ props }) => {
  return (
    <div>
      {props ?
        <div className='absolute inset-x-1/2 inset-y-1/3 bg-white-snow w-80 h-80 flex justify-center border rounded-lg p-10'>
          <form className='w-full h-full flex flex-col justify-center items-start'>
            <div className='w-50 h-50 flex justify-center border-gray'>
              <p>pic</p>
            </div>
            <div className='flex flex-col justify-center items-start'>
              <p>ชื่อหนังสือ :</p>
              <input type='text' />
              <p>ชื่อผู้แต่ง :</p>
              <input type='text' />
              <p>ชื่อผู้แปล :</p>
              <input type='text' />
            </div>
          </form>
        </div>
        : ""}
    </div>
  )
}

export default AddBook