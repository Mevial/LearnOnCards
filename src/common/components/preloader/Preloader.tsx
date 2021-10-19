import preloader from "../../assets/images/preloader.gif";
import React from "react";

export const Preloader: React.FC = () => {
    return <img alt={'loading...'} style={{width: '100px', margin: '10px'}} src={preloader}/>
}