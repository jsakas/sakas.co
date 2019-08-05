import React, { Component, Fragment } from 'react';
import { withTheme } from 'emotion-theming';
import Canvas from '@components/canvas/Canvas';

import style from './Grapher.style';
import withStyles from '@utils/withStyles';

import compose from '@utils/compose';

const drawAxis = (canvas, context, theme) => {
  let w = canvas.width;
  let h = canvas.height;

  context.beginPath();
  context.strokeStyle = theme.color_primary;
  context.moveTo(-w / 2, 0);
  context.lineTo(w / 2, 0);
  context.stroke();
  context.closePath();

  context.beginPath();
  context.moveTo(0, -h / 2);
  context.lineTo(0, h / 2);
  context.stroke();
  context.closePath();
};

const drawFunction = (canvas, context, fn, theme) => {
  if (!fn) {
    return;
  }

  let w = canvas.width;
  let h = canvas.height;

  context.strokeStyle = theme.color_tertiary;

  let sy = h / 3;
  let inc = .01;

  try {
    context.beginPath();
    context.moveTo(0, fn(0) * sy);
    for (let x = 0, fx = 0; x < w / 2; x += 1, fx += inc) {
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
    for (let x = 0, fx = 0; x > -w / 2; x -= 1, fx -= inc) {
      context.lineTo(x, fn(fx) * sy);
    }
    context.stroke();
    context.closePath();
  } catch (e) {
    console.warn(e);
  }
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
    let { theme } = this.props;

    return (
      <Fragment>
        <Canvas
          draw={(canvas, context) => {
            let w = canvas.width;
            let h = canvas.height;
            context.clearRect(0, 0, w, h);

            // transform coordinate system
            context.transform(1, 0, 0, -1, w / 2, h / 2);
            
            drawAxis(canvas, context, theme);

            fns.forEach(fn => {
              let fx;
              try {
                fx = eval(fn);
              } catch (e) {
                fx = undefined;
              }
              drawFunction(canvas, context, fx, theme);
            });

            // reset translate before next draw
            context.setTransform(1, 0, 0, 1, 0, 0);
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


export default compose(
  withStyles(style),
  withTheme, 
)(Visual);
