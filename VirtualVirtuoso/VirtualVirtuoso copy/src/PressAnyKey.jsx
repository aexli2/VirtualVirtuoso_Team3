import { useEffect } from 'react';
import './PressAnyKey.css';

function PressAnyKey({ onContinue }) {
  useEffect(() => {
    function handle(event) {
      if (event.repeat) return; // ignores a key still held down from clicking the level button

      // Shift, Ctrl, Alt, and Meta on their own don't count as "any key"
      if (['Shift', 'Control', 'Alt', 'Meta'].includes(event.key)) return;

      // Only block the default for space, so it doesn't scroll the page
      if (event.key === ' ') event.preventDefault();

      onContinue();
    }

    window.addEventListener('keydown', handle);

    return () => {
      window.removeEventListener('keydown', handle);
    };
  }, [onContinue]);

  return (
    <div className="press-any-key-overlay">
      <p className="press-any-key-text">Press any key to continue</p>
    </div>
  );
}

export default PressAnyKey;