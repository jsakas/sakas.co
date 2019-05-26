import React, { Component, Fragment } from 'react';
import Canvas from '@components/canvas/Canvas';

import './Grapher.scss';

const COLOR_PRIMARY = 'rgb(203, 54, 98, .8)';
const COLOR_SECONDARY = 'rgb(143, 82, 128, .9)';

const drawAxis = (canvas, context) => {
  let w = canvas.width;
  let h = canvas.height;

  context.clearRect(0, 0, w, h);
  
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
  if (!fn) {
    return;
  }

  let w = canvas.width;
  let h = canvas.height;
  
  // translate & draw x / y axis
  context.translate(w / 2, h / 2);
  
  context.strokeStyle = COLOR_SECONDARY;
  
  let sy = h / 3;
  let inc = .01;

  try {

    context.beginPath();
    context.moveTo(0, fn(0) * sy);
    for (let x = 0, fx = 0; x < w / 2; x+=1, fx+= inc) {
      context.lineTo(x, fn(fx) * sy);
    }
    context.stroke();
    context.closePath();
  } catch (e) {
    console.warn(e);
  }

  try {
    context.beginPath();
    context.moveTo(0, fn(0) * sy);
    for (let x = 0, fx = 0; x > -w / 2; x-=1, fx-= inc) {
      context.lineTo(x, fn(fx) * sy);
    }
    context.stroke();
    context.closePath();
  } catch (e) {
    console.warn(e);
  }

  // reset translate before next draw
  context.translate(-w / 2, -h / 2);
};


class Visual extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fns: [
        'x => Math.sin(x)',
      ],
    };
  }

  setFn = i => e => {
    let value = e.target.value;
    this.setState(prevState => {
      let fns = [...prevState.fns];
      fns[i] = String(value);
      return { fns };
    });
  }

  render() {
    let { fns } = this.state;

    return (
      <Fragment>
        <Canvas
          draw={(canvas, context) => {
            drawAxis(canvas, context);

            fns.forEach(fn => {
              let fx;
              try {
                fx = eval(fn);
              } catch (e) {
                fx = undefined;
              }
              drawFunction(canvas, context, fx);
            });
          }}
          id="grapher"
        />
        <div className="grapher-info">
          {fns.map((fn, i) => {
            return (
              <div className="grapher-input" key={i}>
                <input 
                  placeholder="e.g. Math.sin, x => Math.sin(x), x => x ** 2, Math.random"
                  type="text"
                  value={fn}
                  onChange={this.setFn(i)}>   
                </input>
              </div>
            );
          })}
        </div>
      </Fragment>
    );
  }
}


export default Visual;