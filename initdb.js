const mongoose = require('mongoose')

module.exports=()=>{
    mongoose.connect(process.env.MONGODB_URL,
    {   
        dbName:process.env.DB_NAME,
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }).then(()=>{
    console.log("Mongodb connected....")
}).catch(error=>{
    console.log(error.message)
}) 
mongoose.connection.on('connected',()=>{
    console.log("Mongoose connected to db.......")
})
}