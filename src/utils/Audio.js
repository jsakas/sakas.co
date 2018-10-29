import blip from '@audio/blip.wav';
import click from '@audio/click.wav';
import entry from '@audio/entry.wav';

const AudioContext = window.AudioContext || window.webkitAudioContext;
const ac = new AudioContext();

let blipData;
fetch(blip)
  .then(response => response.arrayBuffer())
  .then(buffer => ac.decodeAudioData(buffer, data => {
    blipData = data;
  }));

const playBlip = () => {
  const source = ac.createBufferSource();
  source.buffer = blipData;
  source.connect(ac.destination);
  source.start(0);
};

let clickData;
fetch(click)
  .then(response => response.arrayBuffer())
  .then(buffer => ac.decodeAudioData(buffer, data => {
    clickData = data;
  }));

const playClick = () => {
  const source = ac.createBufferSource();
  source.buffer = clickData;
  source.connect(ac.destination);
  source.start(0);
};

let entryData;
fetch(entry)
  .then(response => response.arrayBuffer())
  .then(buffer => ac.decodeAudioData(buffer, data => {
    entryData = data;
  }));

const playEntry = () => {
  const source = ac.createBufferSource();
  source.buffer = entryData;
  source.connect(ac.destination);
  source.start(0);
};

export { playBlip, playClick, playEntry };

