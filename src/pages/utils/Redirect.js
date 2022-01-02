import React, { useEffect } from "react";
import { useHistory } from "react-router";
export default function Redirect({url,delay})
{
    let history = useHistory();
    useEffect(()=>{
        if(typeof delay == "number")
            setTimeout(e => history.push(url),delay);
        else
            history.push(url);
    },[]);
    return <></>;
}