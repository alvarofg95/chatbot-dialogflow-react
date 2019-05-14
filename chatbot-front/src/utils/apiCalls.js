export default async (message, type = 'message', maxLength = 0) => {
  try {
    const response = await fetch('http://localhost:3002/send-message', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type,
        message,
        maxLength
      })
    });
    const result = await response.json();
    return { user: 'bot', message: result.text };
  } catch (err) {
    console.log({ err });
    return { user: 'bot', message: 'Parece que tenemos problemas para hablar, lo siento mucho' };
  }
};
