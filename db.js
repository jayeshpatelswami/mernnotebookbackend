const mongoose = require('mongoose');
require('dotenv').config();

// mongoURI = "mongodb+srv://jayu07498:9106073301@cluster0.61djowj.mongodb.net/test";
// mongoURI = "mongodb+srv://jayu07498:9106073301@cluster0.61djowj.mongodb.net/test ";
// mongoURI="mongodb+srv://jayu07498:9106073301@cluster0.61djowj.mongodb.net/?retryWrites=true&w=majority";
// const connecttomongo = async  () =>{
//     await mongoose.connect(mongoURI , {useNewUrlParser:true , useUnifiedTopology:true} , )
//     .try(()=> console.log("conected to mongo"))
//       .catch((err)=>{console.log(err);})  
// }

const mongoURI= "mongodb+srv://jayu07498:9106073301@cluster0.61djowj.mongodb.net/notebook?retryWrites=true&w=majority"


function connecttomongo(){
 mongoose.connect(mongoURI,{
    useNewUrlParser: true, 
    useUnifiedTopology: true 
 })
 .then(()=>{
    console.log("Connected to mogo");
 }).catch((e)=>{ console.log(e)});
}



module.exports = connecttomongo;