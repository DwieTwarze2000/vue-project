import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import d from 'dialer';
import mongoose from 'mongoose';
import authRouter from './auth/routes/auth.routes';

const dialer = d.Dialer;
dotenv.config();

const app = express();

const config = {
  url: process.env.URL,
  login: process.env.LOGIN,
  password: process.env.PASSWORD,
};

dialer.configure(config);

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  next();
});

const serverInstance = app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

const io = new Server(serverInstance);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('MongoDB connected');
  });

app.post('/call', async (req, res) => {
  const number1 = req.body.number;
  const number2 = process.env.PHONE_NUMBER; // tutaj dejemy swój numer
  const bridge = await dialer.call(number1, number2);
  let oldStatus = null;
  let interval = setInterval(async () => {
    let currentStatus = await bridge.getStatus();
    console.log(currentStatus);
    if (currentStatus !== oldStatus) {
      oldStatus = currentStatus;
      io.emit('status', currentStatus);
    }
    if (
      currentStatus === 'ANSWERED' ||
      currentStatus === 'FAILED' ||
      currentStatus === 'BUSY' ||
      currentStatus === 'NO ANSWER'
    ) {
      console.log('stop');
      clearInterval(interval);
    }
  }, 1000);
  res.json({
    id: '123',
    status: bridge.STATUSES.NEW,
  });
});

app.get('/status', async function (req, res) {
  let status = await bridge.getStatus();
  res.json({ id: '123', status: status });
});

app.use('/auth', authRouter);
