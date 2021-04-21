const jwt = require('jsonwebtoken')
const User = require('../Schema/UserSchema')


const auth = async (req, res, next)=>{
  if(req.signedCookies){
    const token = req.signedCookies.token
    try{
      const decoded = jwt.decode(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id)
      if(!user){
        res.status(404).json({
          error: "User Not Found"
        })
      }

      req.user= user
      next()
    }

    catch(err){
      res.status(500).json({
        error: "There is a problem"
      });
      
    }
  }
}

module.exports = auth