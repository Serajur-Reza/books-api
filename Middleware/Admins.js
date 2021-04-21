const express = require('express')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

const Admin = require('../Schema/UserSchema')

module.exports.signup = async (req, res, next) => {
  try{
    const {name, email, password, role}= req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const admin = new Admin({
      name, email,
      password: hashedPassword,
      role
    });

    console.log(admin)
    
    await admin.save()
    const token = jwt.sign({ id: admin._id, email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    
    res.cookie('token', token, {
      expires: new Date(Date.now() + 86400000),
      secure: false,
      httpOnly: true,
      signed: true
    })

    req.user = admin

    res.status(200).json({
      data: "User created successfully",
    });
  }

  catch(error){
    res.status(500).json({
      error: "There is a problem creating the admin"
    })
  }
};

module.exports.login = async (req, res, next) => {
  try{
    const { email, password } = req.body
    const user = await Admin.find({email})
    console.log(user)

    if (user && user[0].password) {
      const matchedPassword = await bcrypt.compare(password, user[0].password);

      if (matchedPassword) {
        const token = jwt.sign({  id: user[0]._id ,email }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        
        res.cookie("token", token, {
          expires: new Date(Date.now() + 86400000),
          secure: false,
          httpOnly: true,
          signed: true,
        });

        req.user = user
        
        res.status(200).json({
          data: "logged in successfully",
        });

        next()
      } else {
        res.status(401).json({
          error: "authentication failed",
        });
      }
    } else {
      res.status(401).json({
        error: "authentication failed",
      });
    }
  }

  catch(error){
    res.status(500).json({
      error: "login failed",
    });
  }
};