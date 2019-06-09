const express = require('express');
const clients = require('./routes/clients');

const app = express();

app.use(express.json());

app.use('/clients', clients);

app.listen(3000);
