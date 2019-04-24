import React, { Component } from 'react';
import MessageList from './MessageList';
import InputText from './InputText';
import sendMessageToDF from '../../utils/apiCalls';

const MESSAGES_DEFAULT = [
  {
    user: 'bot',
    message: '¡Hola!, soy un asistente virtual'
  },
  {
    user: 'bot',
    message: 'Espero que te sirva de ayuda'
  }
];

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    };
    this.messages = React.createRef();
    this.sendMessage = this.sendMessage.bind(this);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }

  sendMessage(message) {
    this.setState(prevState => {
      prevState.messages.push({ message, user: 'human' });
      return { ...prevState };
    });
    sendMessageToDF(message).then(result => {
      this.setState(
        prevState => {
          prevState.messages.push(result);
          return { ...prevState };
        },
        () => this.scrollToBottom()
      );
    });
  }

  scrollToBottom() {
    if (this.messages && this.messages.current && this.messages.current) {
      this.messages.current.scrollTop = this.messages.current.scrollHeight;
    }
  }

  render() {
    const messages =
      this.state.messages && this.state.messages.length ? this.state.messages : MESSAGES_DEFAULT;
    return (
      <div className="chatContainer">
        <div ref={this.messages} className="messageList">
          <MessageList messageList={messages} />
        </div>
        <InputText sendMessage={this.sendMessage} />
      </div>
    );
  }
}
