const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const methodoverride = require('method-override');

const port = process.env.PORT || 9000 ;
const app = express();


const config = require('./config/configuration');
const mongoose = require('mongoose');  

mongoose.connect(config.db);
require('./config/passport')(passport);
mongoose.connection.on("connected",(err)=> {
    if(err) return console.log(err);

    console.log('connected to datbase '+ config.db);
});

if(process.env.NODE_ENV === 'developement') {
    app.use(morgan('dev'));
}else if(process.env.NODE_ENV === 'production'){
    app.use(compress());
}
app.set('json spaces',4);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(methodoverride());

// passport middleware
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.secret
}));

app.use(passport.initialize());
app.use(passport.session());



//routing

require('./routes/user.auth')(app);
require('./routes/customers.routes')(app);


process.env.NODE_ENV = process.env.NODE_ENV || 'development';


app.listen(port,()=> {
	console.log('Node server is running at localhost:'+ port);
});