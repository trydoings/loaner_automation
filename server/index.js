require('dotenv').config()
var express = require('express')
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var app = express()
var port = 3001
var database = process.env.DB
var username = process.env.USERNAME
var password = process.env.PASSWORD
var path = process.env.PATH
var url = path + database
var test = require('./routes')

//will create database if one does not already exist
mongoose.connect(url, {
  useNewUrlParser: true,
  user: username,
  pass: password,
});


var rawBodySaver = function (req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
}

app.use(bodyParser.json({ verify: rawBodySaver }));
app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
app.use(bodyParser.raw({ verify: rawBodySaver, type: function () { return true } }));

app.get('/', (req, res) => res.send('Hello World!\n'))

app.post('/', function (req, res) {
  res.send('Got a POST request')
})

app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
  console.log(req.rawBody);
  console.log("\nRequest data complete.");
})

app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})

app.use('/test', test);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
