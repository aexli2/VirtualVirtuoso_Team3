
import './Piano.css';

import { useState, useEffect } from 'react';



import C3 from './audio/Piano/Piano C3.mp3';
import C_3 from './audio/Piano/Piano Cs3.mp3';
import D3 from './audio/Piano/Piano D3.mp3';
import E3 from './audio/Piano/Piano E3.mp3';
import Eb3 from './audio/Piano/Piano Eb3.mp3';
import F3 from './audio/Piano/Piano F3.mp3';
import F_3 from './audio/Piano/Piano Fs3.mp3';
import G3 from './audio/Piano/Piano G3.mp3';
import G_3 from './audio/Piano/Piano Gs3.mp3';
import A3 from './audio/Piano/Piano A3.mp3';
import A_3 from './audio/Piano/Piano As3.mp3';
import B3 from './audio/Piano/Piano B3.mp3';
import C4 from './audio/Piano/Piano C4.mp3';
import C_4 from './audio/Piano/Piano Cs4.mp3';
import D4 from './audio/Piano/Piano D4.mp3';



// Metronomes for Freeplay Mode
import multiMetronome from './audio/Metronome/MultiMetronome.mp3';
import secMetronome from './audio/Metronome/OneSecMetronome.mp3';


const soundMappingForPiano={
  C3: new Audio(C3),
  C_3: new Audio(C_3),
  D3: new Audio(D3),
  E3: new Audio(E3),
  Eb3: new Audio(Eb3),
  F3: new Audio(F3),
  F_3: new Audio(F_3),
  G3: new Audio(G3),
  G_3: new Audio(G_3),
  A3: new Audio(A3),
  A_3: new Audio(A_3),
  B3: new Audio(B3),
  C4: new Audio(C4),
  C_4: new Audio(C_4),
  D4: new Audio(D4),
};



const metronomeMapping={
  oneSecMetro: new Audio(secMetronome),
  multiMetro: new Audio(multiMetronome)
};




