import React, { useState, createContext  } from "react";
import {
    Link,
    Routes,
    Route,
    useNavigate,
  } from 'react-router-dom';
import "react-multi-carousel/lib/styles.css";
import Slide from "./Slide";
import home from '../img/Home.png';
import './Slide.css'
import useSound from 'use-sound';
import hoverSfx from '../sound/hover.mp3';
import LessonList from "./LessonList";
import {CardA,
    CardB,
    CardC,
    CardD,
    CardE,
    CardF,
    CardG,
    CardH,
    CardI,
    CardJ,
    CardK,
    CardL,
    CardM,
    CardN,
    CardO,
    CardP,
    CardQ,
    CardR,
    CardS,
    CardT,
    CardU,
    CardV,
    CardW,
    CardY,
    CardZ,
    allLetterArray
    } from "../Data";

export default function SlideShow({ deviceType }) {
    const navigate = useNavigate();
    const [lessonData, setLessonData] = useState([]);
    const [showLesson, setShowLesson] = useState(false);
    const [play, { stop }] = useSound(hoverSfx);
    let lessonLetter;
    let inputArray = []; 
    const onClickItem = (letter) => {
        setShowLesson(true);
        //alert(letter);
        lessonLetter = letter;
        for (const eachArray of allLetterArray) {
         if (eachArray.group === lessonLetter) {inputArray.push(eachArray);}
        }
        setLessonData(inputArray);
    }
    const handleOnBack = () => {
        setShowLesson(false);
    }
    
    return(
        <div>
        <div className='slideshow-container '>

            <div>
                {showLesson ? (<LessonList data={lessonData} onBack={handleOnBack} test={false}/>) : 
                (<>
                <div className='home-top-left position-absolute top-0 start-0'><img src={home} onClick={() => navigate(-1)} onMouseEnter={() => play()} onMouseLeave={() => stop()}/></div>
                <Slide onClickItem={onClickItem} /> </> ) }
            </div>
        </div>
        </div>
    )
}