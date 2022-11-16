
import { HiPlus } from 'react-icons/hi';

interface params {
    styles?: string,
    open: boolean,
    action: () => void
}

const Plus = ({styles, open, action}: params) => {
    return (
        <div onClick={action} data-open={open} className={styles+" p-2 bg-blue-500 rounded-full cursor-pointer transition-transform data-[open=true]:rotate-45"}>
            <HiPlus size={40} color="white" />
        </div>        
    );
}

export default Plus;