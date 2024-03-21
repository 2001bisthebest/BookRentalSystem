import React from 'react';
import TabScrollItems from '../../component/list/TabScrollItems';
import book from '../../images/book.jpg';

function MainPage() {
    return (
        <div className="w-full h-full grow py-8 border flex flex-col justify-center gap-4 bg-white-bg">
            {/* <div className='items-center mx-36'>
                        <Menubar />
                    </div> */}
            <div className='flex justify-center my-5 w-full overflow-hidden'>
                <img src={book} />
            </div>
            <div className='flex flex-col w-full h-full px-20 items-center justify-center gap-10'>
                <p>หนังสือแนะนำ</p>
                <TabScrollItems />
                <p>หนังสือใหม่</p>
                <TabScrollItems />
            </div>
        </div>
    );
}

export default MainPage;