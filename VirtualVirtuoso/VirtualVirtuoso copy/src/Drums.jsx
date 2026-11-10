import './Drums.css';

import { useState, useEffect } from 'react';



function Drums({ mode, page, selectedInstrument, onBack }) {




   return(

 
   <> 

        <header className="drum-header">
        <button
          className="selection-back" /* back button */
          type="button"
          
          onClick={onBack}
        >
          <span className="selection-arrow">⬅</span>
          <div className="vbox">
            <text>Instrument</text>
            <text>Selection</text>
          </div>
        </button>
        </header>
        
        
        <div className="DrumsContainer">
            <div className="DrumsPicture"></div>
        </div>
        </>

    )}


export default Drums;