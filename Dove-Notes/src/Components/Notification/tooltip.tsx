import { useState } from "react";


type props = {
    text: string
};

export function useTooltip(text: string) {

    const [open, setOpen] = useState<boolean>(true);
    
    return [(
        <>
        {
        open &&
        <span className="absolute p-3 bottom-0">
            {text}
        </span>
        }
        </>
    ), setOpen];
}