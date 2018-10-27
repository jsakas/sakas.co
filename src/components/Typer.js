import React, { Component, Fragment } from 'react';

export default class Typer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      target: props.text,
      text: props.text.split('').map(i => {
        return {
          target: i,
          count: 0,
          max: Math.floor(Math.random() * 50),
          current: String.fromCharCode(Math.floor(Math.random() * 25) + 97)
        }
      })
    };
  }

  componentDidMount() {
    const refresh = setInterval(() => {
      if (this.state.text.map(i => i.current).join('') == this.props.text) {
        clearInterval(refresh);
        this.props.onComplete();
      }
      this.iterate();
    }, this.props.speed);
  }

  iterate = () => {
    this.setState(prevState => {
      return {
        text: prevState.text.map(i => {
          if (i.current == i.target) {
            return i;
          }

          if (i.count >= i.max) {
            i.current = i.target;
            return i;
          }

          i.count += 1;
          i.current = String.fromCharCode(Math.floor(Math.random() * 25) + 97);

          return i;
        }),
      }
    })
  }

  render() {
    return this.state.text.map((i, index) => {
      return (
        <Fragment key={index}>{i.current}</Fragment>
      );
    });
  }
}

Typer.defaultProps = {
  text: '',
  speed: 100,
  onComplete: () => {},
};
