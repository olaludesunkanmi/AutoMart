/* eslint-disable no-console */
import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => res.status(200).json({
  status: 200,
  data: [
    {
      message: 'Welcome!',
    },
  ],
}));

// Handle non existing route with proper message
app.all('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'Route does not exist',
}));

app.listen(PORT, () => console.log(`Running on localhost:${PORT}`));

export default app;
