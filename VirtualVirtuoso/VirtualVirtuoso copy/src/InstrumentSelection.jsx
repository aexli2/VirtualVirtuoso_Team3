
import './InstrumentSelection.css';
import { useState,useEffect } from 'react';






function InstrumentSelection({ mode, selectedInstrument, onBack, onSelect }) {

  const [page,setPage] = useState(false);



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
              onSelect('drums');//Updated the App.jsx handleInstrumentSelect function with drums being the instrument

            }}
          >
            <span className="instrument-name">Drums</span>
            <span className="instrument-image-box-drums"></span>
          </button>

          <button
            className="instrument-option"
            type="button"
            onClick={() => {
              onSelect('piano');//Updated the App.jsx handleInstrumentSelect function with piano being the instrument
            }}
          >
            <span className="instrument-name">Piano</span>
            <span className="instrument-image-box-piano"></span>
          </button>

          <button
            className="instrument-option"
            type="button"
            onClick={() => {
              onSelect('guitar');//Updated the App.jsx handleInstrumentSelect function with guitar being the instrument
             

            }}
          >
            <span className="instrument-name">Bass</span>
            <span className="instrument-image-box-guitar"></span>
          </button>
        </div>
      </main>
    </div>
  );
}

export default InstrumentSelection;
