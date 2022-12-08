import { useCallback, useEffect, useMemo, useRef, useState } from "react";


export function useEffectUpdate(callback: () => void) {
    const isFirstRender = useRef(true);

    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      callback();
    }, [callback]);
  }

export function useStateCallback<T>(initValue: T) {
    const [value, setValue] = useState<T>(initValue);
    const callbackRef = useRef<(() => void)[]>([] as any);
    const isFirstRender = useRef<boolean>(true);

    const updater = useCallback((currentValue: T, callback?: () => void) => {
        console.log('updater', {currentValue, callback});
        
        setValue(currentValue);
        if (callback)
            callbackRef.current.push(callback)
    }, [setValue]);

    useEffect(() => {
        console.log(callbackRef.current, isFirstRender.current);
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        callbackRef.current.forEach((callback) => callback())
        callbackRef.current.length = 0;
    }, [callbackRef.current, value]);


    return [value, updater] as [T, typeof updater];
}