import './LevelSelection.css';

import { useState, useEffect } from 'react';

function LevelSelection({ mode, level, instrument, onBack, onSelect}) {
 
 

  
    return (

    <div className="selection-page">
      <header className="selection-header">
        <button className="selection-back" /* back button */
          type="button"
          onClick={onBack}
        ><span className="selection-arrow">⬅</span>
          <div className="vbox">
          
          <span>Instrument</span>
          <span>Selection</span>
          </div>

        </button>
        <h1>VirtualVirtuoso</h1>
      </header>

      <main className="level-content">
        <h2>Level Selection</h2>
        
        <div className="level-buttons">
          <button className="level-button" type="button" onClick={() => onSelect(1)}>Level1</button>
          <button className="level-button" type="button" onClick={() => onSelect(2)}>Level2</button>
        </div>
      </main>
    </div>
  );
  }


    export default LevelSelection;