
import { useState,useEffect } from 'react';

import HowToPage from './HowToPage';
import InstrumentSelection from './InstrumentSelection';
import './App.css';

function App() {
  const [page, setPage] = useState('home');//keeps track of the current page 
  const [mode, setMode] = useState(null);//keeps track of the current game mode
  

  useEffect(() => {
    console.log('Current page: ' + page + ' | Current mode: ' + mode);
  }, [page, mode]);//logs the current page and mode whenever they change


  function startMode(selectedMode) {//open instrument selection page for the selected mode
    setMode(selectedMode);
    setPage('instrument-selection');
    console.log('Entering mode: ' + selectedMode);
  }

  function goHome() {//go home function
    setPage('home');//Sets the page to home
    setMode(null);
  }

  if (page === 'howto') {//to open the how to page
    return <HowToPage onBack={goHome} />;
  }

  if (page === 'instrument-selection') {//to open the instrument selection page
    return (
      <InstrumentSelection
        mode={mode}
        onBack={goHome}
        onSelect={() => {}}
      />
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
