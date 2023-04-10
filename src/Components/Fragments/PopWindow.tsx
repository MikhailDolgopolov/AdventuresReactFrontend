import React, {useEffect, useState} from 'react';
import {useScrollLock} from "../../Hooks/useScrollLock";

function PopWindow({children, open}:{children:JSX.Element[], open:boolean}) {
    const [timer] = useState<NodeJS.Timeout | undefined>();
    const [wait, setWait] = useState<boolean>(true);
    const [lockScroll, unlockScroll] = useScrollLock();
    useEffect(()=>{
        if(open){
            lockScroll()
        }else{
            unlockScroll()
        }
    }, [open])

    return (
        <div>
            {children}
        </div>
    )
}

export default PopWindow;