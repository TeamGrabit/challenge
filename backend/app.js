const express = require('express');
const app = express();
const port = 5000;

const router = require('./routes/routes');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://HyunGwang:1234@cluster0.xstvm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify:false
})
.then(()=> console.log('MoongoDB connected'))
.catch(err => console.log(err));


app.use(express.json());

app.use('/',router);

app.listen(port, () => console.log(`app listening on port ${port}!`))
