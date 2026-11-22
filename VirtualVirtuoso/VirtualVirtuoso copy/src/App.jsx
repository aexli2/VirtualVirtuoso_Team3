
import { useState,useEffect } from 'react';

import HowToPage from './HowToPage';
import InstrumentSelection from './InstrumentSelection';
import './App.css';
import Drums from './Drums';
import Piano from './Piano';
import Guitar from './Guitar';
import LevelSelection from './LevelSelection';
import PressAnyKey from './PressAnyKey';

function App() {
  const [page, setPage] = useState('home');//keeps track of the current page 
  const [mode, setMode] = useState(null);//keeps track of the current game mode
  
  //keeps track of the selected instrument and needs to be passed down to the instrument selection page
  const [selectedInstrument, setSelectedInstrument] = useState(null);
 
 
  //These variables are tracking the score across every instrument
  const [currentScore, setCurrentScore] = useState(0);//keeps track of the current score for any instrument
  const [multiplier, setMultiplier] = useState(1);//keeps track of the current multiplier for any instrument
  const [drumHighScore, setDrumHighScore] = useState(() => {
      return Number(localStorage.getItem('drumsHighScore')) || 0;
  });
  const [pianoHighScore, setPianoHighScore] = useState(() => {
      return Number(localStorage.getItem('pianoHighScore')) || 0;
  });
  const [guitarHighScore, setGuitarHighScore] = useState(() => {
      return Number(localStorage.getItem('guitarHighScore')) || 0;
  });


  //Used for tracking the difficulty level across all instruments
  const [level, setLevel] = useState(0);//keeps track of the current level for any instrument
  //useState(int) where the int is the level number, 0 = easy, 1 = medium, 2 = hard, 3 = expert

  //Used to start the level in Challenge Mode when the user is ready to play
  const [challengeReady, setChallengeReady] = useState(false);//false until the user presses a key after picking a level

  useEffect(() => {
    console.log('Current page: ' + page + ' | Current mode: ' + mode+' | Instrument: ' + selectedInstrument+' | Level: ' + level);
  }, [page, mode, selectedInstrument, level]);//logs the current page and mode whenever they change


  function startMode(selectedMode) {//open instrument selection page for the selected mode
    setMode(selectedMode);
    setPage('instrument-selection');
    console.log('Entering mode: ' + selectedMode);
  }

  function goHome() {//go home function
    setPage('home');//Sets the page to home
    setMode(null);
    setLevel(0);
    setSelectedInstrument(null);
  }

  if (page === 'howto') {//to open the how to page
    return <HowToPage onBack={goHome} />;
  }


function handleInstrumentSelect(instrument) {//to handle the instrument selection
    setSelectedInstrument(instrument);
    console.log('Instrument selected: ' + instrument + ' | mode is currently: ' + mode);

    

    if (mode === 'challenge') {
      setPage('level-selection');
    }
    if (mode === 'freeplay') {
      setPage(instrument);//This will set the page into the selected instrument page
    }

   
  }


function handleLevelSelect(level) {//This handles level selection for the level seleciton page
    setLevel(level);
    console.log('Level selected: ' + level + ' | mode is currently: ' + mode + ' | instrument is currently: ' + selectedInstrument);
    setChallengeReady(false); // show the prompt again every time a level is chosen
    setPage(selectedInstrument);//This will set the page into the selected instrument page
}

  if (page === 'instrument-selection') {//to open the instrument selection page

    return (
      <InstrumentSelection
        mode={mode}
        page={page}
        selectedInstrument={selectedInstrument}
        onBack={goHome}
        onSelect={handleInstrumentSelect}
      />
    );
  }

  if (page === 'level-selection') {//to open the level selection page
    return (
      <LevelSelection mode={mode} level={level} instrument={selectedInstrument} onBack={() =>{ setLevel(0); setSelectedInstrument(null); setPage('instrument-selection')}} onSelect={handleLevelSelect} />
    );
  }

const startPrompt =
  mode === 'challenge' && !challengeReady//Used for the "Press Any Key to Start" prompt in Challenge Mode
    ? <PressAnyKey onContinue={() => setChallengeReady(true)} />
    : null;

 if (page === 'drums') {//to open the drums page
    return (
      <>
        <Drums
          mode={mode}
          page={page}
          level={level}
          selectedInstrument={selectedInstrument}
          onBack={() => { setLevel(0); setSelectedInstrument(null); setPage('instrument-selection'); setCurrentScore(0); setMultiplier(1); setChallengeReady(false); }}

          currentScore={currentScore}
          setCurrentScore={setCurrentScore}
          multiplier={multiplier}
          setMultiplier={setMultiplier}
          drumHighScore={drumHighScore}
          setDrumHighScore={setDrumHighScore}
          challengeReady={challengeReady}
        />
        {startPrompt}
      </>
    );
  }

  if (page === 'piano') {//to open the piano page
    return (
      <>
        <Piano mode={mode} page={page} selectedInstrument={selectedInstrument} onBack={() =>{setLevel(0); setSelectedInstrument(null); setPage('instrument-selection');}} challengeReady={challengeReady}/>
        {startPrompt}
      </>
    );
  }

  if (page === 'guitar') {//to open the guitar page
    return (
      <>
        <Guitar mode={mode} page={page} selectedInstrument={selectedInstrument} onBack={() =>{setLevel(0); setSelectedInstrument(null); setPage('instrument-selection');}} challengeReady={challengeReady}/>
        {startPrompt}
      </>
    );
  }

  return ( //to open the home page
    <div className="app">
      <header className="header">
        <h1>VirtualVirtuoso</h1>
      </header>

      <main className="home-content">
        <div className="menu-buttons">
          <button
            type="button"
            onClick={() => {
              startMode('freeplay'); 
              }}//sets the page to the instrument selection for free play mode
          >
            Free Play
          </button>
          
          <button
            type="button"
            onClick={() => {

              startMode('challenge'); 
            }}//sets the page to the instrument selection for challenge mode
          >
            Challenge
          </button>

          <button
            type="button"
            onClick={() => {
              setPage('howto');
            }}//sets the page to the how to page
          >
            How-To
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
