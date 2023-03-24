import LessonList from './LessonList';
import React, { useState , createContext  } from "react";
import { useSpeechSynthesis } from 'react-speech-kit';
import PopTrue from '../img/pop-up-true-2.png';
import PopWrong from '../img/pop-up-wrong-2.png';
import Home from '../img/Home.png';
import './LessonList.css';
import Volume from '../img/volume.png'
import useSound from 'use-sound';
import hoverSfx from '../sound/hover.mp3';
import winSfx from '../sound/win.mp3';
import wrongSfx from '../sound/wrong.mp3' ;
import hero from '../img/pop-up-next-letter.png';
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

export default function Test() {  
    function getMultipleRandom(arr, num) {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
      
        return shuffled.slice(0, num);
      }
      
    let testQuestions = getMultipleRandom(allLetterArray, 5);
    return(
        <>
        <LessonList data={testQuestions} test={true} />
        </>
    )
}

