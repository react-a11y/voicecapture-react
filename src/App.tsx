/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import VoiceCapture from "./VoiceCapture";
import NucleusReact from "nucleus-react-js";
import { configApp } from "./App.config";
import "./App.scss";

function App() {
  const [start, setStart] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [lang, setLang] = useState("en");
  const [mode, setMode] = useState<"fullscreen" | "float">("fullscreen");

  const handleVoiceTranscript = (text: any) => {
    console.log("handleVoiceTranscript: ", text);
    setTranscript(text);
  };

  const openVoiceCapture = (selectedMode: "fullscreen" | "float") => {
    setMode(selectedMode);
    setStart(true);
  };

  const handleDeactivate = () => {
    setStart(false);
  };

  return (
    <NucleusReact config={configApp}>
      <VoiceCapture
        start={start}
        lang={lang}
        mode={mode}
        onVoiceTranscript={handleVoiceTranscript}
        onDeactivate={handleDeactivate}
      />
      <div className="content example">
        <h2>Usage Example</h2>

        <div className="example-actions">
          <button
            className="button-voicecapture-example"
            onClick={() => openVoiceCapture("fullscreen")}
          >
            Fullscreen
          </button>

          <button
            className="button-voicecapture-example"
            onClick={() => openVoiceCapture("float")}
          >
            Float
          </button>
        </div>

        <div className="language">
          <label htmlFor="language-select" className="lang-label">
            Select Language:
          </label>
          <select
            id="language-select"
            className="lang-select"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="en">English</option>
            <option value="pt">Portuguese</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
      </div>

      {transcript && (
        <div className="content">
          <div className="input-group">
            <label htmlFor="voiceTextArea" className="input-label">
              <h2>Transcript Results</h2>
            </label>
            <textarea
              className="input-field textarea"
              value={transcript}
              readOnly
              placeholder="Voice transcript will appear here..."
            />
          </div>
        </div>
      )}
    </NucleusReact>
  );
}

export default App;
