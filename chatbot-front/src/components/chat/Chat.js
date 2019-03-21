import React, { Component } from 'react';
import MessageList from './MessageList';
import InputText from './InputText';
import sendMessageToDF from '../../utils/apiCalls';

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };

    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(message) {
    this.setState(prevState => {
      prevState.messages.push({ message, user: 'human' });
      return { ...prevState };
    });
    sendMessageToDF(message).then(result => {
      console.log({ setState: result });
      this.setState(prevState => {
        prevState.messages.push(result);
        return { ...prevState };
      });
    });
  }

  render() {
    return (
      <div>
        <MessageList messageList={this.state.messages} />
        <InputText sendMessage={this.sendMessage} />
      </div>
    );
  }
}
