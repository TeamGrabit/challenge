const express = require('express');
const app = express();
const port = 5000;

const router = require('./routes/routes');

const config = require('./config/key');

const mongoose = require('mongoose');

mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify:false
})
.then(()=> console.log('MoongoDB connected'))
.catch(err => console.log(err));


app.use('/',router);

app.listen(port, () => console.log(`app listening on port ${port}!`))
