
import './Drums.css';

import { useState, useEffect, useRef } from 'react';
//useState: is a hook that allows you to add state to functional components in React. It returns an array with two elements: the current state value and a function to update it.
//useEffect: is a hook that allows you to perform side effects in functional components. It takes a function as an argument and runs it after the component renders. You can also specify dependencies to control when the effect should run.
//useRef: is a hook that allows you to create a mutable reference that persists across renders. It returns an object with a current property that can be used to store a value or reference a DOM element.
//Some may ask if useRef is part of local Storage, the answer is no.


//For FreePlay mode
import crash from './audio/Drum/Drum Crash.mp3';
import snare from './audio/Drum/Drum Snare.mp3';
import ride from './audio/Drum/Drum Ride.mp3';
import hightom from './audio/Drum/Drum High Tom.mp3';
import midtom from './audio/Drum/Drum Mid Tom.mp3';
import floortom from './audio/Drum/Drum Floor Tom.mp3';
import closedhihat from './audio/Drum/Drum Closed Hi-Hat.mp3';
import kick from './audio/Drum/Drum Kick.mp3';

//For Challenge Mode
import ChallengebackTrack1 from './audio/ChallengeMode/Billie Jean drum backing track.mp3'
import Challengehihat1 from './audio/ChallengeMode/Billie Jean hi-hat.mp3'
import Challengekick1 from './audio/ChallengeMode/Billie Jean kick.mp3'
import Challengesnar1e from './audio/ChallengeMode/Billie Jean snare.mp3'

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

const SoundMappingForDrumsChallenge={

    backTrack: new Audio(ChallengebackTrack1),
    hihat: new Audio(Challengehihat1),
    kick: new Audio(Challengekick1),
    snare: new Audio(Challengesnar1e)
};





//Stuff for Billie Jean Challenge Mode
// Challenge Mode timing settings
const TRACK_DURATION = 34;
const BEAT_INTERVAL = 1; // 117 BPM converted to seconds per beat
const FALL_DURATION = 2;
const HIT_WINDOW = 0.20;//Determines how big the window is for the window to it for each note
const HIT_LINE_PERCENT = 90;//When the user pressed the key, it changes how big the line is for it to be hit

// Generate the repeating Billie Jean drum pattern
function createBillieJeanNotes() {

    const notes = [];
    let id = 0;

    for (let beat = 0; beat < TRACK_DURATION; beat += BEAT_INTERVAL) {

        // Hi-hat plays every beat
        notes.push({
            id: id++,
            lane: 'A',
            hitTime: beat,
            status: 'pending'
        });

        // Kick plays on the first beat of every four-beat cycle
        if (beat % 4 === 0) {
            notes.push({
                id: id++,
                lane: 'Space',
                hitTime: beat,
                status: 'pending'
            });
        }

        // Snare plays on the third beat of every four-beat cycle
        if (beat % 4 === 2) {
            notes.push({
                id: id++,
                lane: 'C',
                hitTime: beat,
                status: 'pending'
            });
        }
    }

    return notes;
}


