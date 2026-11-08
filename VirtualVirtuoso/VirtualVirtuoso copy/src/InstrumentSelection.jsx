
import './InstrumentSelection.css';
import { useState,useEffect } from 'react';

import LevelSelection from './LevelSelection';




function InstrumentSelection({ mode, selectedInstrument, onBack, onSelect }) {

  const [page,setPage] = useState(false);

if (page === 'level-selection') {
  return (
    <LevelSelection
      mode={mode}
      instrument={selectedInstrument}
      onBack={onBack}
      onSelect={onSelect}
    />
  );
}


  return (
    <div className="selection-page">
      <header className="selection-header"> 
        <button
          className="selection-back" /* back button */
          type="button"
          onClick={onBack}
        >
          <span className="selection-arrow">⬅</span>
          <span>Home</span>
        </button>

        <h1>VirtualVirtuoso</h1> 
      </header>

      <main className="selection-content"> 
        <h2>Select Instrument</h2>

        <div className="instrument-options">
          <button
            className="instrument-option"
            type="button"
            onClick={() => {
              onSelect('drums');

            }}
          >
            <span className="instrument-name">Drums</span>
            <span className="instrument-image-box-drums"></span>
          </button>

          <button
            className="instrument-option"
            type="button"
            onClick={() => {
              onSelect('piano');
            }}
          >
            <span className="instrument-name">Piano</span>
            <span className="instrument-image-box-piano"></span>
          </button>

          <button
            className="instrument-option"
            type="button"
            onClick={() => {
              onSelect('guitar');
              if (mode === 'challenge') {
                console.log('Challenge mode selected with Guitar');
                setPage('level-selection');}

            }}
          >
            <span className="instrument-name">Guitar</span>
            <span className="instrument-image-box-guitar"></span>
          </button>
        </div>
      </main>
    </div>
  );
}

export default InstrumentSelection;
