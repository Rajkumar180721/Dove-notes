

export function LongPress(duration: number, action: () => void) {

    let time:ReturnType<typeof setTimeout>;

    function start() {
        time = setTimeout(action, duration);
    }   
    
    function end() {
        clearTimeout(time);
    }

    return {start, end}
}