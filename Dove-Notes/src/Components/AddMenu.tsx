import { Plus } from "./Buttons";


type props = {
    plusOpen: boolean,
    addNote: () => void,
    onPlusClick: () => void
};

export default function AddMenu({plusOpen, addNote, onPlusClick}: props) {
    return (
        <div className='fixed right-0 bottom-0 m-5 select-nothing'>
            <div data-open={plusOpen} onClick={addNote} className='absolute w-max opacity-0 bottom-32 cursor-pointer data-[open=true]:opacity-100 transition-opacity right-0 py-3 px-7 bg-blue-500 text-white font-medium rounded-md'>New File</div>
            <div data-open={plusOpen} className='absolute w-max opacity-0 bottom-16 cursor-pointer data-[open=true]:opacity-100 transition-opacity right-0 py-3 px-7 bg-blue-500 text-white font-medium rounded-md'>New Label</div>
            <Plus open={plusOpen} styles="absolute z-10 bottom-0 right-0" action={onPlusClick} />
        </div> 
    );
}