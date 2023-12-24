// server.js
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const xlsx = require('xlsx');
var cors = require('cors')

const async = require('async');
// const xlsx = require('xlsx');
const Candidate = require('./models/candidateModel');
const candidateControllers = require('./controllers/candidateController');
const routerController = require('./controllers/candidateController');

console.log("candidateController", candidateControllers); 

// Create express app
const app = express();
app.use(cors())

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// MongoDB connection
//mongodb+srv://jjanardhan:<password>@cluster0.rjfkucv.mongodb.net/
// mongodb://localhost:27017/candidatesDB


const uri = 'mongodb+srv://jjanardhan:test1234@cluster0.rjfkucv.mongodb.net/candidatesDB?retryWrites=true&w=majority';

// mongoose.connect(url, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB Atlas!');
    // You can start executing your MongoDB queries here
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

const db = mongoose.connection;

/* upload.single('file'), */
app.use("/file",routerController);



// Server listening port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

