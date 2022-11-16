
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from 'Components/Logo';


const Login = () => {

    const navigate = useNavigate();

    return (
        <div className='h-screen bg-gradient-to-t from-purple-100 to-sky-300 flex justify-center'>
            <div className="container flex justify-center items-center">
                <div className='h-auto w-auto flex flex-col justify-center items-center shadow-lg bg-gray-50 rounded-lg py-10 px-6 sm:p-10' >
                    <Logo />
                    <div className='text-lg font-medium my-3'>Login</div>
                    <input placeholder="email" type='text' name="dove-notes-username" size={22}  className="p-2 pl-4 my-3 outline-none border-2 rounded-md"  />
                    <input placeholder="password" type="password" name="dove-notes-password" size={22} className="p-2 pl-4 my-3 outline-none border-2 rounded-md"  />
                    <div className='w-full text-sm text-right'>
                        <span className='cursor-pointer'>Forget password?</span>
                    </div>
                    <button onClick={() => navigate('/home', { replace: true })} className='bg-blue-500 mt-5 hover:bg-blue-600 text-white font-bold py-2 px-4 border border-blue-700 rounded'>Login</button>
                    <div className='w-full mt-10 text-sm text-right'>
                        Don't have an account?
                        <span onClick={() => navigate('/register', { replace: true })} className='cursor-pointer font-semibold'> Create one</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;