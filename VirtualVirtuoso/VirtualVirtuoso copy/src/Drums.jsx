import './Drums.css';

import { useState, useEffect } from 'react';


function Drums({ mode, page, selectedInstrument, onBack }) {




   return(

 
   <>
        <button
          className="selection-back" /* back button */
          type="button"
          onClick={onBack}
        >
          <span className="selection-arrow">⬅</span>
          <span>Instrument Selection</span>
        </button>
        
        <div className="DrumsContainer">
            <div className="DrumsPicture"></div>
        </div>
        </>

    )}


export default Drums;