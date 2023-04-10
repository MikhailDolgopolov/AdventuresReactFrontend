import React, {useEffect, useState} from 'react';

function Waiter({delay, children}:{delay:number, children:JSX.Element[]}) {
    const [wait, setWaiting] = useState<boolean>(true)
    useEffect(() => {
        setTimeout(() => setWaiting(false), delay*1000)
    }, [])
    return <>{wait?children[0]:children[1]}</>
}

export default Waiter;