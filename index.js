const express = require('express');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const morgan = require('morgan');
const winston = require('./modules/winston');
const mongoose = require('mongoose');
const passport = require('passport');
const passport_jwt = require('passport-jwt');
const jwt = require('jsonwebtoken');
const app = express();
require('dotenv').config();


app.use(morgan('combined', { stream: winston.stream }));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(expressSession({secret: "T86!-^}2mYa289B", saveUninitialized: true, resave: false}));


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV === 'DEVELOPMENT' ? err : {};
  
    // add this line to include winston logging
    winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  
    // render the error page
    res.status(err.status || 500);
    res.render('Internal server error!');
});


app.listen(process.env.PORT,function(){
	console.log('Listening on port ' + process.env.PORT + '...');
});