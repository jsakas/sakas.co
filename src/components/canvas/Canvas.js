import React, { Component } from 'react';
import { makeCancelablePromise } from '@utils';

import './Canvas.scss';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount(){
    this.context = this.canvas.getContext(this.props.contextType);

    window.addEventListener('resize', this.updateCanvasSize);
    this.updateCanvasSize();

    const fn = new Promise((r) => this.props.load().then(r));
    this.cancelable = makeCancelablePromise(fn);
    this.cancelable.promise.then((data) => {
      this.props.afterLoad(data);
      this.raf = this.startRaf();
      this.unload = () => this.props.unload(data);
    }).then()
      .catch((e) => {
        if (e.isCanceled) {
          console.warn('Promise rejected due to cancelation.', e);
          return e;
        } else {
          throw e;
        }
      });
  }

  componentWillUnmount() {
    this.cancelable.cancel();
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.updateCanvasSize);
    this.unload && this.unload();
  }

  updateCanvasSize = () => {
    this.canvas.setAttribute('width', window.innerWidth);
    this.canvas.setAttribute('height', window.innerHeight);
  };

  startRaf = () => {
    try {
      this.context = this.canvas.getContext(this.props.contextType);
      this.props.draw(this.canvas, this.context);
    } catch (e) {
      console.warn('Failed to draw. requestAnimationFrame will be cancelled.', e);
      return cancelAnimationFrame(this.raf);
    }

    this.raf = requestAnimationFrame(this.startRaf);
  }

  render() {
    return (
      <canvas
        key={this.props.id}
        ref={r => {
          this.canvas = r;
        }}
        className={this.props.className}
        id={this.props.id}>
      </canvas>
    );
  }
}

Canvas.defaultProps = {
  id: 'MyCanvas',
  className: 'MyCanvas',
  contextType: '2d',
  draw: () => {},
  load: () => new Promise(resolve => resolve()),
  afterLoad: () => {},
  unload: () => {},
  onLoadCallback: () => {},
};

export default class CanvasLoaderWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  onLoad = () => {
    this.setState({ loading: false });
  }

  render() {
    let { afterLoad, ...rest } = this.props;
    return (
      <div className={`Canvas ${this.state.loading ? 'Canvas--loading' : ''}`}>
        <Canvas key="canvas" afterLoad={(...args) => {
          this.onLoad();
          return afterLoad(...args);
        }} {...rest} />
        <div className="Canvas__loader"></div>
      </div>
    );
  }
}
CanvasLoaderWrapper.defaultProps = {
  afterLoad: () => {},
};
