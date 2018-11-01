import React, { Component } from 'react';

export default class Galaxy extends Component {
  componentDidMount(){
    this.raf = startGalaxy();
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.raf);
  }

  render() {
    return (<canvas className="Galaxy" id="Galaxy"></canvas>);
  }
}

const r = Math.random;

const startGalaxy = () => {
  const canvas = document.getElementById('Galaxy');
  const context = canvas.getContext('2d');

  let MAX_PARTICLES = 1000;
  let PARTICLE_MAX_SIZE = 5;
  let PARTICLES = [];
  let WINW, WINH;

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
    const particle = {};
    particle.startX = (r() * (WINW * 2) - WINW) * .1,
    particle.startY = (r() * (WINH * 2) - WINH) * .1,
    particle.offset = r() * (Math.PI * 2),
    particle.size = 0,
    particle.movementSpeed = (r() + 0.1) / 250,
    particle.growthSpeed = r() / 10,
    particle.maxSize = r() * PARTICLE_MAX_SIZE,
    particle.red = Math.floor(r() * 255),
    particle.green = Math.floor(r() * 255),
    particle.blue = 255,
    particle.radius = Math.sqrt(
      Math.pow(particle.startX, 2) + Math.pow(particle.startY, 2)
    ) + 100;

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
      const color = `rgba(${p.red}, ${p.green}, ${p.blue}, ${(1 - p.size / p.maxSize).toFixed(2)})`;

      p.size += p.growthSpeed;
      p.offset += p.movementSpeed;
      p.radius += 1;

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
    return requestAnimationFrame(update);
  };

  return update();
};
