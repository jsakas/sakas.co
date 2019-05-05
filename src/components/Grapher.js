import React, { Component, Fragment } from 'react';
import Canvas from '@components/canvas/Canvas';

import './Grapher.scss';

const COLOR_PRIMARY = 'rgb(203, 54, 98, .5)';
const COLOR_SECONDARY = 'rgb(143, 82, 128, .7)';

const drawAxis = (canvas, context) => {
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
  
  // reset translate before next draw
  context.translate(-w / 2, -h / 2);
};

const drawFunction = (canvas, context, fn) => {
  let w = canvas.width;
  let h = canvas.height;
  
  // translate & draw x / y axis
  context.translate(w / 2, h / 2);
  
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


class Visual extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fns: [
        Math.cos,
        Math.sin,
        Math.log,
      ]
    };
  }

  render() {
    let { fns } = this.state;

    return (
      <Fragment>
        <Canvas
          draw={(canvas, context) => {
            drawAxis(canvas, context);
            fns.forEach(fn => drawFunction(canvas, context, fn));
          }}
          id="grapher"
        />
        <div className="grapher-info">
          {fns.map((fn, i) => {
            return (
              <div key={i}>
                {String(fn)}
              </div>
            );
          })}
        </div>
      </Fragment>
    );
  }
}


export default Visual;