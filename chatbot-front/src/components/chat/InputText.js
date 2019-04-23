import React, { Component } from 'react';

export default class InputBox extends Component {
  constructor(props) {
    super(props);
    // REFS
    this.input = React.createRef();
    // BIND
    this.sendMessage = this.sendMessage.bind(this);
    this.checkEnterPressed = this.checkEnterPressed.bind(this);
  }

  sendMessage() {
    if (this.input && this.input.current && this.input.current.value && this.props.sendMessage) {
      this.props.sendMessage(this.input.current.value);
    }
    this.input.current.value = null;
  }

  checkEnterPressed(e) {
    if (e.keyCode === 13 && e.shiftKey === false) {
      this.sendMessage();
    }
  }

  render() {
    return (
      <div className="inputText">
        <input
          ref={this.input}
          type="text"
          onChange={this.changeTextState}
          onKeyDown={this.checkEnterPressed}
          placeholder="Introducir texto"
        />
        <button onClick={this.sendMessage} title="Enviar">
          <img width="40" src="/send-green.svg" alt="Enviar" />
        </button>
      </div>
    );
  }
}
