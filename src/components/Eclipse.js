/**
 * A React component template for drawing on the canvas with requestAnimationFrame.
 */
import React, { Component } from 'react';
import Audio from '@utils/Audio';
import audioLoop from '@audio/geek.mp3';

const ID = 'AudioViz1';

const audio = new Audio(1024);

export default class CanvasDrawing extends Component {
  componentDidMount(){
    audio.getSourceFromUrl(audioLoop).then(source => {
      source.loop = true;
      source.start(0);
      this.source = source;
      this.raf = startAnimation();
    });
  
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.raf);
    this.source.stop();
  }

  render() {
    return (<canvas className={ID} id={ID}></canvas>);
  }
}


const startAnimation = () => {
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

  let color, red=0, green=0, blue=255;
  const getColor = () => {
    if(red > 0 && blue == 0){
      red-=1;
      green+=1;
    }
    if(green > 0 && red == 0){
      green-=1;
      blue+=1;
    }
    if(blue > 0 && green == 0){
      red+=1;
      blue-=1;
    }
    return [red, green, blue];
  };

  const radians = (degrees) => {
    return (degrees * (Math.PI/180));
  };

  let iterations = 0;

  const draw = () => {
    let x, y;

    color = getColor();
    context.clearRect(0, 0, canvas.width, canvas.height);


    const degrees = 360;
    const radius = 200;
    const freqData = audio.data[1];
    
    context.clearRect(0, 0, 2000, 2000);
    context.beginPath();

    for (var d = 0; d < degrees; d++) {
      context.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${.7})`;
      context.lineWidth=2;
      context.lineCap='round';
        
      // start coordinates
      x = (WINW/2) + radius * Math.cos(radians(d) + iterations);
      y = (WINH/2) + radius * Math.sin(radians(d) + iterations);
      context.moveTo(x,y);
      
      // create a copy of d
      let i = d;
        
      // for a nice eclipse effect, we go up half way and then reverse our position in the frequency data. this creates a mirror effect (comment out to see how)
      if (d > 179) {
        i = (d - 179);
      }
      
      // to get a good mix of lows and mids, start 20 items up from the bottom (or current location)      
      // reduce the value, then increase it exponentially. lower frequencies tend to read much higher so this helps normalize them.
      // make it a whole number
      let length = Math.floor(Math.pow((freqData[(i+20)] * .01), 7));
      
      x = (WINW/2) + (radius + length) * Math.cos(radians(d) + iterations);
      y = (WINH/2) + (radius + length) * Math.sin(radians(d) + iterations);
      context.lineTo(x,y);
        
      // skip every other point to demonstrate this is a plot, not a single ellipse
      d++;
    }
    
    iterations-=.001;
    
    context.stroke();
    return requestAnimationFrame(draw);
  };

  return draw();
};
