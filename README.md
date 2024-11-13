# VoiceCapture Component

The `VoiceCapture` component is a React-based audio capture and transcription tool that leverages the browser's `SpeechRecognition` API. It provides an interactive UI to start, stop, and manage voice recognition, supporting multiple languages, display modes, and now includes clipboard integration to automatically copy the transcribed text.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Example](#example)
- [Features](#features)

## Installation

Install the component:

```bash
npm install voicecapture-react
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
      clipboard={true}
      onVoiceTranscript={handleTranscript}
      onDeactivate={() => setStart(false)}
    />
  );
};
```

## Props

| Prop                | Type      | Default      | Description                                                                                  |
|---------------------|-----------|--------------|----------------------------------------------------------------------------------------------|
| `start`             | `boolean` | `false`      | Controls whether voice recognition starts (`true`) or stops (`false`).                       |
| `lang`              | `string`  | `"en"`       | Language for transcription (e.g., `"pt"` for Portuguese).                                    |
| `mode`              | `string`  | `"fullscreen"` | Display mode for the component. Options: `"fullscreen"` or `"float"`.                        |
| `clipboard`         | `boolean` | `false`      | If `true`, automatically copies the final transcript to the clipboard after recognition.     |
| `onVoiceTranscript` | `function`| `undefined`  | Callback function to handle the final transcribed text.                                      |
| `onDeactivate`      | `function`| `undefined`  | Callback triggered when voice recognition stops.                                             |

### Clipboard Integration

The `clipboard` prop enables automatic copying of the final transcript text to the clipboard once the voice recognition process is complete. This improves usability by allowing users to easily paste the transcribed text without any additional steps.

**Example Usage with Clipboard:**

```jsx
<VoiceCapture
  start={start}
  lang="en"
  mode="fullscreen"
  clipboard={true}
  onVoiceTranscript={handleTranscript}
/>
```

## Example

Below is an example using `VoiceCapture` with additional controls for language selection, display mode, and clipboard integration.

```jsx
import { useState } from "react";
import VoiceCapture from "voicecapture-react";

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
    <>
      <VoiceCapture
        start={start}
        lang={lang}
        mode={mode}
        clipboard={true}
        onVoiceTranscript={handleVoiceTranscript}
        onDeactivate={handleDeactivate}
      />
      <div>
        <h2>VoiceCapture Example</h2>

        <div>
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

          <label>
            Enable Clipboard:
            <input
              type="checkbox"
              checked={clipboard}
              onChange={(e) => setClipboard(e.target.checked)}
            />
          </label>
        </div>
      </div>

      {transcript && (
        <div>
          <h2>Transcript Results</h2>
          <textarea readOnly value={transcript} placeholder="Voice transcript will appear here..." />
        </div>
      )}
    </>
  );
}

export default App;
```

In this example:
- **Modes**: Toggle between `fullscreen` and `float` display modes.
- **Languages**: Select a language for speech recognition.
- **Clipboard**: Option to enable or disable automatic copying of the transcript text.
- **Transcript Display**: View the transcribed text once captured.

## Features

- **Real-time Voice Transcription**: Instantly capture and display voice input as text.
- **Clipboard Integration**: Automatically copies the final transcript to the clipboard, making it easy to paste the text elsewhere.
- **Editable Transcripts**: Users can modify the transcribed text through input fields or text areas.
- **Customizable Events**: Easily handle transcription results and changes in voice recognition status.