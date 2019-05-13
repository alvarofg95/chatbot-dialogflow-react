const dialogflow = require('dialogflow');
const uuid = require('uuid');
const express = require('express');
const bodyParser = require('body-parser');

const projectId = 'test-bot-88041';
// A unique identifier for the given session
const sessionId = uuid.v4();

// Create a new session
const sessionClient = new dialogflow.SessionsClient({
  keyFilename: './credentials.json'
});
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const server = express();
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
server.post('/send-message', (req, res) => {
  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: req.body.message,
        // The language used by the client (en-US)
        languageCode: 'es-ES'
      }
    }
  };
  // Send request and log result
  sessionClient.detectIntent(request).then(responses => {
    const result = responses[0].queryResult;
    return res.json({ text: result.fulfillmentText });
  });
});

server.listen(process.env.PORT || 3002, () => {
  console.log('Server is up and running at port 3002...');
});
