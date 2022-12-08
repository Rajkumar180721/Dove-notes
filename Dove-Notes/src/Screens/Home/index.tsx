
import React, { useEffect, useMemo, useState } from 'react';
import { FileTile, FolderTile } from 'Components/Tile';
import { NotebookModel, FileModel } from 'Utils';
import { useLocalStorage } from 'useLocalStorage';
import {  v4 as uuidv4 } from 'uuid';
import AddMenu from 'Components/AddMenu';
import { useStateCallback } from 'useStateCallback';


const Home = () => {

    // const navigate = useNavigate();
    const [plusOpen, setPlusOpen] = useState<boolean>(false);
    // const [selectedFolder, setSelectedFolder] = useState<string>('1');
    const [selectedFolder, setSelectedFolder] = useStateCallback<string>('1');
    const [filteredFiles, setFilteredFiles] = useState<FileModel[]>([]);

    const [files, setFiles] = useLocalStorage<FileModel[]>('FILES', []);
    const [folders, setFolders] = useLocalStorage<NotebookModel[]>('FOLDERS', [{id: '1', name:'Home'}]);

    const foldersWithFiles = useMemo(() => {
        const tmp = folders.map(folder => {
            return {...folder, filesIds: files.filter(file => file.folderId === folder.id)}
        })
        // console.log('here', tmp);
        return tmp;
        return [{ id: '1', name: 'Home', filesIds: []}];
    }, [folders, files]);

    const onPlusClick = () => setPlusOpen(!plusOpen);

    const addNewFile = () => {
        setPlusOpen(false);
        const newFile = {id: uuidv4(), folderId: selectedFolder} as FileModel;
        setFiles([...files, newFile]);
    }

    const addNewFolder = () => {
        setPlusOpen(false);
        const newLabel = {id: uuidv4(), name: 'New Folder'} as NotebookModel;
        setFolders([...folders, newLabel]);
    }

    const saveEditedFile = (editedNote: FileModel) => {
        const tmp = files.map(file => file.id === editedNote.id ? editedNote : file);
        setFiles(tmp);
    }

    const saveEditedFolder = (editedFolder: NotebookModel) => {
        const tmp = folders.map(folder => folder.id === editedFolder.id ? editedFolder : folder);
        setFolders(tmp);
    }

    const deleteFile = (someFile: FileModel) => {
        const tmp = files.filter(file => file.id !== someFile.id);
        setFiles(tmp);
    }

    const deleteFolder = (id: string) => {
        const callback = () => {
            const tmp = folders.filter(folder => folder.id !== id);
            console.log('Deleting folder, id:', tmp);
            setFolders(tmp);
            console.log('callback finished');
        }
        setSelectedFolder('1', callback);
        console.log('Setting state');
        
    }

    useEffect(() => setSelectedFolder('1'), []);

    useEffect(() => {
        const filteredLabel = foldersWithFiles.filter(folder => folder.id === selectedFolder)[0];
        const files = [...filteredLabel.filesIds];
        setFilteredFiles(files);
    }, [foldersWithFiles, selectedFolder, setFilteredFiles]);

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
                    folders.map((label, ind) => <FolderTile key={ind} id={label.id} name={label.name} saveLabel={saveEditedFolder} deleteFolder={deleteFolder} selected={selectedFolder} setSelected={setSelectedFolder} />)
                }
                </div>
                {/* files */}
                <div className="md:relative">
                    <div className='grid grid-cols-1 gap-10 md:grid-cols-3'>
                    {
                        filteredFiles.map((note, ind) => <FileTile note={note} key={ind} save={saveEditedFile} deleteFile={deleteFile} />)
                    }
                    </div>
                </div>

                <div className="h-64"></div>
                
                <AddMenu plusOpen={plusOpen} addFile={addNewFile} addFolder={addNewFolder} onPlusClick={onPlusClick} />
            </div>
            
        </div>
    )
}

export default Home;