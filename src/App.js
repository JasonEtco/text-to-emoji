import React, { Component } from 'react';
import emojis from './emojis.js';
import './App.css';

const emojiKeys = Object.keys(emojis);

function rando(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function convertToEmojis(text) {
  const words = text.replace(/[^0-9a-z\s]/gi, '').split(' ');
  const letters = words.map(word => word.substring(0, 1));
  return letters.map(letter => {

    if (parseInt(letter, 10)) {
      const key = emojiKeys[0];
      return `<span title="${key}">${emojis[key]}</span>`;
    }

    const keys = emojiKeys.filter(key => key.startsWith(letter.toLowerCase()));
    const key = rando(keys) || keys[0];

    if (key === undefined) console.log(letter);

    return `<span title="${key}">${emojis[key]}</span>`;
  }).join('');
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  state = { text: '', emojis: '' }

  handleChange(e) {
    const { value: text } = e.target;
    this.setState({ emojis: convertToEmojis(text), text });
  }

  render() {
    const { emojis, text } = this.state;
    return (
      <div className="app">
        <aside>
          <textarea onChange={this.handleChange} value={text} />
        </aside>

        <aside dangerouslySetInnerHTML={{ __html: emojis }} />
      </div>
    )
  }
}
