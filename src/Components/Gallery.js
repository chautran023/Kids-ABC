import React, {useState, useEffect} from "react";
import './Gallery.css';
import {allLetterArray} from "../Data";
import Volume from '../img/volume.png';
import LookUp from '../img/look-up-colored.png';
import { useSpeechSynthesis } from 'react-speech-kit';
import home from '../img/Home.png';
import {useNavigate} from 'react-router-dom';
function stringToSlug(str) {
    // remove accents
    var from =
        'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ',
      to =
        'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy';
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(RegExp(from[i], 'gi'), to[i]);
    }
  
    str = str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\-]/g, ' ')
      .replace(/-+/g, ' ');
  
    return str;
  }

function Search({onChangeSearch}) {
    return (
      <form className="row" >
          <div className="panel">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="search..."
                name="text"
                onChange={(e) => {onChangeSearch(e.target.value)}
                }
              />
            </div>
          </div>
      </form>
    );
  }
  
export default function Gallery() {
    const { speak , voices } = useSpeechSynthesis();
    const navigate = useNavigate();
    const [items, setItems] = useState(allLetterArray);
    const [displayItems, setDisplayItems] = useState(items);
    const [filterValue, setFilterValue] = useState([]);
    const [meaning, setMeaning] = useState('');

    const handleSearch = (value) => {
        setFilterValue(stringToSlug(value));
      };
    
      useEffect(() => {
        const filteredItems = items.filter((item) => {
          return (
            stringToSlug(item.words.toString().toLowerCase()).includes(
              filterValue.toString().toLowerCase()
            ) 
          );
        });
        setDisplayItems(filteredItems);
      }, [items, filterValue]);
    
      
    const [popLookup, setpopLookup] = useState(false);
    let newArr=[];
    
    const handleLookup = (word) => {
        newArr = displayItems.filter((card) => {
            if (card.words === word){
                newArr.push(card);
                setMeaning(newArr[0].mean);
                setpopLookup(true);
            }
        })
        
    }
    const handleOnChoose = (answer) => {
       if (answer=='no'){
        setpopLookup(false);
        }
    }
    function Lookup ({ onChoose , content}) {   
        return (
        <div className='lookup-container'>
            <div className='lookup-content'>Nghĩa tiếng Việt: {content}
                <div className='cancel'onClick={() => onChoose('no')}>Cancel</div>
            </div>
        </div>
        )
    };
    return (
        <div className='gal-container'>
        <div className="navbar d-flex justify-content-around">
                <div className='home-button position-absolute top-0 start-0'><img src={home} onClick={() => navigate(-1)}/></div>
                <div className="header">YOUR GALLERY</div>
                <div className="form">
                <Search onChangeSearch={handleSearch} />
                </div>
        </div>
        {popLookup ? <Lookup content={meaning} onChoose={handleOnChoose}/> : null}
        <div className="cards-container">
            <div className="row row-cols-5">
                {displayItems.map((card) => (
                    <div className="col">
                        <div className = "d-flex justify-content-center">
                            <div className="border1">        
                                <div className="border2" style={{color : card.colortrue}}>
                                    <div className="d-flex justify-content-between">
                                        <h1 className="text1" style={{color : card.colortrue}}>{card.group}</h1>
                                        <img className="volume" src={Volume} width="25" height="25"onClick={() => speak({text: card.words ,  voice: voices[4] }  )}/>
                                        <img className="lookup" src={LookUp} width="40" height="40" onClick={() => handleLookup(card.words)} />
                                    </div>  
                                    <img className="img" src={card.img} />
                                    <h1 className="text2" style={{color : card.colortrue}}>{card.words}</h1>

                                </div>
                            </div>
                        </div>
                   </div>
                ))}
            </div>
        </div>
      </div>
    )
}