import React from 'react';

function SmartWaiter({timesUp, children}:{timesUp:boolean, children:JSX.Element[]}) {
    return <>{timesUp?children[0]:children[1]}</>
}

export default SmartWaiter;