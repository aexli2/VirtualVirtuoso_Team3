
import './InstrumentSelection.css';

function InstrumentSelection({ mode, onBack, onSelect }) {
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
            onClick={() => onSelect('drums')}
          >
            <span className="instrument-name">Drums</span>
            <span className="instrument-image-box"></span>
          </button>

          <button
            className="instrument-option"
            type="button"
            onClick={() => onSelect('piano')}
          >
            <span className="instrument-name">Piano</span>
            <span className="instrument-image-box"></span>
          </button>

          <button
            className="instrument-option"
            type="button"
            onClick={() => onSelect('guitar')}
          >
            <span className="instrument-name">Guitar</span>
            <span className="instrument-image-box"></span>
          </button>
        </div>
      </main>
    </div>
  );
}

export default InstrumentSelection;
