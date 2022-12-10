import { Plus } from "./Buttons";
import { useTransition, animated } from '@react-spring/web';

type props = {
    plusOpen: boolean,
    addFile: () => void,
    addFolder: () => void,
    onPlusClick: () => void
};

export default function AddMenu({plusOpen, addFile, addFolder, onPlusClick}: props) {

    const openTransition = useTransition(plusOpen, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: {duration: 150}
    })
    
    return (
        <div className='fixed right-0 bottom-0 m-5 select-nothing'>
            {
                openTransition((styles, item) => 
                item &&
                <animated.div style={styles}>
                    <div onClick={addFile} className='absolute w-max bottom-32 cursor-pointer transition-opacity right-0 py-3 px-7 bg-blue-500 text-white font-medium rounded-md'>New File</div>
                    <div onClick={addFolder} className='absolute w-max bottom-16 cursor-pointer transition-opacity right-0 py-3 px-7 bg-blue-500 text-white font-medium rounded-md'>New Folder</div>
                </animated.div>
                
                )
            }
            <Plus open={plusOpen} styles="absolute z-10 bottom-0 right-0" action={onPlusClick} />
        </div> 
    );
}