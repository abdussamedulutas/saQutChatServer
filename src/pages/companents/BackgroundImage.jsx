import React, { useEffect, useState } from "react"
import "./BackgroundImage.scss";

import d01 from "../../assets/images/wallpaper/01.webp";
import d02 from "../../assets/images/wallpaper/02.webp";
import d03 from "../../assets/images/wallpaper/03.webp";
import d04 from "../../assets/images/wallpaper/04.webp";
import d05 from "../../assets/images/wallpaper/05.webp";
import d06 from "../../assets/images/wallpaper/06.webp";
import d07 from "../../assets/images/wallpaper/07.webp";
import d08 from "../../assets/images/wallpaper/08.webp";
import d09 from "../../assets/images/wallpaper/09.webp";
import d10 from "../../assets/images/wallpaper/10.webp";
import d11 from "../../assets/images/wallpaper/11.webp";
import { FetchObjectURL } from "../../services/cache";

let images = [d01,d02,d03,d04,d05,d06,d07,d08,d09,d10,d11];

export default function BackgroundImage(){
    let [url,setURL] = useState(null);
    let [loaded,setLoaded] = useState(false);
    useEffect(()=>{
        let url = "/"+images[parseInt(images.length * Math.random())];
        FetchObjectURL(url).then(e => {
            setURL(e);
        })
    },[])
    return <div className="background-image">
        <img
            async src={url}
            onLoad={e => setLoaded(true)}
            style={{visibility:loaded?"visible":"hidden",opacity:loaded?1:0 }}
            alt="Background Image"
            title="Background Image"
            role="application"
        />
    </div>
}