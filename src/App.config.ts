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
      content: `import VoiceCapture from 'voicecapture-react'

<VoiceCapture />`,
    },
  ],
}
