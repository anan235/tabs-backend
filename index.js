/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', require('./src/routes/api'));

// GET home page
router.get('/', (req, res) => {
  res.send('Hello World!');
});

// connect to mongo
require('./src/db');
// start server
app.listen(3000, () => console.log('Listening on port 3000...'));
