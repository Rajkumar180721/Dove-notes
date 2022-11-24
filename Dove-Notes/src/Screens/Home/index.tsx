
import React, { useEffect, useMemo, useState } from 'react';
import { Tile, Label } from 'Components/Tile';
import { label, Note } from 'Utils';
import { useLocalStorage } from 'useLocalStorage';
import {  v4 as uuidv4 } from 'uuid';
import AddMenu from 'Components/AddMenu';


const Login = () => {

    // const navigate = useNavigate();
    const [plusOpen, setPlusOpen] = useState<boolean>(false);
    const [selectedLabel, setSelectedLabel] = useState<boolean>(false);
    const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

    const [notes, setNotes] = useLocalStorage<Note[]>('NOTES', []);
    const [labels, setLabels] = useLocalStorage<label[]>('LABELS', [{id: '1', name:'General'}]);

    const labelWithNotes = useMemo(() => {
        return labels.map(label => {
            return {...label, notesIds: notes.filter(note => note.labelId)}
        })
    }, []);

    const onPlusClick = () => {
        setPlusOpen(!plusOpen);
    }

    const addNote = () => {
        setPlusOpen(false);
        setNotes([...notes, {id: uuidv4()} as Note]);
    }

    const saveEditedNote = (editedNote: Note) => {
        const tmp = notes.map(note => note.id === editedNote.id ? editedNote : note);
        setNotes(tmp);
    }

    const deleteNote = (someNote: Note) => {
        const tmp = notes.filter(note => note.id !== someNote.id);
        setNotes(tmp);
    }

    useEffect(() => {
        setFilteredNotes(notes);
    }, [notes, setFilteredNotes]);

    return (
        <div className='relative min-h-screen h-screen bg-gradient-to-t from-purple-100 to-sky-300 flex justify-center overflow-auto'>
            <div className="container px-5">
                <nav className='text-right text-white text-lg my-4 font-bold select-nothing cursor-pointer' >Anonymous</nav>
                {/* search */}
                <div className='my-4 flex justify-center'>
                    <input type="text" placeholder='Quick Search' className='p-2 rounded-md outline-none shadow-lg focus:shadow-xl focus:scale-105 transition-transform' />
                </div>
                {/* quick notes */}
                <div className="flex justify-center sticky top-3 mt-8 z-20">
                    <div className='w-full xl:w-[1050px] p-5 rounded-md shadow-lg overflow-hidden bg-white'>
                        <input type="text" placeholder='Title' className='w-full text-lg font-semibold outline-none' />
                        <input type="text" placeholder='Quick Note' className='w-full outline-none mt-2' />
                    </div>
                </div>
                {/* folders */}
                <div className='w-full flex gap-5 flex-wrap my-6'>
                    <Label name="General" selected={true} />
                    <Label name="Label" selected={selectedLabel} />
                </div>
                {/* files */}
                <div className="md:relative">
                    <div className='grid grid-cols-1 gap-10 md:grid-cols-3'>
                    {
                        filteredNotes.map((note, ind) => <Tile note={note} key={ind} save={saveEditedNote} deleteNote={deleteNote} />)
                    }
                    </div>
                </div>

                <div className="h-64"></div>
                
                <AddMenu plusOpen={plusOpen} addNote={addNote} onPlusClick={onPlusClick} />
            </div>
            
        </div>
    )
}

export default Login;