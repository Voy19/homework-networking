require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('./middlewares/cors');

app.use(bodyParser.json());

// CORS Middleware
app.use(cors);

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/orders', require('./routes/orders'));

// Invoke the web server
app.listen(process.env.APP_PORT, () => {
  console.log(
    `App listening at : `,
    `http://${process.env.APP_HOST}:${process.env.APP_PORT}`
  );
});
