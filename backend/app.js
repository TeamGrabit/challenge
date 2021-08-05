const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressSession = require('express-session');
const path = require('path');

const port = process.env.PORT || 5000;

const bodyParser = require('body-parser')

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
    origin: process.env.CORSORIGIN,
    credentials: true,
}));
//app.use(cors());

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
app.get('/test', (req,res) => res.send('hi'));
app.use('/',router);
// app.get("*", (req,res) => {
// 	res.sendFile(path.join(__dirname+"/../frontend/build/index.html"));
// })
if(process.env.NODE_ENV === "production"){
	// app.use(express.static("../frontend/build"));
	app.get("*", (req,res) => {
		res.sendFile(path.join(__dirname+"/../frontend/build/index.html"));
	})
}
else app.get('/', (req,res)=>{res.send('hi')})

app.listen(port, () => console.log(`app listening on port ${port}!`))
