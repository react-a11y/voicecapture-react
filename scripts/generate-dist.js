import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import jsonminify from 'jsonminify';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve the output directory path
const outputDir = path.resolve(__dirname, '../dist');

// Read the current package.json
const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8'));

// Modify the package.json for the dist folder
const distPackageJson = {
  name: pkg.name,
  version: pkg.version,
  author: pkg.author,
  description: pkg.description,
  repository: pkg.repository,
  bugs: pkg.bugs,
  private: false,
  type: "module",
  keywords: pkg.keywords,
  peerDependencies: {
    react: '^17.0.0 || ^18.0.0',
  },
  files: [
    'voicecapture-react.js',
    'voicecapture-react.d.ts'
  ],
  main: './voicecapture-react.js',
  types: './voicecapture-react.d.ts',
  exports: {
    ".": {
      "import": './voicecapture-react.js',
      "require": './voicecapture-react.js'
    }
  }
};

// Minify the modified package.json
const minifiedJson = jsonminify(JSON.stringify(distPackageJson, null, 2));

// Write the minified package.json to the dist folder
fs.writeFileSync(
  path.join(outputDir, 'package.json'),
  minifiedJson
);

console.log('Minified dist package.json generated successfully.');

// Optionally copy README
fs.copyFileSync(path.resolve(__dirname, '../README.md'), path.join(outputDir, 'README.md'));
console.log('README.md copied to dist.');

// Optionally copy declaration file
fs.copyFileSync(path.resolve(__dirname, '../src/voicecapture-react.d.ts'), path.join(outputDir, 'voicecapture-react.d.ts'));
console.log('voicecapture-react.d.ts copied to dist.');
