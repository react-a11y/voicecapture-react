import pkg from "../package.json";

export const configApp = {
  name: "voicecapture-react",
  npm: "https://www.npmjs.com/package/voicecapture-react",
  github: "https://github.com/react-a11y/voicecapture-react",
  appVersion: pkg.version,
  reactVersion: pkg.dependencies.react.replace('^', ''),
  stepsInstall: [
    {
      name: 'Install',
      language: 'bash',
      content: 'npm install voicecapture-react',
    },
    {
      name: 'Usage',
      language: 'tsx',
      content: `import { useState } from "react";
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
};`,
    },
  ],
}
