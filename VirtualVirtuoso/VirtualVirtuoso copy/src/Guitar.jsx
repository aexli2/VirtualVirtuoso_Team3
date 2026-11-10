import './Guitar.css';

import { useState, useEffect } from 'react';



import G3 from './audio/Bass G3.mp3';
import D3 from './audio/Bass D3.mp3';
import A2 from './audio/Bass A2.mp3';
import E2 from './audio/Bass E2.mp3';


const soundMappingForGuitar={
  G3: new Audio(G3),
  D3: new Audio(D3),
  A2: new Audio(A2),
  E2: new Audio(E2)
}

function Guitar({ mode, page, selectedInstrument, onBack }) {
    
  useEffect(() => {
    
    function handleKeyDown(event) {//Different from drums, must only play while key is being held and stop when released
      const playSound = (audio) => {
        // audio.pause(); Removing because is caused audio buffer
        // audio.currentTime=0;
        audio.play().catch((error) => console.log("Audio play blocked:", error));
      };

      switch (event.key.toLowerCase()) {
        case '2':
          playSound(soundMappingForGuitar.G3);
          console.log('User pressed 2 for G3');
          break;

        case 'w':
          playSound(soundMappingForGuitar.D3);
          console.log('User pressed W for D3');
          break;

        case 's':
          playSound(soundMappingForGuitar.A2);
          console.log('User pressed S for A2');
          break;

        case 'x':
          playSound(soundMappingForGuitar.E2);
          console.log('User pressed X for E2');
          break;
        
        default:
          break;
      }
    }


    function handleKeyUp(event) {//Hands when key is released, stops the sound from playing, vital towards functionality
      const stopSound = (audio) => {
        audio.pause();
        audio.currentTime=0;
      };

      switch (event.key.toLowerCase()) {
        case '2':
          stopSound(soundMappingForGuitar.G3);
          break;
        case 'w':
          stopSound(soundMappingForGuitar.D3);
          break;
        case 's':
          stopSound(soundMappingForGuitar.A2);
          break;
        case 'x':
          stopSound(soundMappingForGuitar.E2);
          break;
        default:
          break;
      }
    }

    //window is in reference to the entire window of the browser application
    window.addEventListener('keydown', handleKeyDown);//keydown event listener for when key is pressed down
    window.addEventListener('keyup', handleKeyUp);//keyup event listener for when key is released

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onBack]);
  
  
  
  return(

 
   <> 

        <header className="Bass-header">
        <button
          className="selection-back" /* back button */
          type="button"
          
          onClick={onBack}
        >
          <span className="selection-arrow">⬅</span>
          <div className="vbox">
            <span>Instrument</span>
            <span>Selection</span>
          </div>
        </button>
        </header>
        
        
        <div className="BassContainer">
            <div className="BassPicture"></div>
        </div>
        </>

    )}

export default Guitar;