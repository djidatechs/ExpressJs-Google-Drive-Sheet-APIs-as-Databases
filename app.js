var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()

var indexRouter = require('./routes/index');
var servicesRouter = require('./routes/services');

var app = express();

app.use(logger('dev'));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
   origin: '*'
}))




app.use('/', indexRouter);
app.use('/services', servicesRouter);

module.exports = app;
