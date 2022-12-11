
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { NotebookModel } from "Utils";
// import { BiMessageSquareEdit } from 'react-icons/bi';
// import { MdDeleteForever } from 'react-icons/md';

type props = {
    id: string,
    name: string,
    selected: string,
    saveLabel: (label: NotebookModel) => void,
    deleteFolder: (id: string) => void,
    setSelected: (id: string) => void
}
export const FolderTile = ({id, name, selected, saveLabel, deleteFolder, setSelected}:props) => {

    const ref = useRef<HTMLInputElement>(null);

    const [popup, setPopup] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);


    const enableEdit = () => {
        setEdit(true);
        setPopup(false);
    }

    const onSaveLabel = () => {
        
        setPopup(false);
        if (ref.current) {
            const text = ref.current.value;
            saveLabel({id, name: text});
        }
    }

    const blur = () => {
        setPopup(false);
        setEdit(false);
    }

    const onContextMenu = (e: SyntheticEvent) => {
        if (id === '1') return;
        e.preventDefault();
        setSelected(id);
        setPopup(true);
    }


    useEffect(() => {
        setEdit(false);
    }, [selected]);

    useEffect(() => {
        if (edit && ref.current) {
            ref.current.focus();
            ref.current.select();
        }
    }, [edit]);

    return (
        <>
            <div data-selected={selected === id} className="select-nothing relative text-gray-500 p-3 bg-white shadow-lg rounded-lg cursor-pointer z-10 data-[selected=false]:opacity-60" onClick={() => setSelected(id)} onContextMenu={onContextMenu}>
                {
                    edit
                    ?
                    <input ref={ref} draggable={false} defaultValue={name} onChange={onSaveLabel} type="text" className="w-full outline-none border-none"/>
                    :
                    <div ref={ref} className="">{name}</div>

                }
                {
                    popup &&
                    <div onClick={e => e.stopPropagation()} className="absolute w-24 z-10 py-1 top-14 right-0 text-gray-600 font-medium bg-white rounded-md overflow-hidden shadow-xl">
                        <div onClick={blur} className="fixed top-0 left-0 h-screen w-screen -z-10"></div>
                        <div onClick={enableEdit} className="text-right pr-3 py-1 cursor-pointer hover:bg-gray-100">
                            Edit
                        </div>
                        <div onClick={() => deleteFolder(id)} className="text-right pr-3 py-1 cursor-pointer hover:bg-gray-100">
                            Delete
                        </div>
                    </div>
                }
            </div>
            {
                edit &&
                <div onClick={() => setEdit(false)} className="absolute h-screen w-screen top-0 left-0 z-0"></div>
            }
        </>
    );
}