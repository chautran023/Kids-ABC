import Carousel from "react-multi-carousel";
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
import LessonCard from './LessonCard';
import { useNavigate } from 'react-router-dom';
import imgHello from '../img/Logo_3.png'

let links = [];
for (const eachArray of allLetterArray) {
  if (eachArray.id === 1) {links.push(eachArray.img);}
 }
let letters = []; 
for (const eachArray of allLetterArray) {
 if (eachArray.id === 1) {letters.push(eachArray.group);}
}

let colortrues = []; 
for (const eachArray of allLetterArray) {
 if (eachArray.id === 1) {colortrues.push(eachArray.colortrue);}
}

let arrayCards = [CardA,
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
CardZ]
let quantities = []; 
for (const eachArray of arrayCards) {
  quantities.push(eachArray.length);
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    paritialVisibilityGutter: 60
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30
  }
};
const Slide = ({onClickItem}) => {
  return (
    <div className="slide-lesson">
    <img classNam="slide-hello" src={imgHello} />
    <Carousel
      responsive={responsive}
      //showDots={true}
      slidesToSlide={3}
      infinite={true}
      containerClass="container-with-dots"
      deviceType={''}
      centerMode={true}
    >
      {links.slice(0, 27).map((link, index) => {
        return (
          <>
          <LessonCard
            key={link} url={link} alt={link} colortrues={colortrues[index]}
            letter={letters[index]} quantity={quantities[index]} 
            onClickItem = {onClickItem} 
          />
          </>
        );
      })} 
    </Carousel>
    </div>
  );
};

export default Slide;

