var express = require('express');
var app = express();

app.use(express.static('files'));
// a middleware mounted on /user/:id; will be executed for any type of HTTP request to /user/:id
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  console.log('Request URL:', req.originalUrl);
  console.log('Resource: ', res);
  next();
});

app.get('/', function (req, res) {
  res.send('Helaaaaalo World!')
});

app.get('/socialnetwork', function (req, res) {
  res.send('SOCIAL NETWORK')
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
