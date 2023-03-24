import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
// the css file for LessonCard.js is Slide.css
const LessonCard = ({ url, alt , letter, colortrues , quantity, onClickItem}) => {

  return (
  <div className ="card-border1" onClick = {() => onClickItem(letter)}>
    <div className="card-border2"  style={{ borderColor: colortrues }}   >
      <img className="corner-img" draggable={false} src={url} alt={alt} />
      <br />
      <div className='letter' style={{color : colortrues}} >{letter}</div>
      <div className='quantity position-absolute bottom-0 start-50 translate-middle-x' style={{color : colortrues}}>{quantity} LESSONS</div>
    </div>
  </div>
  )
};

export default LessonCard;