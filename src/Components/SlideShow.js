import React, { useState, createContext  } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import Slide from "./Slide";
import './Slide.css'
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
    const [lessonData, setLessonData] = useState([]);
    const [showLesson, setShowLesson] = useState(false);
    let lessonLetter;
    let inputArray = []; 
    const onClickItem = (letter) => {
        setShowLesson(true);
        //alert(letter);
        lessonLetter = letter;
       /// console.log('letter: ', lessonLetter);
        for (const eachArray of allLetterArray) {
         if (eachArray.group === lessonLetter) {inputArray.push(eachArray);}
        }
        console.log('inputArray: ', inputArray);
        setLessonData(inputArray);
    }
    const handleOnBack = () => {
        setShowLesson(false);
    }
    
    return(
        <div>
        <div className='slideshow-container '>
            <div>
                {showLesson ? (<LessonList data={lessonData} onBack={handleOnBack} test={false}/>) : <Slide onClickItem={onClickItem}/> }
            </div>
        </div>
        </div>
    )
}