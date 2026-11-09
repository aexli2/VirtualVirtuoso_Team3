import './LevelSelection.css';

import { useState, useEffect } from 'react';

function LevelSelection({ mode, instrument, onBack, onSelect}) {
 
  useEffect(() => {
    console.log('LevelSelection page loaded with mode: ' + mode + ' and instrument: ' + instrument);
  
  }, [mode, instrument]);

  
    return (

    <div className="app">
      <header className="header">
        <h1>VirtualVirtuoso</h1>
      </header>
      </div>


    )}


    export default LevelSelection;