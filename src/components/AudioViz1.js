/**
 * A React component template for drawing on the canvas with requestAnimationFrame.
 */
import React, { Component } from 'react';
import audioLoop from '@audio/justice.mp3';

const ID = 'AudioViz1';

// util functions
const r = Math.random;
const _2pi = Math.PI * 2;
const average = (array) => array.reduce((a, b) => a + b) / array.length;

class Audio {
  constructor() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this._context = new AudioContext();

    // set up responsive analsyer
    this._analyser1 = this._context.createAnalyser();
    this._analyser1.smoothingTimeConstant = .1;
    this._analyser1.fftSize = 256;
    this._analyser1Data = new Uint8Array(this._analyser1.frequencyBinCount);

    // set up smooth analsyer
    this._analyser2 = this._context.createAnalyser();
    this._analyser2.smoothingTimeConstant = .95;
    this._analyser2.fftSize = 256;
    this._analyser2Data = new Uint8Array(this._analyser2.frequencyBinCount);
  }

  decodeAudioDataPromise = (buffer) => {
    return new Promise((resolve, reject) => {
      this._context.decodeAudioData(buffer, resolve, reject);
    });
  }

  getSourceFromUrl = (url) => {
    return fetch(url)
      .then(response => response.arrayBuffer())
      .then(this.decodeAudioDataPromise)
      .then(this.createSource)
      .then(this.connectAnalyser)
      .then(this.connectDestination);
  }

  createSource = (bufferData) => {
    const source = this._context.createBufferSource();
    source.buffer = bufferData;
    return source;
  }

  connectAnalyser = (source) => {
    source.connect(this._analyser1);
    this._analyser1.connect(this._analyser2);
    return source;
  }

  connectDestination = (source) => {
    this._analyser2.connect(this._context.destination);
    return source;
  }

  get data() {
    this._analyser1.getByteFrequencyData(this._analyser1Data);
    this._analyser2.getByteFrequencyData(this._analyser2Data);
    return [
      this._analyser1Data,
      this._analyser2Data
    ];
  }
}

const audio = new Audio();

export default class CanvasDrawing extends Component {
  componentDidMount(){
    audio.getSourceFromUrl(audioLoop).then(source => {
      source.loop = true;
      source.start(0);
      this.source = source;
      this.raf = startGalaxy();
    });
  
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.raf);
    this.source.stop();
  }

  render() {
    return (<canvas className={ID} id={ID}></canvas>);
  }
}

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

const startGalaxy = () => {
  const canvas = document.getElementById(ID);
  const context = canvas.getContext('2d');

  let WINW, WINH, midLine;

  const updateCanvasSize = () => {
    WINW = window.innerWidth;
    WINH = window.innerHeight;
    midLine = WINH / 2;

    canvas.setAttribute('width', WINW);
    canvas.setAttribute('height', WINH);
  };

  window.addEventListener('resize', updateCanvasSize);
  updateCanvasSize();

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

  const draw = () => {
    color = getColor();
    
    let ad = audio.data.map(arr => [...arr.slice(0, 100)]);
    let adr = ad.map(arr => [...arr].reverse());
    let audioData = ad.map((arr, i) => arr.concat(adr[i]));

    const freqInterval = Math.floor(audioData[0].length / MAX_SECTIONS);
    const drawInterval = Math.floor(WINW / MAX_SECTIONS);

    context.clearRect(0, 0, canvas.width, canvas.height);

    // DRAW LEVELS
    let analsyserSpread = WINW / audioData[1].length;
    context.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${.4})`;
    context.lineCap = 'round';
    context.lineWidth = 3;
    context.beginPath();
    for (let l = 0; l <=audioData[1].length; l += 5) {
      context.moveTo(l * analsyserSpread, WINH / 2 + audioData[1][l]);
      context.lineTo(l * analsyserSpread, WINH / 2 - audioData[1][l]);
    }
    context.stroke();
    
    PARTICLES = PARTICLES.filter(p => p.opacity > 0 && p.value > 0);
    PARTICLES.forEach(p => {
      const x = p.index * drawInterval;
      
      context.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${p.opacity})`;
      context.beginPath();
      context.arc(x, midLine - p.iterations, p.value, 0, _2pi);
      context.arc(x, midLine + p.iterations, p.value, 0, _2pi);
      context.fill();
      context.beginPath();
      context.arc(x - p.iterations, midLine, p.value, 0, _2pi);
      context.arc(x + p.iterations, midLine, p.value, 0, _2pi);
      context.fill();


      context.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${p.opacity})`;
      context.beginPath();
      context.arc(x, midLine - p.iterations + spread, p.value, 0, _2pi);
      context.arc(x, midLine + p.iterations + spread, p.value, 0, _2pi);
      context.fill();
      context.beginPath();
      context.arc(x - p.iterations, midLine + spread, p.value, 0, _2pi);
      context.arc(x + p.iterations, midLine + spread, p.value, 0, _2pi);
      context.fill();


      context.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${p.opacity})`;
      context.beginPath();
      context.arc(x, midLine - p.iterations - spread, p.value, 0, _2pi);
      context.arc(x, midLine + p.iterations - spread, p.value, 0, _2pi);
      context.fill();
      context.beginPath();
      context.arc(x - p.iterations, midLine - spread, p.value, 0, _2pi);
      context.arc(x + p.iterations, midLine - spread, p.value, 0, _2pi);
      context.fill();

      p.update();
    });


    // DRAW CENTER CIRCLES
    for (let i = 0; i <= MAX_SECTIONS; i++) {
      context.beginPath();
      context.fillStyle = 'rgba(0, 0, 0, .5)';
      context.arc(i * drawInterval, midLine, audioData[1][i * freqInterval] * .1, 0, _2pi);
      context.arc(i * drawInterval, midLine - spread, audioData[1][i * freqInterval] * .1, 0, _2pi); 
      context.arc(i * drawInterval, midLine + spread, audioData[1][i * freqInterval] * .1, 0, _2pi); 
      context.fill();
    }

    if (PARTICLES.length < 250) {
      const a = average(audioData[0]);
      if (a > 95) {
        makeNewParticles(audioData[0], freqInterval, drawInterval);
      } 
    }

    return requestAnimationFrame(draw);
  };

  return draw();
};
