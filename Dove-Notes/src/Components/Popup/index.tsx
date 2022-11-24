import React from "react";
import { DefaultButton as Button } from "Components/Buttons/defaultButtom";


type prop = {
    text: string,
    primary?: () => void,
    secondary?: () => void
};

export function Popup({text, primary, secondary}: prop) {
    return(
        <div className="fixed h-full w-full flex justify-center items-center bg-black bg-opacity-50 z-40">
            <div className="h-40 w-11/12 flex flex-col justify-between p-8 bg-white rounded-lg sm:w-96">
                <div>{text}</div>
                <div className="self-end">
                    {
                        secondary &&
                        <Button text="Cancel" styles="mr-3" action={secondary} />
                    }
                    {
                        primary &&
                        <Button varient="primary" text="Confirm" action={primary} />
                    }
                </div>
            </div>
        </div>
    );
}