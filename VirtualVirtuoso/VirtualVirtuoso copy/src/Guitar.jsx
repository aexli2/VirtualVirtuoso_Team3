import './Guitar.css';

import { useState, useEffect } from 'react';


function Guitar({ mode, page, selectedInstrument, onBack }) {
    return(

 
   <> 

        <header className="Bass-header">
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
        
        
        <div className="BassContainer">
            <div className="BassPicture"></div>
        </div>
        </>

    )}

export default Guitar;