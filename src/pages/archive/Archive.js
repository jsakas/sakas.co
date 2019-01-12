import React, { Component } from 'react';
import Prism from 'prismjs';

import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-json';

import './Archive.scss';

class Gist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.props.file && fetch(this.props.file.raw_url)
      .then(response => response.text())
      .then(gistBody => this.setState({ gistBody, loading: false }))
      .catch();
  }

  prismHighlight(gist, language) {
    return Prism.highlight(gist, 
      Prism.languages[language], 
      language
    );
  }

  render() {
    const { gist, file } = this.props;
    const { gistBody } = this.state;
    const language = file.language.toLowerCase();

    return (
      <div className="Gist">
        <div className="Gist__heading">
          <h2 className="Gist__title">{file.filename}</h2>
          <h3 className="Gist__id">{gist.id}</h3>
          <h4 className="Gist__language">{language}</h4>
        </div>
        <div className="Gist__body">
          {gistBody && Prism.languages[language]
            ? (
              <pre className={`language-${language}`} dangerouslySetInnerHTML={{
                __html: this.prismHighlight(gistBody, language)
              }} />
            ) : (
              <pre className={`language-${language}`}>
                { gistBody }
              </pre>
            )
          }
        </div>
      </div>
    );
  }
}

class Archive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gists: [],
    };
  }

  componentDidMount() {
    fetch('https://api.github.com/users/jsakas/gists', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
      .then(response => response.json())
      .then(gists => Array.isArray(gists) && this.setState({ gists }))
      .catch();
  }

  render() {
    return (
      <div className="Archive">
        {this.state.gists.map(gist => {
          return Object.keys(gist.files).map(f => {
            const file = gist.files[f];
            return (
              <Gist
                key={`${gist.id}-${file.filename}`}
                gist={gist}
                file={file}
              />
            );
          });
        })}
      </div>
    );
  }
}

export default Archive;
