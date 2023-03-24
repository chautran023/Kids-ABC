import React, { useState, useEffect  } from "react";
import clocker from '../img/bg_timer.png';
import './LessonList.css';

export default function Timer({max, OnComplete}) {
    const [counter, setCounter] = useState(max);
    const [onComplete, setOnComplete] = useState(false);

    useEffect(() => {
    if (counter > 0) {
        setTimeout(() => setCounter(counter - 1), 1000);
        //Add tick tick sound
    }
    if (counter === 0) {
        setOnComplete(true);
        OnComplete(onComplete);
        //Add timeout sound
    }
    }, [counter, onComplete]) 

    return (
        <div className='counter-container position-absolute top-0 end-0'>
            <img src={clocker} />
            <div  className='counter'>    
                <div className='counter-num'>{counter}</div>
                <div className='counter-text'>seconds</div>
            </div>
        </div>
    )
}
