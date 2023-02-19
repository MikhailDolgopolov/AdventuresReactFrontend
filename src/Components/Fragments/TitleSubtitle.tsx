import React, {useEffect} from 'react';

function TitleSubtitle({title, subtitle}:{title:string, subtitle:string}) {
    useEffect(()=>{
        document.title = title;
    }, [])
    return (
        <div className="full-title">
            <h1>{title}</h1>
            {(subtitle.length>0)&&<h4>{subtitle}</h4>}
        </div>
    );
}

export default TitleSubtitle;