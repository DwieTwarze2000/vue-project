require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const httpServer = express();
const dialer = require('dialer').Dialer;

const config = {
  url: process.env.URL,
  login: process.env.LOGIN,
  password: process.env.PASSWORD,
};

dialer.configure(config);

httpServer.use(bodyParser.json());
httpServer.use(cors());
httpServer.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  next();
});

httpServer.get('/call/:number1/:number2', (req, res) => {
  const number1 = req.params.number1;
  const number2 = req.params.number2;
  dialer.call(number1, number2);
  res.json({ success: true });
});
// Serwer nasłuchuje na porcie 3000
httpServer.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
// Definiowanie odpowiedzi na request get

httpServer.get('/', function (req, res) {
  console.log('url get /');
  res.json({ message: 'Hello World' });
});

httpServer.post('/call/', async (req, res) => {
  const number1 = req.body.number;
  const number2 = process.env.PHONE_NUMBER; // tutaj dejemy swój numer
  const bridge = await dialer.call(number1, number2);
  let interval = setInterval(async () => {
    let status = await bridge.getStatus();
    console.log(status);
    if (
      status === 'ANSWERED' ||
      status === 'FAILED' ||
      status === 'BUSY' ||
      status === 'NO ANSWER'
    ) {
      console.log('stop');
      clearInterval(interval);
    }
  }, 2000);
  res.json({ success: true });
});

httpServer.get('/status', async function (req, res) {
  let status = await bridge.getStatus();
  res.json({ id: '123', status: status });
});
