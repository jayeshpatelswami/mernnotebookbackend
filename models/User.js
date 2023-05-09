const mongoose = require('mongoose');
const { Schema } = mongoose

const Userschema = new Schema({
      name :{
        type:String,
        required: true,
      },
      email :{
        type:String,
        required: true,
        // unique:true
      },
      password :{
        type:String,
        
      },
      date:{
        type:Date,
        default: Date.now
      }
}) 
const User = mongoose.model("User" , Userschema );

module.exports = User;