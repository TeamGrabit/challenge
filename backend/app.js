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


// 연결이 안되면
db.on('error',function(){
    console.log('Connection error!');
});

// 연결이 되면
db.once('open', function(){
    console.log('Connection success!');

});

app.use('/',router);

app.listen(port, () => console.log(`app listening on port ${port}!`))
