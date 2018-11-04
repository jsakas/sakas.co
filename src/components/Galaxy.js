import React from 'react';
import Canvas from '@components/canvas/Canvas';

const r = Math.random;

let MAX_PARTICLES = 2000;
let PARTICLE_MAX_SIZE = 5;
let PARTICLES = [];


const particlesFactory = (canvas) => {
  const particle = {};
  particle.startX = (r() * (canvas.width * 2) - canvas.width) * .1,
  particle.startY = (r() * (canvas.height * 2) - canvas.height) * .1,
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

const draw = (canvas, context) => {
  context.fillStyle = 'rgba(0, 0, 0, 1)';
  context.fillRect(0, 0, canvas.width, canvas.height);

  while (PARTICLES.length < MAX_PARTICLES) {
    PARTICLES.push(particlesFactory(canvas));
  }

  context.beginPath();
  context.arc(canvas.width, canvas.height, 10, 0, 2 * Math.PI);

  PARTICLES = PARTICLES.filter(p => p.size < p.maxSize).map(p => {
    const color = `rgba(${p.red}, ${p.green}, ${p.blue}, ${(1 - p.size / p.maxSize).toFixed(2)})`;

    p.size += p.growthSpeed;
    p.offset += p.movementSpeed;
    p.radius += 1;

    context.beginPath();
    context.arc(
      p.radius * Math.cos(p.offset) + canvas.width / 2,
      p.radius * Math.sin(p.offset) + canvas.height / 2,
      p.size,
      0,
      2 * Math.PI
    );

    context.fillStyle = color;
    context.fill();
    return p;
  });
};


const Visual = () => {
  return (
    <Canvas
      draw={draw}
      id="Galaxy"
      className="galaxy"
    />
  );
};

export default Visual;