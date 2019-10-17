const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, 'build')));
app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("server is running on " + port);
});