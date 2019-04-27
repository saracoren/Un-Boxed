//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/'+ `innovative_items`;

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

//Model
const newItems = require('./models/seed.js')
const Item = require('./models/model.js')

//___________________
// Routes
//___________________
//localhost:3000


// Home
app.get('/' , (req, res) => {
  res.render('home.ejs');
});

//Populating seed Data
app.get('/seed', async (req, res) => {
  try {
    const seedItems = await Item.create(newItems)
    res.send(seedItems)
  } catch (err) {
    res.send(err.message)
  }
})

// Products Index
app.get('/products', (req, res) => {
  // res.render('products_index.ejs');
  Item.find({
    category:'Products'
  }, (error, allItems)=>{
      // console.log(allItems)
      res.render('products_index.ejs', {
          item: allItems
      });
  });
})

// News Index
app.get('/news', (req, res) => {
  // res.render('products_index.ejs');
  Item.find({
    category:'News'
  }, (error, allItems)=>{
      // console.log(allItems)
      res.render('news_index.ejs', {
          item: allItems
      });
  });
})

// Events Index
app.get('/events', (req, res) => {
  // res.render('products_index.ejs');
  Item.find({
    category:'Events'
  }, (error, allItems)=>{
      // console.log(allItems)
      res.render('events_index.ejs', {
          item: allItems
      });
  });
})

// Media Index
app.get('/media', (req, res) => {
  // res.render('products_index.ejs');
  Item.find({
    category:'Media'
  }, (error, allItems)=>{
      // console.log(allItems)
      res.render('media_index.ejs', {
          item: allItems
      });
  });
})

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));