import blip from '@audio/blip.wav';

const AudioContext = window.AudioContext || window.webkitAudioContext;
const ac = new AudioContext();

let bufferData;
fetch(blip)
  .then(response => response.arrayBuffer())
  .then(buffer => ac.decodeAudioData(buffer, data => {
    bufferData = data;
  }));

const playBlip = () => {
  const source = ac.createBufferSource();
  source.buffer = bufferData;
  source.connect(ac.destination);
  source.start(0);
};

export { playBlip };

