const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressSession = require('express-session');
const port = 5000;

const router = require('./routes/routes');

const config = require('./config/key');

const mongoose = require('mongoose');

require("dotenv").config();
const cookieSecret = process.env.COOKIE_SECRET;

mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify:false
})
.then(()=> console.log('MoongoDB connected'))
.catch(err => console.log(err));

app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret : cookieSecret,
    cookie: {
        httpOnly: true,
        secure: false,
    }
}))
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/',router);

app.listen(port, () => console.log(`app listening on port ${port}!`))
