import React, { useState   } from "react";
import {
  Link,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import { useSpeechSynthesis } from 'react-speech-kit';
import PopTrue from '../img/pop-up-true-2.png';
import PopWrong from '../img/pop-up-wrong-2.png';
import './LessonList.css';
import Volume from '../img/volume.png'
import useSound from 'use-sound';
import hoverSfx from '../sound/hover.mp3';
import winSfx from '../sound/win.mp3';
import wrongSfx from '../sound/wrong.mp3' ;
import timeoutSfx from '../sound/timeout.mp3';
import home from '../img/Home.png';
import hero from '../img/pop-up-next-letter.png';
import onestar from '../img/Group 167.png';
import twostar from '../img/Group 166.png';
import threestar from '../img/Group 121.png';
import backToLesson from '../img/Back.png';
import Timer from './Timer';


export default function LessonList ({data, onBack, test}) {
  const navigate = useNavigate();
  const { speak , voices } = useSpeechSynthesis();
  const [showResults, setShowResults] = useState(false);
  const [popTrue, setpopTrue] = useState(false);
  const [popUnhide, setpopUnhide] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [play, { stop }] = useSound(hoverSfx);
  const [playtimeout, { stoptimeout }] = useSound(timeoutSfx , { volume: 0.3 } );
  const [playwin, { stopwin }] = useSound(winSfx , { volume: 0.3 } );
  const [playwrong, { stopwrong }] = useSound(wrongSfx , { volume: 0.3 }) ;

  let questions = [];
  questions = (data);  

  const optionClicked = (isCorrect) => {
    if (!test) {
    // Increment the score
    if (isCorrect) {
      playwin();
      setScore(score + 1);
      setpopTrue(true);
      setpopUnhide(true);
    }
    else {
      playwrong();
      setpopTrue(false);
      setpopUnhide(true);
    }
  }
    else {
      if (isCorrect) {
        setScore(score + 1);
      }
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        playwin();
        setShowResults(true);
      }
  };
  };

  const handlePopNextQuestion = () => {
    if (popTrue && currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setpopUnhide(false);
    } else if (!popTrue && currentQuestion + 1 <= questions.length)
      setpopUnhide(false);
    else {
      setpopUnhide(false);
      setShowResults(true);
    }
  };
  const handleOnComplete = () => {
    playtimeout();
    setTimeout(() => {
      playwin();
      setShowResults(true);
    }, 2000);
   
  }

  function refreshPage() {
    window.location.reload(false);
  }

  /* Resets the game back to default */
  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
  };
 
  return (
    <div className= {test ? 'lessonlist-container-test' : 'lessonlist-container'}>
    {/* 3. Show results or show the Question UI  */}
    {showResults & !test ? ( <>
      {/* 4. Final page for Lesson */}
      <div className='home-top-left position-absolute top-0 start-0'><img src={backToLesson} onClick={() => onBack()}/></div>
      <div className="final-lesson position-absolute top-50 start-50 translate-middle">
        {/*<h1>Congratulations on completion of lesson</h1>*/}
        <img className="img-hero" src={hero} width="700px" /> <br/>
        <button className="btn-learn-again" onClick={() => restartGame()}  onMouseEnter={() => play()} onMouseLeave={() => stop()}  >Learn Again</button>
      </div>
      </>
    ) : showResults & test ? (<>
      {/* 4. Final page for Test Result  */}
    <div className='home-top-left position-absolute top-0 start-0'><img src={home} onClick={() => navigate(-1)}/></div>
    <div className="final-results position-absolute top-50 start-50 translate-middle">
      <img className="results-star" src={score < (2) ? onestar :  score >= (5) ?  threestar  : twostar} /> <br/>
      <h3>CONGRATULATIONS</h3>
      <h2>
        {score} / {questions.length} 
      </h2>
      
      <button className="btn-test-again" onClick={() => refreshPage()}  onMouseEnter={() => play()} onMouseLeave={() => stop()}   >Test Again</button>
    </div> 
    </>

    ) : (<div className="all-frame"> 
        {/* Pop on correct/wrong answer  */}
        {!test & popTrue  ? (<div className = {`comment ${popUnhide ? 'unhide' : 'hide'} d-flex justify-content-center`}  
        onClick = {() => {handlePopNextQuestion()  }}  onMouseLeave={() => stop()}  
        ><img src={PopTrue} /> 
          
        </div>   ) :  !test & !popTrue ? (<div className = {`comment ${popUnhide ? 'unhide' : 'hide'} d-flex justify-content-center`}
        onClick = {() => {handlePopNextQuestion()  } }  onMouseLeave={() => stop()}  
        >
         <img src={PopWrong} />
        </div> ) : null}

      {/* Current Question UI */}
      <div className="question">   
        {test ? ( <>
        <h2 className="question-score">Score: {score}</h2>
        <div className='home-top-left position-absolute top-0 start-0'><img src={home} onClick={() => navigate(-1)}/></div>
        <Timer max={30} OnComplete={handleOnComplete} />
        </> )      
        : <h2> </h2>}  
        {!test ? ( <div className='home-top-left position-absolute top-0 start-0'><img src={backToLesson} onClick={() => onBack()}/></div> ) : null}
        
        <div className = "d-flex justify-content-center">
          <div 
            className  = {test ? 'card-content1-test' : 'card-content1'}    
            onClick={() => speak({text: questions[currentQuestion].words ,  voice: voices[3] }  )}
          >
          <div className= {test ? 'card-content2-test' : 'card-content2'}  style={{color : questions[currentQuestion].colortrue}}>
            <div className="d-flex justify-content-between">
              <h1 className= {test ? 'question-text1-test' : 'question-text1'}  style={{color : questions[currentQuestion].colortrue}}>{questions[currentQuestion].group}</h1>
              <img className="question-volume" src={Volume} width="50" height="50"/>
            </div>  
            <img className={test ? 'question-img-test' : 'question-img'}   src={questions[currentQuestion].img} />
            <h1 className= {test ? 'question-text2-test' : 'question-text2'}     style={{color : questions[currentQuestion].colortrue}}>{questions[currentQuestion].words}</h1>
          </div>
          </div>
        </div>

        {/* List of possible answers  */}
        <div className="options ">
        <div className="d-flex justify-content-around">
          {questions[currentQuestion].options.map((option) => {
            return (
              <div className='option' style={{backgroundColor : option.isCorrect ? questions[currentQuestion].colortrue : questions[currentQuestion].colorfalse}}
                key={option.id}
                onClick={() => optionClicked(option.isCorrect)}  onMouseEnter={() => speak({text: option.text,  voice: voices[3] }  )} 
              >
                {option.text} 
              </div>
            );
          })}
        </div>
        </div>
      </div>
      </div>
    )}
  </div>
    )
}