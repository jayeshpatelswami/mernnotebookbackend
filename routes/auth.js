const express = require('express');
const Router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");

const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchusre');

const jwt_secrate =" 23w4er!@#$%^YHbjgtfre4dhgdyfvhfsgygfasesrjk";


//in this we create a new user (Sign up) 
Router.post('/createuser',[
    body('email','Enter valid email').isEmail(),
    body('name','enter valid name ').isLength({min:3}),
    body('password','password s length is not aligibal').isLength({min:5})
], async(req,res)  => {
    sussec = false
    // console.log(req.body); 
    // const user = User(req.body);
    // user.save()
    // res.send( req.body);
    // res.send(req.body)

    //Route : 1 for ceate a  User
    //is thare are errors then this is send error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ sussec , errors: errors.array()});
    }

    try{ 
      let user = await  User.findOne({email : req.body.email});
      if (user) {
        return res.status(400).json({sussec,error:" a user is exist in our database"})
      }
      const salt =  await  bcrypt.genSalt(10);
      const secPass = await bcrypt.hash( req.body.password , salt) 

          user = await User.create({
          name: req.body.name,
          email: req.body.email,
          password: secPass,
        })
        
        const data={
          user:{
          id: user.id
          }
        }

        const authtoken=  jwt.sign(data,jwt_secrate)
        
        // res.json(user)
        sussec=true
        res.json({sussec,authtoken})
    }
    catch(error){
      sussec=false
      console.error(sussec,error.message);
    res.status(500).send("SOme error is ouured")
    };
    
  
})


//Route : 2 for login a User
Router.post("/login",[
  body('email','Enter valid email').isEmail(),
  body('password','enter password').exists()
], async(req,res)=>{
 let sussec = false;
 //is thare are errors then this is send error
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
  
   return res.status(400).json({sussec, errors: errors.array()});
 }
 
 const {email , password} = req.body;
 
 try {

  let  user = await User.findOne({email});
 
  if(!user){
    return res.status(400).json({sussec, errors:"Enter riight password or try again"});
  }
  
  const passcompare = await bcrypt.compare(password , user.password);
  
  if(!passcompare){
    return res.status(400).json({sussec, errors:"Enter riight password or try again"});

  }
    const data={
      user:{
      id: user.id
      }
    }
    sussec=true
    const authtoken=  jwt.sign(data,jwt_secrate)
    res.json({sussec,authtoken})
   

 } catch(error){
  sussec=false
  console.error(sussec,error.message);
  res.status(500).send("SOme error is ouured")
};
  
})

//Rout 3 get the data of leged in user
Router.post('/getdata',  fetchuser , async (req,res)=>{

  try {
    let userid = req.user.id; 
    const user = await User.findById(userid).select("-password");
    res.send(user)
  }
   catch  {
  res.status(500).end()
  res.send("SOme error is ouured")
  }

} )


module.exports=Router