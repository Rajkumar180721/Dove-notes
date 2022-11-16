
import { BiMessageSquareEdit } from 'react-icons/bi';
import { MdOutlineContentCopy } from 'react-icons/md';

const Tile = () => {
    return (
        <div className="relative h-52 w-80 bg-white rounded-md shadow-md select-nothing md:h-80 md:w-96">
            <BiMessageSquareEdit name="edit" className='absolute right-14 top-3 cursor-pointer' size={26} color="rgba(0, 0, 0, .6)" />
            <MdOutlineContentCopy name="edit" className='absolute right-3 top-3 cursor-pointer' size={26} color="rgba(0, 0, 0, .6)" />
            <div className=""></div>
        </div>
    );
}

export default Tile;