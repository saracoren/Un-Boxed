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
// app.get('/seed', async (req, res) => {
//   try {
//     const seedItems = await Item.create(newItems)
//     res.send(seedItems)
//   } catch (err) {
//     res.send(err.message)
//   }
// })

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

// New
app.get('/new', (req, res) => {
  res.render('new.ejs')
})

// Create
app.post('/', (req, res) => {
  Item.create(req.body, (error, createdProduct)=>{
      if (error) {
          res.send(error)
      } else {
          res.redirect('/');
      }
  });
})


// Products Show
app.get('/products/:id', (req, res) => {
  Item.findById(req.params.id, (error, allItems)=>{
    res.render('show.ejs', {
      item: allItems
    });
  });
})

// Edit Products
app.get('/products/:id/edit', (req, res)=>{
  Item.findById(req.params.id, (err, foundItem)=>{
      res.render('edit.ejs', {
          item: foundItem
      });
  });
});

// Edit News
app.get('/news/:id/edit', (req, res)=>{
  Item.findById(req.params.id, (err, foundItem)=>{
      res.render('edit.ejs', {
          item: foundItem
      });
  });
});

// Edit Events
app.get('/events/:id/edit', (req, res)=>{
  Item.findById(req.params.id, (err, foundItem)=>{
      res.render('edit.ejs', {
          item: foundItem
      });
  });
});

// Edit Media
app.get('/media/:id/edit', (req, res)=>{
  Item.findById(req.params.id, (err, foundItem)=>{
      res.render('edit.ejs', {
          item: foundItem
      });
  });
});


// News Show
app.get('/news/:id', (req, res) => {
  Item.findById(req.params.id, (error, allItems)=>{
      res.render('show.ejs', {
          item: allItems
      });
  });
})

// Events Show
app.get('/events/:id', (req, res) => {
  Item.findById(req.params.id, (error, allItems)=>{
      res.render('show.ejs', {
          item: allItems
      });
  });
})

// Media Show
app.get('/media/:id', (req, res) => {
  Item.findById(req.params.id, (error, allItems)=>{
      res.render('show.ejs', {
          item: allItems
      });
  });
})

// Delete Products
app.delete('/products/:id', (req, res) => {
  Item.findByIdAndRemove(req.params.id, (err, deletedProduct)=>{
      res.redirect('/products');
  });
})

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));