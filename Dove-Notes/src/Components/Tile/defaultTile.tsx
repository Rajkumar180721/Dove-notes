
import { useEffect, useState } from 'react';
import { BiMessageSquareEdit } from 'react-icons/bi';
import { MdOutlineContentCopy } from 'react-icons/md';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom';
import { Note } from 'Utils';


export type NoteProps =  {
    note: Note,
    save: (note: Note) => void
};

const Tile = ({note, save}:NoteProps) => {

    const navigate = useNavigate();
    const query = new URLSearchParams(useLocation().search);
    const selected = query.get('selected');
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);


    const changeEdit = (state: boolean) => {
        if (edit || open)
            save(note);
        setEdit(state);
        setOpen(state);
    }

    // const onChange = () => {};
    const onChange = (text: object) => save({...note, ...text});
    
    return (
        <>
            <div data-open={open} onClick={() => setOpen(true)} className={`relative h-52 w-full bg-white rounded-md shadow-md p-5 select-nothing md:h-64 md:w-96`}>
                <BiMessageSquareEdit title="edit" onClick={e => {e.stopPropagation(); changeEdit(true);}} className='absolute h-6 sm:h-10 w-10 right-14 top-2 sm:p-2 bg-transparent cursor-pointer' color="rgba(0, 0, 0, .6)" />
                <MdOutlineContentCopy title="Copy" onClick={e => e.stopPropagation()} className='absolute h-6 sm:h-10 w-10 right-3 top-2 sm:p-2 bg-transparent cursor-pointer' color="rgba(0, 0, 0, .6)" />
                <div className="font-bold text-lg text-gray-500 mt-4 sm:mt-8">{note.title || "Title"}</div>
                <div className="text-gray-500 font-normal py-3">{note.content || "Note"}</div>
            </div>
            {
                open &&
                <div className='fixed h-full w-full top-0 left-0 z-30'>
                    <div onClick={() => changeEdit(false)} className='absolute h-full w-full top-0 left-0 bg-black bg-opacity-60'></div>
                    <div onClick={e => e.stopPropagation()}  className="absolute h-full w-full top-0 left-0 right-0 bottom-0 p-8 bg-white rounded-md shadow-md select-nothing z-30 md:fixed md:w-9/12 md:h-[30rem] md:max-h-fit md:m-auto">
                        <AiOutlineArrowLeft title="back" onClick={() => changeEdit(false)} className='block sm:hidden absolute left-3 top-2 p-2 bg-transparent rounded-full cursor-pointer' size={42} color="rgba(0, 0, 0, .6)" />
                        {
                            !edit &&
                            <BiMessageSquareEdit onClick={() => changeEdit(true)} title="edit" className='absolute right-14 top-3 cursor-pointer' size={26} color="rgba(0, 0, 0, .6)" />
                        }
                        <MdOutlineContentCopy title="edit" className='absolute right-3 top-3 cursor-pointer' size={26} color="rgba(0, 0, 0, .6)" />
                        {
                            edit
                            ?
                            <>
                            <input autoFocus={true} type="text" placeholder='Title' defaultValue={note.title} onChange={e => onChange({title: e.target.value})} className="block w-full font-bold text-lg text-gray-500 p-5 mt-2 outline-none" />
                            <textarea placeholder='Note' onChange={e => onChange({content: e.target.value})} defaultValue={note.content} className="h-5/6 w-full text-gray-500 font-normal p-6 resize-none scrollbar outline-none" draggable={false} />
                            </>
                            :
                            <>
                            <div className="font-bold text-lg text-gray-500 p-5 mt-2">{note.title}</div>
                            <div className="text-gray-500 font-normal p-6">{note.content}</div>
                            </>
                        }
                    </div>
                </div>
            }
        </>
    );
}

export default Tile;