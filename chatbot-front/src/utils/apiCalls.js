const sendMessageToDF = async (text, type = 'message') => {
  const response = await fetch('http://localhost:3001/botkit/receive', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type,
      text,
      user: 'user-id',
      channel: 'socket'
    })
  });
  const result = await response.json();
  return { user: 'bot', message: result.text };
};

export default sendMessageToDF;
