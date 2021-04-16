const jwt = require('jsonwebtoken');
const createError = require('http-errors')
//console.log(token)


const jwtauth  = ((req,res,next)=>{
    try {
        const token = req.headers.authorization.toString().split(' ')[1]
        option ={ expiresIn: 60*60*24}
        ans =jwt.verify(token, 'shhhhh',option)
         next()
       }
   catch (error) {
      next(createError(422,error.message))
     // console.log("not acess authorization")
   }
})

module.exports = jwtauth