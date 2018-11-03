/**
 * A React component template for drawing on the canvas with requestAnimationFrame.
 */
import React, { Component } from 'react';
import audioLoop from '@audio/looper.wav';

const ID = 'AudioViz1';

class Audio {
  constructor() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this._context = new AudioContext();

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
      .then(data => {
        const source = this._context.createBufferSource();
        source.buffer = data;
        return source;
      });
  }

  get destination() {
    return this._context.destination;
  }
}

const audio = new Audio();

audio.getSourceFromUrl(audioLoop).then(source => {
  source.loop = true;
  source.connect(audio.destination);
  source.start(0);
});

export default class CanvasDrawing extends Component {
  componentDidMount(){
    this.raf = startGalaxy();
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.raf);
  }

  render() {
    return (<canvas className={ID} id={ID}></canvas>);
  }
}

const r = Math.random;

const startGalaxy = () => {
  const canvas = document.getElementById(ID);
  const context = canvas.getContext('2d');

  let WINW, WINH;

  const updateCanvasSize = () => {
    WINW = window.innerWidth;
    WINH = window.innerHeight;

    canvas.setAttribute('width', WINW);
    canvas.setAttribute('height', WINH);
  };

  window.addEventListener('resize', updateCanvasSize);
  updateCanvasSize();

  const particlesFactory = () => {
    const particle = {};

    return particle;
  };

  const draw = () => {
    context.clearRect(0, 0, WINW, WINH);

    context.arc(WINW / 2, WINH / 2, 10, 1, Math.PI * 2);
    context.fillStyle='blue';
    context.fill();
    
  };

  const update = () => {
    draw();
    return requestAnimationFrame(update);
  };

  return update();
};
