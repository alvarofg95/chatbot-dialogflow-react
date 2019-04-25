import React from 'react';

export default ({ messageList }) => {
  return messageList.map((item, i) => (
    <p
      key={`${i}${item.user}`}
      className={item.user === 'human' ? 'message-right' : 'message-left'}
    >
      {item.message}
    </p>
  ));
};
