import React, { useState } from "react";
import './Login.css';
import Load from './Load.js';
import { useNavigate } from 'react-router-dom';
import useSound from 'use-sound';
import hoverSfx from '../sound/hover.mp3';
import galleryicon from '../img/gallery.png';

export default function Login() {
    const [popLoad, setpopLoad] = useState(false);
    const navigate = useNavigate();
    const handleClick = () => navigate('/Slideshow');
    const handleClick3 = () => navigate('/Gallery');
    const [play, { stop }] = useSound(hoverSfx);
    const handleLoad = () => setpopLoad(true);
    const handleOnChoose = (answer) => {
        if (answer=='yes') {
            navigate('/Test');
        }
        else if (answer=='no'){
            setpopLoad(false);
        }
    }
    return(
        <div className="bg_login">
            <img src={galleryicon} 
            width="180" height="150"
            className="btn-gallery"
            onClick={handleClick3} onMouseEnter={() => play()} onMouseLeave={() => stop()} />
            <div className="Logo"></div>
            <div 
            className="btn-study"
            onClick={handleClick} onMouseEnter={() => play()} onMouseLeave={() => stop()} >
            Learn
            </div>
            <div className="btn-qa"
            onClick={handleLoad} onMouseEnter={() => play()} onMouseLeave={() => stop()} >
            Test</div>
            {popLoad ? <Load message={'You are timed in this test. Are you ready?'} onChoose={handleOnChoose}/> : null}
        </div>
    )
}