function Drums({
    mode,
    page,
    level,
    selectedInstrument,
    onBack,
    currentScore,
    setCurrentScore,
    multiplier,
    setMultiplier,
    drumHighScore,
    setDrumHighScore,
    challengeReady
}) {







    // Challenge Mode falling-note state
    const [notes, setNotes] = useState(() => createBillieJeanNotes());

    const [songTime, setSongTime] = useState(-FALL_DURATION);

    // References used to access the latest game state
    const notesRef = useRef(notes);
    const songTimeRef = useRef(-FALL_DURATION);
    const animationRef = useRef(null);

    // Play the correct Challenge Mode drum sound
    function playChallengeSound(lane) {

        let audio;

        switch (lane) {
            case 'A':
                //audio = SoundMappingForDrumsChallenge.hihat;
                audio=soundMappingForDrums.closedhihat;
                break;

            case 'C':
                //audio = SoundMappingForDrumsChallenge.snare;
                audio=soundMappingForDrums.snare;
                break;

            case 'Space':
                //audio = SoundMappingForDrumsChallenge.kick;
                audio=soundMappingForDrums.kick;
                break;

            default:
                return;
        }

        audio.pause();
        audio.currentTime = 0;

        audio.play().catch((error) => {
            console.log("Challenge drum sound blocked:", error);
        });

    }

    // Check whether the player pressed the correct key at the correct time
    function handleChallengeHit(lane) {

        const currentTime = songTimeRef.current;

        const matchingNote = notesRef.current.find((note) => {

            return (
                note.lane === lane &&
                note.status === 'pending' &&
                Math.abs(note.hitTime - currentTime) <= HIT_WINDOW
            );

        });

        if (matchingNote) {

            // Mark the note as successfully hit
            matchingNote.status = 'hit';

            notesRef.current = [...notesRef.current];
            setNotes(notesRef.current);

            // Play the corresponding drum sound
            playChallengeSound(lane);

            // Award points using the current multiplier
            setCurrentScore((previousScore) => {
                return previousScore + (100 * multiplier);
            });
            setMultiplier((previousMultiplier) => {
                return previousMultiplier + .5;
            });
            

            console.log(`Successful ${lane} hit!`);

        } else {
            console.log(`Missed ${lane} note`);
            setMultiplier(1); // Reset multiplier on miss
        }
    }

    // Freeplay keyboard functionality
    useEffect(() => {

        // Only activate keyboard sounds in Freeplay mode
      /*  if (mode !== 'freeplay') {
            return;
        }*/

        function handleKeyDown(event) {
            // Helper function to stop active sound, reset, and play instantly on rapid re-press
            const playSound = (audio) => {//audio is the sound clip form the file it is being grabbed from
                audio.pause();//This pauses the audio if it is already playing allowing it so that when the key is pressed again it won't overlap
                audio.currentTime = 0;//This reset the audio for the sound clip of the file

                audio.play().catch((error) => console.log("Audio play blocked:", error));//This catches any errors produced for the sound file
            };

            switch (event.key.toLowerCase()) {//In charge of all the key mapping for the drums, lower so that if caps lock is on it will still work
                case 'e'://Case being the the key that is being pressed
                    if (mode==='freeplay'){
                        playSound(soundMappingForDrums.crash);//This funciton plays the audio, it is also being called in the helper function above to assist in the audio event
                        console.log('User pressed E for Crash');}

                    else if (mode==='challenge' && challengeReady){
                    }
                    break;

                case 'c':
                    if (mode==='freeplay'){
                        playSound(soundMappingForDrums.snare);
                        console.log('User pressed C for Snare');}
                    else if (mode==='challenge' && challengeReady){
                         if (!event.repeat) {
                            handleChallengeHit('C');
                        }
                    }
                    break;

                case 'i':
                    if (mode==='freeplay'){
                        playSound(soundMappingForDrums.ride);
                        console.log('User pressed I for Ride');}
                    else if (mode==='challenge' && challengeReady){
                    }
                    break;

                case 'f':
                    if (mode==='freeplay'){
                        playSound(soundMappingForDrums.hightom);
                        console.log('User pressed F for High Tom');
                    }
                    else if (mode==='challenge' && challengeReady){
                    }
                    break;

                case 'j':
                    if (mode==='freeplay'){
                        playSound(soundMappingForDrums.midtom);
                        console.log('User pressed J for Mid Tom');
                    }
                    else if (mode==='challenge' && challengeReady){
                    }
                    break;

                case 'l':
                    if (mode==='freeplay'){
                        playSound(soundMappingForDrums.floortom);
                        console.log('User pressed L for Floor Tom');
                    }
                    else if (mode==='challenge' && challengeReady){
                    }
                    break;

                case 'a':
                    if (mode==='freeplay'){
                        playSound(soundMappingForDrums.closedhihat);
                        console.log('User pressed A for Closed Hi-Hat');
                    }
                    else if (mode==='challenge' && challengeReady){
                        if (!event.repeat) {
                            handleChallengeHit('A');
                        }
                    }
                    break;

                case ' ':
                    event.preventDefault(); // Prevents page from scrolling down when pressing spacebar
                    if (mode==='freeplay'){
                        playSound(soundMappingForDrums.kick);
                        console.log('User pressed SPACE for Drum Kick');}
                    else if (mode==='challenge' && challengeReady){
                         if (!event.repeat) {
                            handleChallengeHit('Space');
                        }
                    }
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
    },[mode, onBack, challengeReady, multiplier]); // Re-run if mode or onBack changes



    //This is the Challenge Mode Game Logic 

   // This is the Challenge Mode Game Logic
    useEffect(() => {

        // Only activate Challenge Mode when the challenge is ready
        if (mode !== 'challenge' || !challengeReady || level !== 1) {
            return;
        }

        const backTrack = SoundMappingForDrumsChallenge.backTrack;

        // Reset all Challenge Mode audio
        backTrack.pause();
        backTrack.currentTime = 0;

        const hihat = SoundMappingForDrumsChallenge.hihat;
        const kick = SoundMappingForDrumsChallenge.kick;
        const snare = SoundMappingForDrumsChallenge.snare;

        hihat.pause();
        hihat.currentTime = 0;

        kick.pause();
        kick.currentTime = 0;

        snare.pause();
        snare.currentTime = 0;

        // Reset the notes before starting
        const startingNotes = createBillieJeanNotes();

        notesRef.current = startingNotes;
        setNotes(startingNotes);

        // Start with a two-second visual countdown
        songTimeRef.current = -FALL_DURATION;
        setSongTime(-FALL_DURATION);

        const startTime = Date.now() + (FALL_DURATION * 1000);

        let trackStarted = false;

        // Animate the falling notes
        function animateNotes() {

            const currentTime = (Date.now() - startTime) / 1000;

            songTimeRef.current = currentTime;
            setSongTime(currentTime);

            // Start the backing track when the first notes reach the hit line
            if (currentTime >= 0 && !trackStarted) {

                trackStarted = true;

                backTrack.currentTime = 0;

                backTrack.play().catch((error) => {
                    console.log("Challenge music playback blocked:", error);
                });
            }

            // Check for missed notes
            let notesChanged = false;

            notesRef.current.forEach((note) => {

                if (
                    note.status === 'pending' &&
                    currentTime > note.hitTime + HIT_WINDOW
                ) {

                    note.status = 'missed';
                    notesChanged = true;

        
                }

            });

            if (notesChanged) {
                notesRef.current = [...notesRef.current];
                setNotes(notesRef.current);
            }

            // Stop after the 34-second track
            if (currentTime >= TRACK_DURATION) {

                backTrack.pause();

                return;
            }

            animationRef.current = requestAnimationFrame(animateNotes);
        }

        animationRef.current = requestAnimationFrame(animateNotes);

        // Cleanup when leaving Challenge Mode
        return () => {

            cancelAnimationFrame(animationRef.current);

            backTrack.pause();
            backTrack.currentTime = 0;

            hihat.pause();
            hihat.currentTime = 0;

            kick.pause();
            kick.currentTime = 0;

            snare.pause();
            snare.currentTime = 0;
        };

    }, [mode, challengeReady, level]);


    return(

        <>

            <header className="drum-header">
                <button
                    className="selection-back" /* back button */
                    type="button"

                    onClick={() => { 
                        setCurrentScore(currentScore); 
                        if (currentScore > drumHighScore) {
                            setDrumHighScore(currentScore);
                        }
                        onBack(); }}
                >
                    <span className="selection-arrow">⬅</span>
                    <div className="vbox">
                        <span>Instrument</span>
                        <span>Selection</span>
                    </div>
                </button>
            </header>


            {/* FREEPLAY MODE */}
            {mode === 'freeplay' && (
                <>
                    <div className="DrumsContainer">
                        <div className="DrumsPicture"></div>
                    </div>

                    {/* Instructions for how to play to the left of the instrument */}
                    <div className="instructions-box">

                        <p className="instructions-title">How to Play</p>
                        <p>Press the following keys to play the Drums:</p>
                        <p>Space - Plays Kick</p>
                        <p>A - Plays Closed Hi-Hat</p>
                        <p>C - Plays Snare</p>
                        <p>E - Plays Crash</p>
                        <p>F - Plays High Tom</p>
                        <p>J - Plays Mid Tom</p>
                        <p>L - Plays Floor Tom</p>
                        <p>I - Plays Ride</p>

                    </div>
                </>
            )}


            {/* CHALLENGE MODE */}
            {mode === 'challenge' && (
                <div className="DrumsContainer challenge-mode">

                    <div className="DrumsChallengePicture">

                        {/* Falling Notes */}
                        <div className="FallingNotesContainer">

                            {notes.map((note) => {

                                const timeUntilHit = note.hitTime - songTime;

                                // Only display notes that are approaching the hit line
                                if (
                                    note.status !== 'pending' ||
                                    timeUntilHit > FALL_DURATION ||
                                    timeUntilHit < -HIT_WINDOW
                                ) {
                                    return null;
                                }

                                // Calculate the note's vertical position
                                const progress = 1 - (timeUntilHit / FALL_DURATION);

                                const notePosition = progress * HIT_LINE_PERCENT;

                                let noteClass = '';

                                if (note.lane === 'A') {
                                    noteClass = 'hihat';
                                }
                                else if (note.lane === 'C') {
                                    noteClass = 'snare';
                                }
                                else if (note.lane === 'Space') {
                                    noteClass = 'kick';
                                }

                                return (
                                    <div
                                        key={note.id}
                                        className={`FallingNote ${noteClass}`}
                                        style={{
                                            top: `${notePosition}%`
                                        }}
                                    >
                                        {note.lane}
                                    </div>
                                );

                            })}

                        </div>

                    </div>

                    {/*Score Tracking Variables implemented here*/}
                    <div className="DrumsScoreboard">

                        <p>Score: {currentScore}</p>

                        <p> HighScore: {drumHighScore}</p>

                        <p>Multiplier: x{multiplier}</p>

                    </div>

                </div>
            )}

        </>

    );

}

export default Drums;
