import React, { Component } from 'react';

export default class Galaxy extends Component {
  componentDidMount(){
    initializeGalazy();
  }
  render() {
    return (<canvas className="Galaxy" id="Galaxy"></canvas>);
  }
}

const initializeGalazy = () => {
  const canvas = document.getElementById('Galaxy');
  const context = canvas.getContext('2d');

  let MAX_PARTICLES = 3000;

  let PARTICLE_MAX_SIZE = 2;
  let PARTICLES = [];
  let WINW, WINH;

  const r = (v) => Math.random() * v;

  const updateCanvasSize = () => {
    WINW = window.innerWidth;
    WINH = window.innerHeight;

    if (WINW > WINH) {
      WINH = WINW;
    } else {
      WINW = WINH;
    }

    canvas.setAttribute('width', WINW);
    canvas.setAttribute('height', WINH);
  };

  window.addEventListener('resize', updateCanvasSize);
  updateCanvasSize();

  const particlesFactory = () => {
    const particle = {
      startX: Math.random() * (WINW * 2) - WINW,
      startY: Math.random() * (WINH * 2) - WINH,
      offset: Math.random() * (Math.PI * 2),
      radius: Math.random() * WINW,
      size: 0,
      movementSpeed: (Math.random() + 0.1) / 1000,
      growthSpeed: Math.random() / 10,
      maxSize: Math.random() * PARTICLE_MAX_SIZE,
      red: 255,
      green: 255,
      blue: 177,
    };

    particle.radius = Math.sqrt(
      Math.pow(particle.startX, 2) + Math.pow(particle.startY, 2)
    );

    return particle;
  };

  const draw = () => {
    context.fillStyle = 'rgba(0, 0, 0, 1)';
    context.fillRect(0, 0, WINW, WINH);

    while (PARTICLES.length < MAX_PARTICLES) {
      PARTICLES.push(particlesFactory());
    }

    context.beginPath();
    context.arc(WINW, WINH, 10, 0, 2 * Math.PI);

    PARTICLES = PARTICLES.filter(p => p.size < p.maxSize).map(p => {
      const color = `rgba(${p.red}, ${p.green}, ${p.blue}, ${1 - p.size / p.maxSize})`;
      p.size += p.growthSpeed;
      p.offset += p.movementSpeed;

      context.beginPath();
      context.arc(
        p.radius * Math.cos(p.offset) + WINW / 2,
        p.radius * Math.sin(p.offset) + WINW / 2,
        p.size,
        0,
        2 * Math.PI
      );

      context.fillStyle = color;
      context.fill();
      return p;
    });
  };

  const update = () => {
    draw();
    requestAnimationFrame(update);
  };

  update();
};
