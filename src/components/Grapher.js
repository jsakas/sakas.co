import React from 'react';
import Canvas from '@components/canvas/Canvas';

const r = Math.random;

const COLOR_PRIMARY = 'rgb(203, 54, 98, .5)';
const COLOR_SECONDARY = 'rgb(143, 82, 128, .7)';

const draw = (canvas, context, fn) => {
  let w = canvas.width;
  let h = canvas.height;
  
  // translate & draw x / y axis
  context.translate(w / 2, h / 2);
  
  context.beginPath();
  context.strokeStyle = COLOR_PRIMARY;
  context.moveTo(-w / 2, 0);
  context.lineTo(w / 2, 0);
  context.stroke();
  context.closePath();

  context.beginPath();
  context.moveTo(0, -h / 2);
  context.lineTo(0, h / 2);
  context.stroke();
  context.closePath();


  context.strokeStyle = COLOR_SECONDARY;
  
  context.beginPath();
  let sy = h / 3;
  let inc = .01;
  context.moveTo(0, fn(0) * sy);
  for (let x = 0, fx = 0; x < w / 2; x+=1, fx+= inc) {
    context.lineTo(x, fn(fx) * sy);
  }
  context.stroke();
  context.closePath();

  context.beginPath();
  context.moveTo(0, fn(0) * sy);
  for (let x = 0, fx = 0; x > -w / 2; x-=1, fx-= inc) {
    context.lineTo(x, fn(fx) * sy);
  }
  context.stroke();
  context.closePath();

  // reset translate before next draw
  context.translate(-w / 2, -h / 2);
};


const Visual = () => {
  const fn = Math.cos;

  return (
    <Canvas
      draw={(canvas, context) => draw(canvas, context, fn)}
      id="Galaxy"
      className="galaxy"
    />
  );
};

export default Visual;