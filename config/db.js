const mongoose = require('mongoose');

exports.connectDB = ()=>{
    mongoose.connect(process.env.DB)
    .then(res=> console.log(`DB is connected with ${res.connection.host}`))
    .catch(error=> console.log(error))
}