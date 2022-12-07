
type prop = {
    varient?: 'primary' | 'secondary'
    text: string,
    styles?: string,
    action: () => void
};

export function DefaultButton({varient, text, styles, action}: prop) {
    return (
        <span data-color={varient} onClick={action} className={"p-3 w-8 max-w-max rounded-md select-nothing cursor-pointer data-[color=primary]:bg-sky-500 data-[color=primary]:text-white "+styles}>
            {text}
        </span>
    );
}