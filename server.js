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

/////////////////////////////////////////////////////////////////////////////////
// INDEX

// Products Index
app.get('/Products', (req, res) => {
  // res.render('products_index.ejs');
  res.status(418).send('sadness')
  Item.find({
    category:'Products'
  }, (error, allItems)=>{
      // console.log(allItems)
      if(error) {
        res.status(418).json({"myerror": error})
      }
      res.render('index.ejs', {
          item: allItems
      });
  });
})

// News Index
app.get('/News', (req, res) => {
  // res.render('products_index.ejs');
  Item.find({
    category:'News'
  }, (error, allItems)=>{
      // console.log(allItems)
      res.render('index.ejs', {
          item: allItems
      });
  });
})

// Events Index
app.get('/Events', (req, res) => {
  // res.render('products_index.ejs');
  Item.find({
    category:'Events'
  }, (error, allItems)=>{
      // console.log(allItems)
      res.render('index.ejs', {
          item: allItems
      });
  });
})

// Media Index
app.get('/Media', (req, res) => {
  // res.render('products_index.ejs');
  Item.find({
    category:'Media'
  }, (error, allItems)=>{
      // console.log(allItems)
      res.render('index.ejs', {
          item: allItems
      });
  });
})

///////////////////////////////////////////////////////////
// New
app.get('/New', (req, res) => {
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

/////////////////////////////////////////////////////////////
// SHOW

// Products Show
app.get('/Products/:id', (req, res) => {
  Item.findById(req.params.id, (error, allItems)=>{
    res.render('show.ejs', {
      item: allItems
    });
  });
})

// News Show
app.get('/News/:id', (req, res) => {
  Item.findById(req.params.id, (error, allItems)=>{
      res.render('show.ejs', {
          item: allItems
      });
  });
})

// Events Show
app.get('/Events/:id', (req, res) => {
  Item.findById(req.params.id, (error, allItems)=>{
      res.render('show.ejs', {
          item: allItems
      });
  });
})

// Media Show
app.get('/Media/:id', (req, res) => {
  Item.findById(req.params.id, (error, allItems)=>{
      res.render('show.ejs', {
          item: allItems
      });
  });
})

//////////////////////////////////////////////////////////////
// EDIT 

// Edit Products
app.get('/Products/:id/Edit', (req, res)=>{
  Item.findById(req.params.id, (err, foundItem)=>{
      res.render('edit.ejs', {
          item: foundItem
      });
  });
});

// Edit News
app.get('/News/:id/Edit', (req, res)=>{
  Item.findById(req.params.id, (err, foundItem)=>{
      res.render('edit.ejs', {
          item: foundItem
      });
  });
});

// Edit Events
app.get('/Events/:id/Edit', (req, res)=>{
  Item.findById(req.params.id, (err, foundItem)=>{
      res.render('edit.ejs', {
          item: foundItem
      });
  });
});

// Edit Media
app.get('/Media/:id/Edit', (req, res)=>{
  Item.findById(req.params.id, (err, foundItem)=>{
      res.render('edit.ejs', {
          item: foundItem
      });
  });
});

/////////////////////////////////////////////////////////
// UPDATE

// Update Products
app.put('/Products/:id', (req, res)=>{
  Item.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedItem)=>{
    // res.send(updatedItem);
    res.redirect('/Products');
  });
});

// Update News
app.put('/News/:id', (req, res)=>{
  Item.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedItem)=>{
    res.redirect('/News');
  });
});

// Update Events
app.put('/Events/:id', (req, res)=>{
  Item.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedItem)=>{
    res.redirect('/Events');
  });
});

// Update Media
app.put('/Media/:id', (req, res)=>{
  Item.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedItem)=>{
    res.redirect('/Media');
  });
});

////////////////////////////////////////////////////////////
// DELETE

// Delete Products
app.delete('/Products/:id', (req, res) => {
  Item.findByIdAndRemove(req.params.id, (err, deletedProduct)=>{
      res.redirect('/Products');
  });
})

// Delete News
app.delete('/News/:id', (req, res) => {
  Item.findByIdAndRemove(req.params.id, (err, deletedProduct)=>{
      res.redirect('/News');
  });
})

// Delete Events
app.delete('/Events/:id', (req, res) => {
  Item.findByIdAndRemove(req.params.id, (err, deletedProduct)=>{
      res.redirect('/Events');
  });
})

// Delete News
app.delete('/Media/:id', (req, res) => {
  Item.findByIdAndRemove(req.params.id, (err, deletedProduct)=>{
      res.redirect('/Media');
  });
})

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));