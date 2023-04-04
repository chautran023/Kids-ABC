import LessonList from './LessonList';
import React, { useState , createContext  } from "react";
import './LessonList.css';


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

