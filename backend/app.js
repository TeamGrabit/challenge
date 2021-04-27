const express = require('express');
const app = express();
const port = 5000;

const router = require('./routes/routes');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testDB');
const db = mongoose.connection;

// 연결이 안되면
db.on('error',function(){
    console.log('Connection error!');
});

// 연결이 되면
db.once('open', function(){
    console.log('Connection success!');
});

app.use(express.json());

app.use('/',router);

app.listen(port, () => console.log(`app listening on port ${port}!`))