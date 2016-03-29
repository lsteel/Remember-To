'use strict';

const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const PUBLIC_DIR = path.join(__dirname, 'public/views');

app.set('port', PORT);
app.set('views', path.join(__dirname, 'public/views'));
app.set('view cache', false);

app.use(express.static(PUBLIC_DIR));

app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});
