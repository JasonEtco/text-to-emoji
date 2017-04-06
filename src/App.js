import React, { Component } from 'react';
import emojis from './emojis.js';

const emojiKeys = Object.keys(emojis);

function rando(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function convertToEmojis(text) {
  const words = text.split(' ').join('').replace(/[^a-z]/gi, '');
  const letters = words.split('');
  return letters.map(letter => {

    if (parseInt(letter, 10)) {
      const key = emojiKeys[0];
      return `<div data-letter="${letter}" class="emoji" title="${key}">${emojis[key]}</div>`;
    }

    const keys = emojiKeys.filter(key => key.startsWith(letter.toLowerCase()));
    const key = rando(keys) || keys[0];

    if (key === undefined) console.log(letter);

    return `<div data-letter="${letter}" class="emoji" title="${key}">${emojis[key]}</div>`;
  }).join('');
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  state = { text: '', emojis: '', width: 1 }

  componentDidMount() {
    const width = document.querySelector('.wrapper').clientWidth;
    this.setState({ width });
  }

  handleChange(e) {
    const { value: text } = e.target;
    this.setState({ emojis: convertToEmojis(text), text });
  }

  render() {
    const { emojis, text, width } = this.state;
    const { h, w } = { w: 19.75, h: 27.5 };
    const height = `${(width * h) / w}px`;

    return (
      <div className="app">
        <textarea autoFocus onChange={this.handleChange} value={text} />
        <aside className="wrapper" ref={(r) => { this.wrapper = r; }} style={{ height }} dangerouslySetInnerHTML={{ __html: emojis }} />
      </div>
    )
  }
}
