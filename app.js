var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
const connectionString =
process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString);

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
console.log("Connection to DB succeeded")});

var Pasta = require("./models/pasta");


async function recreateDB(){
await Pasta.deleteMany();
let instance1 = new
Pasta({name:"spaghetti", weight:'500g', price:5.99});
instance1.save().then(doc=>{console.log("First object saved")}).catch(err=>{console.error(err)});
let instance2 = new
Pasta({name:"rotini", weight:'400', price:6.99});
instance2.save().then(doc=>{console.log("Second object saved")}).catch(err=>{console.error(err)});
let instance3 = new
Pasta({name:"fusili", weight:'750', price:7.99});
instance3.save().then(doc=>{console.log("Third object saved")}).catch(err=>{console.error(err)});
}
let reseed = false;
if (reseed) {recreateDB();}



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pastaRouter = require('./routes/pasta');
var boardRouter = require('./routes/board');
var chooseRouter = require('./routes/choose');
var resourceRouter = require('./routes/resource');



const { start } = require('repl');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pastas', pastaRouter);
app.use('/board', boardRouter);
app.use('/choose', chooseRouter);
app.use('/resource', resourceRouter);
app.use('/pasta', pastaRouter);



app.get('/board', (req, res) => {
  const { rows, cols } = req.query;
  console.log(`rows: ${rows}, cols: ${cols}`);
  res.render('board', { title: 'Board Display', rows, cols });
});

app.get('/pastas/detail', (req, res) => {
  res.render('pastadetail', {title: 'Pasta Detail'})
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
