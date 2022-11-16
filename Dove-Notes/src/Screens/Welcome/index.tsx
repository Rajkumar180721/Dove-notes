import React from 'react';
// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../Components/Logo';
// import {
//     RootContainer
// } from 'style.js';

const Welcome = () => {

    const navigate  = useNavigate();

    // const [enterCode, setEnterCode] = useState(false);

    // const EnterCodeClick = () => {
    //     if ()
    // }
    
    return (
        <div className='h-screen bg-gradient-to-t from-purple-100 to-sky-300 flex justify-center'>
            <nav className='absolute right-0 mr-5 mt-4 font-medium cursor-pointer' >Anonymous</nav>
            <div className="container flex justify-center items-center">
                <div className='h-auto w-auto sm:w-[30rem] flex flex-col justify-center items-center shadow-lg bg-gray-50 rounded-lg py-10 px-6 sm:p-10' >
                    <Logo />
                    <div className='font-medium'>Welcome to Dove Notes</div>
                    <button onClick={() => navigate('/login')} className='bg-blue-500 mt-5 hover:bg-blue-600 text-white font-bold py-2 px-4 border border-blue-700 rounded'>Create Notes</button>
                    {/* <div className='mt-3 cursor-pointer' onClick={EnterCodeClick} >Enter code</div>
                    <button className='bg-blue-500 mt-5 hover:bg-blue-600 text-white font-bold py-2 px-4 border border-blue-700 rounded'>View</button> */}
                </div>
            </div>
        </div>
    );
}

export default Welcome