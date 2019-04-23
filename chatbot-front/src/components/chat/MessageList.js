import React from 'react';

export default ({ messageList }) => {
  return messageList.map(item => (
    <p className={item.user === 'human' ? 'message-right' : 'message-left'}>{item.message}</p>
  ));
};
