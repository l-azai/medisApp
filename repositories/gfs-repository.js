var GridStore = require('mongodb').GridStore,
    conn = require('./db-conn');

exports.checkIfGridFsFileExists = checkIfGridFsFileExists;
exports.deleteGridFsFile = deleteGridFsFile;

function checkIfGridFsFileExists(gfsFilename, callback) {
    GridStore.exist(conn.db, gfsFilename, function(err, exist){
        if(err) {
            return callback(err);
        }

        callback(null, exist);
    });
};

function deleteGridFsFile(gfsFilename, callback) {
    GridStore.unlink(conn.db, gfsFilename, function(err, result){
        if(err){
            return callback(err);
        }

        callback(null, result);
    });
};
