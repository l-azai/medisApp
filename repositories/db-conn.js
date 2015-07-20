var mongoose = require('mongoose');

// var Db = mongodb.Db,
//     Connection = mongodb.Connection,
//     Server = mongodb.Server;
//
// var host = process.env['MONGO_NODE_DRIVER_HOST'] != null
//     ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
//
// var MongoClient = mongodb.MongoClient;
//
// var defaultSettings = {
//     auto_reconnect: true
// };

var dbURI = 'mongodb://localhost:27017/medis';

module.exports = conn = mongoose.createConnection(dbURI);

conn.on('connected', function(){
    console.log('db connected');
});

conn.on("error", function(err) {
    console.error('Failed to connect to DB on startup ', err);
});

var gracefulExit = function() {
  mongoose.connection.close(function () {
    console.log('Mongoose is disconnected through app termination');
    process.exit(0);
  });
}

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);
