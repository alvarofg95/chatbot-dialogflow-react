const sendMessageToDF = async (text, type = 'message') => {
  try {
    const response = await fetch('https://dialogflowbot-alvarofg95.herokuapp.com/botkit/receive', {
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
    console.log({ response });

    const result = await response.json();
    return { user: 'bot', message: result.text };
  } catch (err) {
    return { user: 'bot', message: 'Parece que tenemos problemas para hablar, lo siento mucho' };
  }
};

export default sendMessageToDF;
