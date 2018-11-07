import React from 'react';
import GlobalPlayer from '@utils/GlobalPlayer';
import audioFile from '@audio/justice.mp3';
import Canvas from '@components/canvas/Canvas';


// util functions
const r = Math.random;
const tau = Math.PI * 2;
const average = (array) => array.reduce((a, b) => a + b) / array.length;

class Particle {
  constructor(index, value) {
    this.index = index;
    this.value = value;
    this.iterations = 0;
    this.opacity = r();
    this.speed = r() * .1;

  }

  update() {
    this.value = this.value -= (this.speed);
    this.opacity -= 0.01;
    this.iterations += 1;
  }
}

const MAX_SECTIONS = 12;
let PARTICLES = [];

const makeNewParticles = (audioData, freqInterval) => {
  for (let i = 0; i <= MAX_SECTIONS; i++) {
    PARTICLES.push(new Particle(i, audioData[i * freqInterval] * .1));
  }
};

let color, red=0, green=0, blue=255, spread=100;

const getColor = () => {
  if(red > 0 && blue == 0){
    red-=1;
    green+=1;
  }
  if(green > 0 && red == 0){
    green-=1;
    blue+=1;
  }
  if(blue > 0 && green == 0){
    red+=1;
    blue-=1;
  }
  return [red, green, blue];
};

const draw = (canvas, context) => {
  color = getColor();
  
  let ad = GlobalPlayer.data.map(arr => [...arr.slice(100, 300)]);
  let adr = ad.map(arr => [...arr].reverse());
  let audioData = ad.map((arr, i) => arr.concat(adr[i]));

  const midY = canvas.height / 2;

  const freqInterval = Math.floor(audioData[0].length / MAX_SECTIONS);
  const drawInterval = Math.floor(canvas.width / MAX_SECTIONS);

  context.clearRect(0, 0, canvas.width, canvas.height);

  // DRAW LEVELS
  let analsyserSpread = canvas.width / audioData[1].length;
  context.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${.4})`;
  context.lineCap = 'round';
  context.lineWidth = 3;
  context.beginPath();
  for (let l = 0; l <=audioData[1].length; l += 5) {
    context.moveTo(l * analsyserSpread, midY + audioData[1][l]);
    context.lineTo(l * analsyserSpread, midY - audioData[1][l]);
  }
  context.stroke();
  
  PARTICLES = PARTICLES.filter(p => p.opacity > 0 && p.value > 0);
  for (let i = 0; i < PARTICLES.length; i++) {
    const particle = PARTICLES[i];
    const x = particle.index * drawInterval;

    const STARTING_POINTS = [
      // mid row
      [x, midY - particle.iterations],
      [x, midY + particle.iterations],
      [x - particle.iterations, midY],
      [x + particle.iterations, midY],

      // top row
      [x, midY - particle.iterations + spread],
      [x, midY + particle.iterations + spread],
      [x - particle.iterations, midY + spread],
      [x + particle.iterations, midY + spread],

      // bottom row
      [x, midY - particle.iterations - spread],
      [x, midY + particle.iterations - spread],
      [x - particle.iterations, midY - spread],
      [x + particle.iterations, midY - spread],
    ];

    context.beginPath();
    context.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${particle.opacity})`;

    STARTING_POINTS.forEach(point => {
      context.moveTo(point[0], point[1]);
      context.arc(point[0], point[1], particle.value, 0, tau);
    });
    
    context.fill();
    particle.update();
  }
  

  // DRAW CENTER CIRCLES
  context.beginPath();
  context.fillStyle = 'rgba(17, 17, 17, .5)';
  for (let i = 0; i <= MAX_SECTIONS; i++) {
    context.moveTo(i * drawInterval, midY);
    context.arc(i * drawInterval, midY, audioData[1][i * freqInterval] * .1, 0, tau);
    context.moveTo(i * drawInterval, midY - spread);
    context.arc(i * drawInterval, midY - spread, audioData[1][i * freqInterval] * .1, 0, tau);
    context.moveTo(i * drawInterval, midY + spread);
    context.arc(i * drawInterval, midY + spread, audioData[1][i * freqInterval] * .1, 0, tau);
  }
  context.fill();

  if (PARTICLES.length < 250) {
    const a = average(audioData[0]);
    if (a > 95) {
      makeNewParticles(audioData[0], freqInterval, drawInterval);
    } 
  }
};


const load = () => {
  GlobalPlayer.fftSize = 1024;
  return GlobalPlayer.getSourceFromUrl(audioFile);
};
const afterLoad = (source) => source.start(0);
const unload = (source) => GlobalPlayer.fadeOut(source);

const AudioVisual = () => {
  return (
    <Canvas 
      draw={draw}
      load={load}
      afterLoad={afterLoad}
      unload={unload}
      onUnload
      id='Grid'
      className='Grid'
    />
  );
};

export default AudioVisual;
