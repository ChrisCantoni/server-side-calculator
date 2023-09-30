const express = require('express');
const app = express();
const PORT = 5003;

app.use(express.json());
app.use(express.static('./server/public'));
