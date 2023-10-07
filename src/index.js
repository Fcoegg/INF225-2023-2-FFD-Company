const express = require('express');
const morgan = require('morgan');

const taskroutes = require('./routes/task.routes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(taskroutes);
app.listen(3000)
console.log('Server on port 3000')