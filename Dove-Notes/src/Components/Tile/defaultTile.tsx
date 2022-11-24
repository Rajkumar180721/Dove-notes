
import { useState } from 'react';
import { BiMessageSquareEdit } from 'react-icons/bi';
import { MdOutlineContentCopy } from 'react-icons/md';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { TiDocumentDelete, TiTickOutline } from 'react-icons/ti';
import { useLocation, useNavigate } from 'react-router-dom';
import { Popup } from 'Components/Popup';
import { Note } from 'Utils';


type NoteProps =  {
    note: Note,
    save: (note: Note) => void,
    deleteNote: (note: Note) => void,
};

type textProp = {
    title?: string,
    content?: string,
}

const Tile = ({note, save, deleteNote}:NoteProps) => {

    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const selected = query.get('selected');
    const [edit, setEdit] = useState<boolean>(false);
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);


    const openTile = (editEnabled?:boolean) => {
        const path = location.pathname;
        navigate(path+'?selected='+note.id);
        if (editEnabled)
            setEdit(true);
    }

    const closeTile = () => {
        setEdit(false);
        navigate(-1);
    }
    
    // const onChange = () => {};
    const onChange = (text: textProp) => save({...note, ...text});
    
    return (
        <>
            <div data-open={selected === note.id} onClick={() => openTile()} className={`relative h-52 w-full bg-white rounded-md shadow-md p-5 select-nothing md:h-64 md:w-96`}>
                <BiMessageSquareEdit title="edit" onClick={e => {e.stopPropagation(); openTile(true);}} className='absolute h-6 sm:h-10 w-10 right-14 top-2 sm:p-2 bg-transparent cursor-pointer' color="rgba(0, 0, 0, .6)" />
                <MdOutlineContentCopy title="Copy" onClick={e => e.stopPropagation()} className='absolute h-6 sm:h-10 w-10 right-3 top-2 sm:p-2 bg-transparent cursor-pointer' color="rgba(0, 0, 0, .6)" />
                <div className="font-bold text-lg text-gray-500 mt-4 sm:mt-8">{note.title || "Title"}</div>
                <div className="text-gray-500 font-normal py-3">{note.content || "Note"}</div>
            </div>
            {
                selected === note.id &&
                <div className='fixed h-full w-full top-0 left-0 z-30'>
                    <div onClick={closeTile} className='absolute h-full w-full top-0 left-0 bg-black bg-opacity-60'></div>
                    <div onClick={e => e.stopPropagation()}  className="absolute h-full w-full top-0 left-0 right-0 bottom-0 p-8 bg-white rounded-md shadow-md select-nothing z-30 md:fixed md:w-9/12 md:h-[30rem] md:max-h-fit md:m-auto">
                        <AiOutlineArrowLeft title="back" onClick={closeTile} className='block sm:hidden absolute left-3 top-2 p-2 bg-transparent rounded-full cursor-pointer' size={42} color="rgba(0, 0, 0, .6)" />
                        {
                            edit
                            ?
                            <TiTickOutline onClick={closeTile} title="Save" className='absolute right-14 top-3 cursor-pointer' size={26} color="rgba(0, 0, 0, .6)" />
                            :
                            <BiMessageSquareEdit onClick={() => setEdit(true)} title="edit" className='absolute right-14 top-3 cursor-pointer' size={26} color="rgba(0, 0, 0, .6)" />
                        }
                        <MdOutlineContentCopy title="Edit" className='absolute right-3 top-3 cursor-pointer' size={25} color="rgba(0, 0, 0, .6)" />
                        <TiDocumentDelete title="Delete" onClick={() => setConfirmDelete(true)} className='absolute right-24 top-3 cursor-pointer' size={28} color="rgba(0, 0, 0, .6)" />
                        {
                            edit
                            ?
                            <>
                            <input autoFocus={true} type="text" placeholder='Title' defaultValue={note.title} onChange={e => onChange({title: e.target.value})} className="block w-full font-bold text-lg text-gray-500 p-5 mt-2 outline-none" />
                            <textarea placeholder='Note' onChange={e => onChange({content: e.target.value})} defaultValue={note.content} className="h-5/6 w-full text-gray-500 font-normal p-6 resize-none scrollbar outline-none" draggable={false} />
                            </>
                            :
                            <>
                            <div className="font-bold text-lg text-gray-500 p-5 mt-2">{note.title || "Title"}</div>
                            <div className="text-gray-500 font-normal p-6">{note.content || "Note"}</div>
                            </>
                        }
                    </div>
                    {
                        confirmDelete &&
                        <Popup text="Are you sure you want to delete this?" primary={() => deleteNote(note)} secondary={() => setConfirmDelete(false)} />
                    }
                </div>
            }
        </>
    );
}

export default Tile;