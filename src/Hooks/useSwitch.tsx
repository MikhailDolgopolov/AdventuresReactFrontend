import React, {useState} from 'react';

function useSwitch() : [boolean, ()=>boolean]{
    const [sw, setSwitch] = useState<boolean>(false)
    function mainFunction(){
        setSwitch(!sw)
        return sw;
    }
    return [sw, mainFunction];
}

export default useSwitch;