function Piano({ mode, page, selectedInstrument, onBack, challengeReady }) {
  //For  Metronome in Freeplay Mode
  const [oneSecMetronomeOn, setOneSecMetronomeOn] = useState(false);
  const [multiMetronomeOn, setMultiMetronomeOn] = useState(false);  
  
useEffect(() => {
  //In challenge mode, ignore keys until the "press any key" prompt is dismissed
  if (mode === 'challenge' && !challengeReady) return;


   

  // Keeps track of notes currently playing and their one-second timers
  const activeNotes = new Map();
  
  function handleKeyDown(event) {//Different from drums, must only play while key is being held and stop when released

    // Prevents keyboard auto-repeat from restarting the audio
    if (event.repeat) return;

    const playSound = (audio) => {

      // Finds whether this note is already being tracked
      let noteState = activeNotes.get(audio);

      if (!noteState) {
        noteState = {
          startTime: 0,
          released: false,
          timer: null
        };

        activeNotes.set(audio, noteState);
      }

      // Clears the previous timer if the same note is pressed again
      if (noteState.timer) {
        clearTimeout(noteState.timer);
        noteState.timer = null;
      }

      // Starts a new one-second playback period
      noteState.startTime = Date.now();
      noteState.released = false;

      // Restarts the same audio instead of creating another instance
      audio.pause();
      audio.currentTime = 0;

      audio.play().catch((error) => console.log("Audio play blocked:", error));
    };

    switch (event.key.toLowerCase()) {
      case 'z':
        playSound(soundMappingForPiano.C3);
        console.log('User pressed Z for C3');
        break;

      case 's':
        playSound(soundMappingForPiano.C_3);
        console.log('User pressed S for C#3');
        break;
      case 'x':
        playSound(soundMappingForPiano.D3);
        console.log('User pressed X for D3');
        break;
      case 'd':
        playSound(soundMappingForPiano.Eb3);
        console.log('User pressed D for Eb3');
        break;
      case 'c':
        playSound(soundMappingForPiano.E3);
        console.log('User pressed C for E3');
        break;
      case 'v':
        playSound(soundMappingForPiano.F3);
        console.log('User pressed V for F3');
        break;
      case 'g':
        playSound(soundMappingForPiano.F_3);
        console.log('User pressed G for F#3');
        break;
      case 'b':
        playSound(soundMappingForPiano.G3);
        console.log('User pressed B for G3');
        break;
      case 'h':
        playSound(soundMappingForPiano.G_3);
        console.log('User pressed H for G#3');
        break;
      case 'n':
        playSound(soundMappingForPiano.A3);
        console.log('User pressed N for A3');
        break;
      case 'j':
        playSound(soundMappingForPiano.A_3);
        console.log('User pressed J for A#3');
        break;
      case 'm':
        playSound(soundMappingForPiano.B3);
        console.log('User pressed M for B3');
        break;
      case ',':
        playSound(soundMappingForPiano.C4);
        console.log('User pressed , for C4');
        break;
      case 'l':
        playSound(soundMappingForPiano.C_4);
        console.log('User pressed L for C#4');
        break;
      case '.':
        playSound(soundMappingForPiano.D4);
        console.log('User pressed . for D4');
        break;

      //Metronome controls
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

      const noteState = activeNotes.get(audio);

      if (!noteState) return;

      noteState.released = true;

      // Calculates how much time remains in the one-second requirement
      const elapsedTime = Date.now() - noteState.startTime;
      const remainingTime = Math.max(0, 1000 - elapsedTime);

      // Stops the note after the remaining time has passed
      noteState.timer = setTimeout(() => {
        audio.pause();

        try {
          audio.currentTime = 0;
        } catch (error) {
          console.error("Error stopping audio:", error);
        }

        activeNotes.delete(audio);
      }, remainingTime);
    };

    switch (event.key.toLowerCase()) {
      case 'z':
        stopSound(soundMappingForPiano.C3);
        break;
      case 's':
        stopSound(soundMappingForPiano.C_3);
        break;
      case 'x':
        stopSound(soundMappingForPiano.D3);
        break;
      case 'd':
        stopSound(soundMappingForPiano.Eb3);
        break;
      case 'c':
        stopSound(soundMappingForPiano.E3);
        break;
      case 'v':
        stopSound(soundMappingForPiano.F3);
        break;
      case 'g':
        stopSound(soundMappingForPiano.F_3);
        break;
      case 'b':
        stopSound(soundMappingForPiano.G3);
        break;
      case 'h':
        stopSound(soundMappingForPiano.G_3);
        break;
      case 'n':
        stopSound(soundMappingForPiano.A3);
        break;
      case 'j':
        stopSound(soundMappingForPiano.A_3);
        break;
      case 'm':
        stopSound(soundMappingForPiano.B3);
        break;
      case ',':
        stopSound(soundMappingForPiano.C4);
        break;
      case 'l':
        stopSound(soundMappingForPiano.C_4);
        break;
      case '.':
        stopSound(soundMappingForPiano.D4);
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

    // Stops any remaining notes when leaving the Piano page
    activeNotes.forEach((noteState, audio) => {
      if (noteState.timer) {
        clearTimeout(noteState.timer);
      }

      audio.pause();
      audio.currentTime = 0;
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
            console.log("One Second Metronome playback blocked:", error);
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
        <div className="PageBackground">
        
        <header className="Piano-header">
        <button
          className="selection-back" /* back button */
          type="button"
          
          onClick={() => { onBack();}}
        >
          <span className="selection-arrow">⬅</span>
          <div className="vbox">
            <span>Instrument</span>
            <span>Selection</span>
          </div>
        </button>
        </header>
        
        
        <div className="PianoContainer">
            <div className="PianoPicture"></div>
        </div>
        </div>
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

        {/*Needs to be the same appearance across all user devices and their screen sizes */}
        <div className="instructions-box">

            <p className="instructions-title">How to Play</p>
            <p>Press the following keys to play the Piano:</p>
            <p>Z - Plays C3</p>
            <p>S - Plays C#3</p>
            <p>X - Plays D3</p>
            <p>D - Plays Eb3</p>
            <p>C - Plays E3</p>
            <p>V - Plays F3</p>
            <p>G - Plays F#3</p>
            <p>B - Plays G3</p>
            <p>H - Plays G#3</p>
            <p>N - Plays A3</p>
            <p>J - Plays A#3</p>
            <p>M - Plays B3</p>
            <p>, - Plays C4</p>
            <p>L - Plays C#4</p>
            <p>. - Plays D4</p>
        </div>

        </>

    )}

export default Piano;
