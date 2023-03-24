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
import home from '../img/Home.png';
import hero from '../img/pop-up-next-letter.png';
import onestar from '../img/Group 167.png';
import twostar from '../img/Group 166.png';
import threestar from '../img/Group 121.png';

export default function LessonList ({data, onBack, test}) {
  const { speak , voices } = useSpeechSynthesis();
  const [showResults, setShowResults] = useState(false);
  const [popTrue, setpopTrue] = useState(false);
  const [popUnhide, setpopUnhide] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [play, { stop }] = useSound(hoverSfx);
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
  const navigate = useNavigate();

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
    <div className="lessonlist-container">
    {/* 3. Show results or show the question game  */}
    {showResults & !test ? ( <>
      {/* 4. Final page for Lesson */}
      <div className='home-top-left position-absolute top-0 start-0'><img src={home} onClick={() => navigate(-1)}/></div>
      <div className="final-results position-absolute top-50 start-50 translate-middle">
        <h1>Congratulations on completion of lesson</h1>
        <img src={hero} /> <br/>
        <button onClick={() => restartGame()}>Learn Again</button>
        <button onClick={() => onBack()}>Back to Lessons</button>
      </div>
      </>
    ) : showResults & test ? (<>
      <div className='home-top-left position-absolute top-0 start-0'><img src={home} onClick={() => navigate(-1)}/></div>
      {/* 4. Final page for Test Result  */}
    <div className="final-results position-absolute top-50 start-50 translate-middle">
      <h1>Results</h1>
      <h2>
        {score} / {questions.length} correct (
        {(score / questions.length) * 100}%)
      </h2>
      <img src={score < (2) ? onestar : (2) <= score <= (4) ? twostar : threestar} /> <br/>
      <button onClick={() => refreshPage()}>Test Again</button>
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

      {/* Current Question  */}
      <div className="question">   
        {/* 2. Current Score  */}
        {test ? <h2>Score: {score}</h2> : <h2> </h2>}  
        <div className='home-top-left position-absolute top-0 start-0'><img src={home} onClick={() => navigate(-1)}/></div>   
        <div className = "d-flex justify-content-center">
          <div 
            className="card-content1"
            onClick={() => speak({text: questions[currentQuestion].words ,  voice: voices[4] }  )}
          >
          <div className="card-content2" style={{color : questions[currentQuestion].colortrue}}>
            <div className="d-flex justify-content-between">
              <h1 className="question-text1" style={{color : questions[currentQuestion].colortrue}}>{questions[currentQuestion].group}</h1>
              <img className="question-volume" src={Volume} width="50" height="50"/>
            </div>  
            <img className="question-img" src={questions[currentQuestion].img} />
            <h1 className="question-text2" style={{color : questions[currentQuestion].colortrue}}>{questions[currentQuestion].words}</h1>
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
                onClick={() => optionClicked(option.isCorrect)}  onMouseEnter={() => speak({text: option.text,  voice: voices[4] }  )} 
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