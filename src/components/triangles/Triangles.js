import React, { Component } from 'react';
import Canvas from '@components/canvas/Canvas';

const r = Math.random;

let MAX_PARTICLES = 50;
let PARTICLE_MAX_SIZE = 5;
let PARTICLES = [];

const particlesFactory = (width) => {
  const particle = {};
  particle.p1x = r() * 1;
  particle.p1y = r() * 1;
  particle.p2x = r() * width;
  particle.p2y = r() * width;
  particle.p3x = r() * width;
  particle.p3y = r() * width;
  particle.r1 = Math.sqrt(Math.pow(particle.p1x, 2) + Math.pow(particle.p1y, 2)) + 100;
  particle.r2 = Math.sqrt(Math.pow(particle.p2x, 2) + Math.pow(particle.p2y, 2)) + 100;
  particle.r3 = Math.sqrt(Math.pow(particle.p3x, 2) + Math.pow(particle.p3y, 2)) + 100;
  particle.offset1 = r() * (Math.PI * 2);
  particle.offset2 = r() * (Math.PI * 2);
  particle.offset3 = r() * (Math.PI * 2);
  particle.p1dir = false;
  particle.p2dir = true;
  particle.p3dir = false;
  particle.size = 0;
  particle.movementSpeed = (r() + 0.1) / 4000;
  particle.growthSpeed = r() / 10;
  particle.maxSize = r() * PARTICLE_MAX_SIZE;
  particle.red = Math.floor(r() * 177);
  particle.green = Math.floor(r() * 177);
  particle.blue = 177;

  return particle;
};


const draw = (canvas, context) => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  while (PARTICLES.length < MAX_PARTICLES) {
    PARTICLES.push(particlesFactory(canvas.width));
  }

  context.beginPath();
  context.arc(canvas.width, canvas.height, 10, 0, 2 * Math.PI);


  PARTICLES.forEach(p => {
    context.beginPath();
    const color = `rgba(${p.red}, ${p.green}, ${p.blue}, ${.025})`;
    context.fillStyle = color;

    p.offset1 = p.p1dir ? p.offset1 + p.movementSpeed : p.offset1 - p.movementSpeed;
    p.offset2 = p.p2dir ? p.offset2 + p.movementSpeed : p.offset2 - p.movementSpeed;
    p.offset3 = p.p3dir ? p.offset3 + p.movementSpeed : p.offset3 - p.movementSpeed;

    context.moveTo(canvas.width / 2, canvas.height / 2);
    context.lineTo(p.r2 * Math.cos(p.offset2) + canvas.width / 2, p.r2 * Math.sin(p.offset2) + canvas.height / 2,);
    context.lineTo(p.r3 * Math.cos(p.offset3) + canvas.width / 2, p.r3 * Math.sin(p.offset3) + canvas.height / 2,);
    // context.lineTo(p.r1 * Math.cos(p.offset1) + canvas.width / 2, p.r1 * Math.sin(p.offset1) + canvas.height / 2,);

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
