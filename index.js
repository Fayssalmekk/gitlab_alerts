const express = require('express');
const alerts = require('./routes/alerts');
const bodyParser = require('body-parser');


const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/alerts', alerts);

app.listen(5000 , function(err) {
    if (err) console.log(err);
    console.log("running");	
});

module.exports = app;
