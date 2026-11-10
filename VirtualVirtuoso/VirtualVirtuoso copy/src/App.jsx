
import { useState,useEffect } from 'react';

import HowToPage from './HowToPage';
import InstrumentSelection from './InstrumentSelection';
import './App.css';
import Drums from './Drums';
import Piano from './Piano';
import Guitar from './Guitar';
import LevelSelection from './LevelSelection';

function App() {
  const [page, setPage] = useState('home');//keeps track of the current page 
  const [mode, setMode] = useState(null);//keeps track of the current game mode
  
  //keeps track of the selected instrument and needs to be passed down to the instrument selection page
  const [selectedInstrument, setSelectedInstrument] = useState(null);
 
 
  //These variables are tracking the score across every instrument
  const [currentScore, setCurrentScore] = useState(0);//keeps track of the current score for any instrument
  const [drumHighScore, setDrumHighScore] = useState(0);//keeps track of the high score for drums
  const [pianoHighScore, setPianoHighScore] = useState(0);//keeps track of the high score for piano
  const [guitarHighScore, setGuitarHighScore] = useState(0);//keeps track of the high score for guitar

  useEffect(() => {
    console.log('Current page: ' + page + ' | Current mode: ' + mode+' | Instrument: ' + selectedInstrument);
  }, [page, mode, selectedInstrument]);//logs the current page and mode whenever they change


  function startMode(selectedMode) {//open instrument selection page for the selected mode
    setMode(selectedMode);
    setPage('instrument-selection');
    console.log('Entering mode: ' + selectedMode);
  }

  function goHome() {//go home function
    setPage('home');//Sets the page to home
    setMode(null);
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
      <LevelSelection mode={mode} instrument={selectedInstrument} onBack={() => setPage('instrument-selection')} />
    );
  }

  if (page === 'drums') {//to open the drums page
    return (
      <Drums mode={mode} page={page} selectedInstrument={selectedInstrument} onBack={() => setPage('instrument-selection')} />
    );
  }

  if (page === 'piano') {//to open the piano page
    return (
      <Piano mode={mode} page={page} selectedInstrument={selectedInstrument} onBack={() => setPage('instrument-selection')} />
    );
  }

  if (page === 'guitar') {//to open the guitar page
    return (
      <Guitar mode={mode} page={page} selectedInstrument={selectedInstrument} onBack={() => setPage('instrument-selection')} />
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
