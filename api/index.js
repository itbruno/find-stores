const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const database = require('./database/db');

const app = express();

app.use(cors());
database();

app.use(express.json({ extended: false }));
app.use(routes);

app.listen(process.env.API_PORT || 5000);