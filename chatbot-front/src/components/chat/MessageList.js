import React from 'react';

export default ({ messageList }) => {
  return messageList.map(item => {
    if (item.user === 'human') {
      return <p className="message-right">{item.message}</p>;
    }
    return <p className="message-left">{item.message}</p>;
  });
};
