
import React, { useEffect, useRef, useState, KeyboardEvent, SyntheticEvent, HtmlHTMLAttributes } from "react";
import { LongPress } from "Utils";

type props = {
    name: string,
    selected: boolean
}
export const Label = ({name, selected}:props) => {

    const ref = useRef<HTMLInputElement>(null);

    const [edit, setEdit] = useState<boolean>(false);
    const {start, end} = LongPress(500, enableEdit);

    function enableEdit() {
        if (selected)
            setEdit(true);
    }

    const saveLabel = () => {
        setEdit(false);        
        if (ref.current) {
            const length = ref.current.value.length
            ref.current.size = length < 6 ? 6 : length;
        }
    }

    useEffect(() => {
        (ref.current as any).focus();
    }, [edit]);

    return (
        <>
        {/* <div ref={ref} data-selected={selected} contentEditable={edit} onInput={onInput} onChange={onKeypress} onMouseDown={start} onMouseUp={end} onTouchStart={start} onTouchEnd={end} onBlur={() => setEdit(false)} className="w-max px-8 py-3 font-bold text-gray-500 bg-white rounded-xl shadow-lg cursor-pointer select-nothing transition-opacity outline-none data-[selected=false]:opacity-60 data-[selected=false]:shadow-md">
            {name}
        </div> */}
        <div className="select-nothing">
            <input ref={ref} readOnly={!edit} draggable={false} defaultValue={name} size={6} onMouseDown={start} onMouseUp={end} onTouchStart={start} onTouchEnd={end} onBlur={saveLabel} data-selected={selected} type="text" className=" max-w-max p-3 font-bold text-gray-500 text-center bg-white rounded-xl shadow-lg cursor-pointer select-nothing outline-none data-[selected=false]:opacity-60 data-[selected=false]:shadow-md" />
        </div>
        </>
    );
}