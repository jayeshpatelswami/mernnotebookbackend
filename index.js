const connecttomongo = require('./db');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config()
var cors = require('cors')


const app = express();
const port = process.env.PORT || 5000;

connecttomongo();



app.use(cors())
app.use(express.json());
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'))

app.get("/",(req,res)=>{
  console.log("hello");
  res.send("done")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})