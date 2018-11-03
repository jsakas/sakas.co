/**
 * A React component template for drawing on the canvas with requestAnimationFrame.
 */
import React, { Component } from 'react';

const ID = 'CanvasDrawing';

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

  };

  const update = () => {
    draw();
    return requestAnimationFrame(update);
  };

  return update();
};
