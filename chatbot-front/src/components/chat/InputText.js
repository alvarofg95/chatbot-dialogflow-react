import React, { Component } from 'react';

export default class InputBox extends Component {
  constructor(props) {
    super(props);
    // REFS
    this.input = React.createRef();
    // BIND
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage() {
    if (this.input && this.input.current && this.input.current.value && this.props.sendMessage) {
      this.props.sendMessage(this.input.current.value);
    }
    this.input.current.value = null;
  }

  render() {
    return (
      <div>
        <input ref={this.input} type="text" onChange={this.changeTextState} />
        <button onClick={this.sendMessage}>Send</button>
      </div>
    );
  }
}
