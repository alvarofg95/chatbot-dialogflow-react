import React from 'react';

export default ({ messageList }) => {
  return messageList.map(item => {
      if (item.user === 'human') {
           return <p>{item.message}</p>;
      }
      return <p>{item.message}</p>
  });
};
