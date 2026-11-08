
import './HowToPage.css';

function HowToPage({ onBack }) {
  return (
    <div className="howto-page">
      <header className="howto-header"> 
        <button
          className="home-back" /* back button */
          onClick={onBack}
          aria-label="Back to Home"
        >
          <span>Home</span>
          <span className="back-arrow">⬅</span>
        </button>

        <h1>VirtualVirtuoso</h1> 
      </header>

      <main className="howto-content">
        <p className="howto-intro">
          VirtualVirtuoso is a web application for musicians and
          gamers alike, where three virtual instruments are
          controlled with the keyboard just to play or to test
          oneself in a fun rhythm game of varying difficulties.
        </p>

        <div className="instrument-grid"> 
          <section className="instrument-section">
            <h2>Drums</h2>
            <p>
              Each drum is mapped approximately to where it would
              be spaced on the keyboard. Press the corresponding
              key to play the drum and produce its sound.
            </p>
          </section>
            
          <section className="instrument-section">
            <h2>Piano</h2>
            <p>
              The piano keys are mapped to different keyboard
              keys. The white keys are on one row and the black
              keys are mapped to the row above.
            </p>
          </section>

          <section className="instrument-section">
            <h2>Bass</h2>
            <p>
              The open strings are on keys 1, Q, A, and Z.
              The further right and up on the keyboard,
              the higher the pitch.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

export default HowToPage;
