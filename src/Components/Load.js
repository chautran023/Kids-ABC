import React, { useState } from 'react';
import './Load.css';
import useSound from 'use-sound';
import hoverSfx from '../sound/hover.mp3';

export default function Load ({message, onChoose}) {   
    const [play, { stop }] = useSound(hoverSfx);

    return (
    <div className='load-container'>
        <div className='message'>{message}
            <div className='answer d-flex justify-content-around'>
                <div className='yes'onClick={() => onChoose('yes')} onMouseEnter={() => play()} onMouseLeave={() => stop()}>Yes</div>
                <div className='no'onClick={() => onChoose('no')} onMouseEnter={() => play()} onMouseLeave={() => stop()}>No</div>
            </div>
        </div>
    </div>
    )
};