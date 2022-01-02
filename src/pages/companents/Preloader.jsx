import React from "react"
import "./preloader.scss";

import saQutPNG from "../../assets/images/saQut.png";
export default function Preloader(){
    return <div className="mint" aria-label="saQut Chat" aria-details="Spinner">
        <img async src={saQutPNG} alt="Logo" title="Logo" />
        <span>
            <u>saQut</u>
            <u>Chat</u>
        </span>
    </div>;
}