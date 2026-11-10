import './Drums.css';

import { useState, useEffect } from 'react';

import crash from './audio/Drum Crash.mp3';
import snare from './audio/Drum Snare.mp3';
import ride from './audio/Drum Ride.mp3';
import hightom from './audio/Drum High Tom.mp3';
import midtom from './audio/Drum Mid Tom.mp3';
import floortom from './audio/Drum Floor Tom.mp3';
import closedhihat from './audio/Drum Closed Hi-Hat.mp3';
import kick from './audio/Drum Kick.mp3';

const soundMappingForDrums={
    crash: new Audio(crash),
    snare: new Audio(snare),
    ride: new Audio(ride),
    hightom: new Audio(hightom),
    midtom: new Audio(midtom),
    floortom: new Audio(floortom),
    closedhihat: new Audio(closedhihat),
    kick: new Audio(kick)



};


function Drums({ mode, page, selectedInstrument, onBack }) {

   
    useEffect(() => {
        function handleKeyDown(event) {
            // Helper function to stop active sound, reset, and play instantly on rapid re-press
            const playSound = (audio) => {//audio is the sound clip form the file it is being grabbed from
                audio.pause();//This pauses the audio if it is already playing allowing it so that when the key is pressed again it won't overlap
                audio.currentTime = 0;//This reset the audio for the sound clip of the file
                audio.play().catch((error) => console.log("Audio play blocked:", error));//This catches any errors produced for the sound file
            };

            switch (event.key.toLowerCase()) {//In charge of all the key mapping for the drums, lower so that if caps lock is on it will still work
                case 'e'://Case being the the key that is being pressed
                    playSound(soundMappingForDrums.crash);//This funciton plays the audio, it is also being called in the helper function above to assist in the audio event
                    console.log('User pressed E for Crash');
                    break;

                case 's':
                    playSound(soundMappingForDrums.snare); 
                    console.log('User pressed S for Snare');
                    break;

                case 'i':
                    playSound(soundMappingForDrums.ride);
                    console.log('User pressed I for Ride');
                    break;

                case 'f':
                    playSound(soundMappingForDrums.hightom);
                    console.log('User pressed F for High Tom');
                    break;

                case 'j':
                    playSound(soundMappingForDrums.midtom);
                    console.log('User pressed J for Mid Tom');
                    break;

                case 'l':
                    playSound(soundMappingForDrums.floortom);
                    console.log('User pressed L for Floor Tom');
                    break;

                case 'a':
                    playSound(soundMappingForDrums.closedhihat);
                    console.log('User pressed A for Closed Hi-Hat');
                    break;
                
                case ' ':
                    event.preventDefault(); // Prevents page from scrolling down when pressing spacebar
                    playSound(soundMappingForDrums.kick);
                    console.log('User pressed SPACE for Drum Kick');
                    break;

                default:
                    break;
            }
        }

        // Add event listener to the window when component loads
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup function: remove event listener when user leaves the Drums page
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onBack]); // Re-run if onBack changes


   return(

 
   <> 

        <header className="drum-header">
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
        
        
        <div className="DrumsContainer">
            <div className="DrumsPicture"></div>
        </div>
        </>

    )}


export default Drums;