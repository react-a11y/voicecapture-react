/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import VoiceCapture from './VoiceCapture';
import NucleusReact from 'nucleus-react-js';
import { configApp } from './App.config';
import "./App.scss";

function App() {
  const [start, setStart] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [lang, setLang] = useState('en');

  const handleVoiceTranscript = (text: any) => {
    console.log('handleVoiceTranscript: ', text)
    setTranscript(text);
  };

  return (
    <NucleusReact config={configApp}>
      <VoiceCapture 
        start={start} 
        lang={lang}
        mode='fullscreen' 
        onVoiceTranscript={handleVoiceTranscript} 
      />
      <div className="content example">
        <h2>Usage Example</h2>
        
        <label htmlFor="language-select">Select Language:</label>
        <select 
          id="language-select" 
          value={lang} 
          onChange={(e) => setLang(e.target.value)}
        >
          <option value="en">English</option>
          <option value="pt">Portuguese</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>

        <button onClick={() => setStart((prev) => !prev)}>
          {start ? 'Stop Voice Capture' : 'Start Voice Capture'}
        </button>

        <textarea 
          value={transcript} 
          readOnly 
          rows={10} 
          cols={50} 
          placeholder="Voice transcript will appear here..."
        />
      </div>
    </NucleusReact>
  )
}

export default App;
