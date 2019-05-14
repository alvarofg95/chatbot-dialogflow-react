import React, { Component } from 'react';
import MessageList from './MessageList';
import InputText from './InputText';
import sendMessageToDF from '../../utils/apiCalls';

const SCREEN_HEIGHT = window.innerHeight;

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          user: 'bot',
          message: '¡Hola!, soy un asistente virtual'
        },
        {
          user: 'bot',
          message: 'Espero que te sirva de ayuda'
        }
      ]
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
    sendMessageToDF(message, 'message', 0).then(result => {
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
    return (
      <div>
        <span className="botTitle">Chatbot de Álvaro</span>
        <div className="chatContainer">
          <div
            ref={this.messages}
            style={{ minHeight: SCREEN_HEIGHT - 125, maxHeight: SCREEN_HEIGHT - 125 }}
            className="messageList"
          >
            <MessageList messageList={this.state.messages} />
          </div>
          <InputText sendMessage={this.sendMessage} />
        </div>
      </div>
    );
  }
}
