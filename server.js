var express = require('express');

var app = express();

app.use(express.static(__dirname + '/build'));
app.use('*', (req, res) => {
  res.sendFile(__dirname + '/build/index.html');
})

var server = app.listen(process.env.PORT || 3006, function () {
  console.log('Listening on port ' + server.address().port);
});