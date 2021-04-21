const isAdmin= async(req, res, next)=>{
  if(req.user.role === "admin"){
    next()
  }

  else{
    res.status(400).json({
      error: "You don't have the credential to access this part",
    });
  }
}

module.exports = isAdmin