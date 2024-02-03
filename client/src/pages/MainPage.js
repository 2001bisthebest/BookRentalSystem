import React from 'react';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import Sidebar from '../component/Sidebar';
import TabScrollItems from '../component/TabScrollItems';
import book from '../images/book.jpg';

function MainPage() {
    return (
        <div className='grid grid-row-1 w-full h-full'>
            <div className='w-full h-full'>
                <Navbar />
            </div>
            <div className='flex w-full h-full'>
                <Sidebar />
                <div className="w-full h-full grow py-8 border flex flex-col justify-center gap-4 bg-white-bg">
                    {/* <div className='items-center mx-36'>
                        <Menubar />
                    </div> */}
                    <div className='mx-20 my-10'>
                        <img src={book} />
                    </div>
                    <div className='flex flex-col w-full h-full px-20 items-center justify-center gap-10'>
                        <p>หนังสือแนะนำ</p>
                        <TabScrollItems />
                        <p>หนังสือใหม่</p>
                        <TabScrollItems />
                    </div>
                </div>
            </div>
            <div className='w-full h-full'>
                <Footer />
            </div>
        </div>
    );
}

export default MainPage;