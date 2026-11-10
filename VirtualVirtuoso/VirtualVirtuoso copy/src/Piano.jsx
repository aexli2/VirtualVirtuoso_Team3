import './Piano.css';

import { useState, useEffect } from 'react';


function Piano({ mode, page, selectedInstrument, onBack }) {
    return(

 
   <> 

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
        </>

    )}

export default Piano;