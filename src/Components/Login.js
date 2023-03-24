import React, { useState } from "react";
import './Login.css';
import LessonList from "./LessonList";
import Test from "./Test";
import SlideShow from "./SlideShow";
import { useNavigate } from 'react-router-dom';
import useSound from 'use-sound';
import hoverSfx from '../sound/hover.mp3';


export default function Login() {
    const navigate = useNavigate();
    const handleClick = () => navigate('/slideshow');
    const handleClick2 = () => navigate('/Test');
    const [play, { stop }] = useSound(hoverSfx);

    return(
   
        <div className="bg_login">
        <div className="Logo"></div>
        <div 
        className="btn-study"
        onClick={handleClick} onMouseEnter={() => play()} onMouseLeave={() => stop()} >
        Learn

        </div>
        <div className="btn-qa"
        onClick={handleClick2} onMouseEnter={() => play()} onMouseLeave={() => stop()} > 
        Test</div>
        </div>

    )
}

