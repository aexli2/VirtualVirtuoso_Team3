
import './Guitar.css';

import { useState, useEffect } from 'react';


//For Freeplay Mode
import G3 from './audio/Bass/Bass G3.mp3';
import D3 from './audio/Bass/Bass D3.mp3';
import A2 from './audio/Bass/Bass A2.mp3';
import E2 from './audio/Bass/Bass E2.mp3';



//For Metronome for Freeplay Mode
import multiMetronome from './audio/Metronome/MultiMetronome.mp3';
import secMetronome from './audio/Metronome/OneSecMetronome.mp3';

//For Challenge Mode


const soundMappingForGuitar={
  G3: new Audio(G3),
  D3: new Audio(D3),
  A2: new Audio(A2),
  E2: new Audio(E2)
}

const metronomeMapping={
  oneSecMetro: new Audio(secMetronome),
  multiMetro: new Audio(multiMetronome)
};






function Guitar({ mode, page, selectedInstrument, onBack, challengeReady }) {
    //For  Metronome in Freeplay Mode
  const [oneSecMetronomeOn, setOneSecMetronomeOn] = useState(false);
  const [multiMetronomeOn, setMultiMetronomeOn] = useState(false);  
  
  useEffect(() => {
    //In challenge mode, ignore keys until the "press any key" prompt is dismissed
    if (mode === 'challenge' && !challengeReady) return;



    // Tracks the playback state of each individual key
    const activeNotes = new Map();
    
    function handleKeyDown(event) {//Different from drums, must only play while key is being held and stop when released

      // Prevents automatic keyboard repeat from restarting the audio
      if (event.repeat) return;

      const playSound = (audio) => {
        const key = event.key.toLowerCase();

        // Gets or creates the playback state for this note
        let noteState = activeNotes.get(key);

        if (!noteState) {
          noteState = {
            audio: audio,
            startTime: 0,
            released: false,
            timer: null
          };

          activeNotes.set(key, noteState);
        }

        // Clears the previous timer if the same key is pressed again
        if (noteState.timer !== null) {
          clearTimeout(noteState.timer);
          noteState.timer = null;
        }

        // Records the start time of this new press
        noteState.startTime = Date.now();
        noteState.released = false;

        // Restarts the same audio instance instead of creating another
        noteState.audio.pause();
        noteState.audio.currentTime = 0;

        noteState.audio.play().catch((error) =>
          console.log("Audio play blocked:", error)
        );
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

        case '&': // Shift + 7 toggles the One Second Metronome
          if (mode === 'freeplay' && event.shiftKey && !event.repeat) {
            setOneSecMetronomeOn((previousState) => !previousState);
          }
          break;

        case '*': // Shift + 8 toggles the Multi Metronome
          if (mode === 'freeplay' && event.shiftKey && !event.repeat) {
            setMultiMetronomeOn((previousState) => !previousState);
          }
          break;
        
        default:
          break;
      }
    }


    function handleKeyUp(event) {//Hands when key is released, stops the sound from playing, vital towards functionality

      const stopSound = (audio) => {
        const key = event.key.toLowerCase();
        const noteState = activeNotes.get(key);

        if (!noteState) return;

        // Records that the key has been released
        noteState.released = true;

        // Calculates how much of the one-second minimum remains
        const elapsedTime = Date.now() - noteState.startTime;
        const remainingTime = Math.max(0, 1000 - elapsedTime);

        // Stops immediately if the note has already played for one second
        if (remainingTime === 0) {
          noteState.audio.pause();
          noteState.audio.currentTime = 0;
          activeNotes.delete(key);
        } else {
          // Otherwise, waits until the one-second minimum is reached
          noteState.timer = setTimeout(() => {
            if (noteState.released && activeNotes.get(key) === noteState) {
              noteState.audio.pause();
              noteState.audio.currentTime = 0;
              activeNotes.delete(key);
            }
          }, remainingTime);
        }
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

      // Clears timers and stops remaining audio when leaving the page
      activeNotes.forEach((noteState) => {
        if (noteState.timer !== null) {
          clearTimeout(noteState.timer);
        }
        noteState.audio.volume=0;
        noteState.audio.pause();
        noteState.audio.currentTime = 0;
      });

      activeNotes.clear();
    };
  }, [onBack, mode, challengeReady]);


// One-Second Metronome Playback
  useEffect(() => {

      const audio = metronomeMapping.oneSecMetro;

      if (mode === 'freeplay' && oneSecMetronomeOn) {

          audio.loop = true;
          audio.currentTime = 0;

          audio.play().catch((error) => {
              console.log("One-Second Metronome playback blocked:", error);
          });

      } else {

          audio.pause();
          audio.currentTime = 0;

      }

      return () => {
          audio.pause();
          audio.currentTime = 0;
      };

  }, [mode, oneSecMetronomeOn]);

  
  // Multi Metronome Playback
  useEffect(() => {
  
      const audio = metronomeMapping.multiMetro;
  
      if (mode === 'freeplay' && multiMetronomeOn) {
  
          audio.loop = true;
          audio.currentTime = 0;
  
          audio.play().catch((error) => {
              console.log("Multi Metronome playback blocked:", error);
          });
  
      } else {
  
          audio.pause();
          audio.currentTime = 0;
  
      }
  
      return () => {
          audio.pause();
          audio.currentTime = 0;
      };
  
  }, [mode, multiMetronomeOn]);
  
  
  
  return(

 
   <> 
        {/* Stage Background */}
        <div className="PageBackground"></div>
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
        {/* Freeplay Metronome Controls */}
        <div className="metronome-controls">

            <button
              type="button"
              className={`metronome-button ${oneSecMetronomeOn ? 'active' : ''}`}
              aria-pressed={oneSecMetronomeOn}
              onClick={() => setOneSecMetronomeOn((previousState) => !previousState)}
            >
              One-Second Metronome
              <span>Shift + 7 (&amp;)</span>
            </button>

            <button
              type="button"
              className={`metronome-button ${multiMetronomeOn ? 'active' : ''}`}
              aria-pressed={multiMetronomeOn}
              onClick={() => setMultiMetronomeOn((previousState) => !previousState)}
            >
              Multi Metronome
              <span>Shift + 8 (*)</span>
          </button>

        </div>

          <div className="instructions-box">
            <p className="instructions-title">How to Play</p>
            <p> Press the following keys to play the Guitar: </p>
            <p>2 - Plays G3</p>
            <p>W - Plays D3</p>
            <p>S - Plays A2</p>
            <p>X - Plays E2</p>
            </div>

        </>

    )}

export default Guitar;
