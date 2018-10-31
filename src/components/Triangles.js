import React, { Component } from 'react';

export default class Triangles extends Component {
  componentDidMount(){
    // this.raf = startGalaxy();
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.raf);
  }

  render() {
    return (<canvas className="Triangles" id="Triangles"></canvas>);
  }
}

const r = Math.random;

const startGalaxy = () => {
  const canvas = document.getElementById('Triangles');
  const context = canvas.getContext('2d');

  let MAX_PARTICLES = 50;
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
    particle.p1x = r() * 1;
    particle.p1y = r() * 1;
    particle.p2x = r() * WINW / 1;
    particle.p2y = r() * WINW / 1;
    particle.p3x = r() * WINW / 1;
    particle.p3y = r() * WINW / 1;
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
    particle.movementSpeed = (r() + 0.1) / 2000;
    particle.growthSpeed = r() / 10;
    particle.maxSize = r() * PARTICLE_MAX_SIZE;
    particle.red = r() * 177;
    particle.green = r() * 177;
    particle.blue = 177;

    return particle;
  };

  const draw = () => {
    context.clearRect(0, 0, WINW, WINH);

    while (PARTICLES.length < MAX_PARTICLES) {
      PARTICLES.push(particlesFactory());
    }

    context.beginPath();
    context.arc(WINW, WINH, 10, 0, 2 * Math.PI);

    PARTICLES = PARTICLES.map(p => {
      const color = `rgba(${p.red}, ${p.green}, ${p.blue}, ${.01})`;

      p.offset1 = p.p1dir ? p.offset1 + p.movementSpeed : p.offset1 - p.movementSpeed;
      p.offset2 = p.p2dir ? p.offset2 + p.movementSpeed : p.offset2 - p.movementSpeed;
      p.offset3 = p.p3dir ? p.offset3 + p.movementSpeed : p.offset3 - p.movementSpeed;

      context.beginPath();
      context.moveTo(p.r1 * Math.cos(p.offset1) + WINW / 2, p.r1 * Math.sin(p.offset1) + WINW / 2,);
      context.lineTo(p.r2 * Math.cos(p.offset2) + WINW / 2, p.r2 * Math.sin(p.offset2) + WINW / 2,);
      context.lineTo(p.r3 * Math.cos(p.offset3) + WINW / 2, p.r3 * Math.sin(p.offset3) + WINW / 2,);
      context.lineTo(p.r1 * Math.cos(p.offset1) + WINW / 2, p.r1 * Math.sin(p.offset1) + WINW / 2,);
      context.fill();

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
