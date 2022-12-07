
import React, { useEffect, useMemo, useState } from 'react';
import { Tile, Notebook } from 'Components/Tile';
import { label, Note } from 'Utils';
import { useLocalStorage } from 'useLocalStorage';
import {  v4 as uuidv4 } from 'uuid';
import AddMenu from 'Components/AddMenu';


const Login = () => {

    // const navigate = useNavigate();
    const [plusOpen, setPlusOpen] = useState<boolean>(false);
    const [selectedLabel, setSelectedLabel] = useState<string>('1');
    const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

    const [notes, setNotes] = useLocalStorage<Note[]>('NOTES', []);
    const [labels, setLabels] = useLocalStorage<label[]>('LABELS', [{id: '1', name:'Home'}]);

    const labelWithNotes = useMemo(() => {
        return labels.map(label => {
            return {...label, notesIds: notes.filter(note => note.labelId)}
        })
    }, [labels, notes]);

    const onPlusClick = () => setPlusOpen(!plusOpen);

    const addNewNote = () => {
        setPlusOpen(false);
        const newNote = {id: uuidv4(), labelId: selectedLabel} as Note;
        setNotes([...notes, newNote]);
    }

    const addNewLabel = () => {
        setPlusOpen(false);
        const newLabel = {id: uuidv4(), name: 'New Label'} as label;
        setLabels([...labels, newLabel]);
    }

    const saveEditedNote = (editedNote: Note) => {
        const tmp = notes.map(note => note.id === editedNote.id ? editedNote : note);
        setNotes(tmp);
    }

    const saveEditedLabel = (editedLabel: label) => {
        const tmp = labels.map(label => label.id === editedLabel.id ? editedLabel : label);
        setLabels(tmp);
    }

    const deleteNote = (someNote: Note) => {
        const tmp = notes.filter(note => note.id !== someNote.id);
        setNotes(tmp);
    }

    useEffect(() => {
        setSelectedLabel('1');
    }, []);

    useEffect(() => {
        const filteredLabel = labelWithNotes.filter(label => label.id === selectedLabel)[0];
        const notes = filteredLabel.notesIds.map(note => note);
        setFilteredNotes(notes);
    }, [labelWithNotes, selectedLabel, setFilteredNotes]);

    return (
        <div className='relative min-h-screen h-screen bg-gradient-to-t from-purple-100 to-sky-300 flex justify-center overflow-auto'>
            <div className="container px-5">
                <nav className='text-right text-white text-lg mt-3 mb-1 font-bold select-nothing cursor-pointer sm:my-4'>Anonymous</nav>
                {/* search */}
                <div className='hidden my-4 sm:flex justify-center'>
                    <input type="text" placeholder='Quick Search' className='p-2 rounded-md outline-none shadow-lg focus:shadow-xl focus:scale-105 transition-transform' />
                </div>
                {/* quick notes */}
                {/* <div className="flex justify-center sticky top-3 mt-8 z-10">
                    <div className='w-full xl:w-[1050px] p-5 rounded-md shadow-lg overflow-hidden bg-white'>
                        <input type="text" placeholder='Title' className='w-full text-lg font-semibold outline-none' />
                        <input type="text" placeholder='Quick Note' className='w-full outline-none mt-2' />
                    </div>
                </div> */}
                {/* folders */}
                <div className='font-bold text-white text-lg'>Folders</div>
                <div className='w-full grid gap-3 folderGrid grid-cols-[repeat(auto-fill,_minmax(220px,_1fr))] my-5 sm:gap-4'>
                {
                    labels.map((label, ind) => <Notebook key={ind} id={label.id} name={label.name} saveLabel={saveEditedLabel} selected={selectedLabel} setSelected={setSelectedLabel} />)
                }
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
                
                <AddMenu plusOpen={plusOpen} addNote={addNewNote} addLabel={addNewLabel} onPlusClick={onPlusClick} />
            </div>
            
        </div>
    )
}

export default Login;