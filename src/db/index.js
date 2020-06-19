const mongoose = require('mongoose');

const connect = () => {
    mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true });

    mongoose.connection.on('connected', function(){
        console.log("Mongoose default connection is open to ");
    });

    mongoose.connection.on('error', function(err){
        console.log("Mongoose default connection has occured "+err+" error");
    });

    mongoose.connection.on('disconnected', function(){
        console.log("Mongoose default connection is disconnected");
    });

}
module.exports = connect