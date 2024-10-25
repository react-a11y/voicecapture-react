# VoiceCapture Component

The `VoiceCapture` component is a React-based audio capture and transcription tool that leverages the browser's `SpeechRecognition` API. It provides an interactive UI to start, stop, and manage voice recognition, supporting multiple languages and display modes. Additionally, the component can be easily integrated with frameworks like `NucleusReact`.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Example](#example)

## Installation

Install the component:

```bash
npm install your-package-name
```

## Usage

```jsx
import { useState } from "react";
import VoiceCapture from 'voicecapture-react';

const MyComponent = () => {
  const [start, setStart] = useState(false);
  const handleTranscript = (transcript) => {
    console.log("Transcript:", transcript);
  };

  return (
    <VoiceCapture
      start={start}
      lang="en"
      mode="fullscreen"
      onVoiceTranscript={handleTranscript}
      onDeactivate={() => setStart(false)}
    />
  );
};
```

## Props

- **`start`** (boolean): Controls whether voice recognition starts (`true`) or stops (`false`).
- **`lang`** (string): Language for transcription (default is `"en"`). For example, `"pt"` for Portuguese.
- **`mode`** (string): Display mode for the component. Options include `"fullscreen"` for full-screen or `"float"` for a floating, smaller UI.
- **`onVoiceTranscript`** (function): Callback function to handle the final transcribed text.
- **`onDeactivate`** (function): Callback triggered when voice recognition stops.

## Example

Below is an example using `VoiceCapture` with `NucleusReact` and additional controls for language selection and display mode.

```jsx
import { useState } from "react";
import VoiceCapture from "voicecapture-react";
import NucleusReact from "nucleus-react-js";
import { configApp } from "./App.config";
import "./App.scss";

function App() {
  const [start, setStart] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [lang, setLang] = useState("en");
  const [mode, setMode] = useState<"fullscreen" | "float">("fullscreen");

  const handleVoiceTranscript = (text) => {
    setTranscript(text);
  };

  const openVoiceCapture = (selectedMode) => {
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
        <h2>VoiceCapture Example</h2>

        <div className="content-actions">
          <button onClick={() => openVoiceCapture("fullscreen")}>Fullscreen Mode</button>
          <button onClick={() => openVoiceCapture("float")}>Float Mode</button>

          <label>
            Select Language:
            <select value={lang} onChange={(e) => setLang(e.target.value)}>
              <option value="en">English</option>
              <option value="pt">Portuguese</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </label>
        </div>
      </div>

      {transcript && (
        <div>
          <h2>Transcript Results</h2>
          <textarea readOnly value={transcript} placeholder="Voice transcript will appear here..." />
        </div>
      )}
    </NucleusReact>
  );
}

export default App;
```

In this example:
- **Modes**: Toggle between `fullscreen` and `float` display modes.
- **Languages**: Select a language to set the `SpeechRecognition` language.
- **Transcript Display**: View the transcribed text once captured.