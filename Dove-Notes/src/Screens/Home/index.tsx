
import React, { useState } from 'react';
import { Plus } from 'Components/Buttons';
import { Tile } from 'Components/Tile';

interface Note {

}

const Login = () => {

    // const navigate = useNavigate();
    const [plusOpen, setPlusOpen] = useState(false);
    const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

    const onPlusClick = () => {
        setPlusOpen(!plusOpen);
    }

    const addNote = () => {
        setPlusOpen(false);
        setFilteredNotes([...filteredNotes, {}]);
    }

    return (
        <div className='relative min-h-screen h-screen bg-gradient-to-t from-purple-100 to-sky-300 flex justify-center overflow-auto'>
            <div className="container">
                <nav className='text-right text-white text-lg mx-5 my-4 font-bold select-nothing cursor-pointer' >Anonymous</nav>
                <div className='my-8 flex justify-center'>
                    <input type="text" placeholder='Quick Search' className='p-2 rounded-md outline-none shadow-lg focus:shadow-xl focus:scale-105 transition-transform' />
                </div>

                <div className="flex justify-center sticky top-3 my-8 mx-5 z-20">
                    <div className='w-full xl:w-[1050px] p-5 rounded-md shadow-lg overflow-hidden bg-white'>
                        <input type="text" placeholder='Title' className='w-full text-lg font-semibold outline-none' />
                        <input type="text" placeholder='Quick Note' className='w-full outline-none mt-2' />
                    </div>
                </div>

                <div className="flex justify-center md:relative">
                    <div className='grid grid-cols-1 gap-10 md:grid-cols-3  p-5'>
                    {
                        filteredNotes.map((note, ind) => <Tile key={ind} />)
                    }
                    <Tile />
                    {/* <Tile />
                    <Tile />
                    <Tile />
                    <Tile /> */}
                    </div>
                </div>

                <div className="h-64"></div>
                
                <div className='fixed right-0 bottom-0 m-5 select-nothing'>
                    <div data-open={plusOpen} onClick={addNote} className='absolute w-max opacity-0 bottom-32 cursor-pointer data-[open=true]:opacity-100 transition-opacity right-0 py-3 px-7 bg-blue-500 text-white font-medium rounded-md'>New File</div>
                    <div data-open={plusOpen} className='absolute w-max opacity-0 bottom-16 cursor-pointer data-[open=true]:opacity-100 transition-opacity right-0 py-3 px-7 bg-blue-500 text-white font-medium rounded-md'>New Folder</div>
                    <Plus open={plusOpen} styles="absolute z-10 bottom-0 right-0" action={onPlusClick} />
                </div> 
            </div>
            
        </div>
    )
}

export default Login;