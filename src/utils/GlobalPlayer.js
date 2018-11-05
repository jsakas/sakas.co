import Audio from '@utils/Audio';

// Ensures that only 1 instance of the Audio class is created.
// We want to re use the same audio context instead of creating
// new ones each time this is imported.
let _export = null;
if (global._AudioPlayer) {
  _export = global.AudioPlayer;
} else {
  _export = new Audio();
  global.AudioPlayer = _export;
}

export default _export;
