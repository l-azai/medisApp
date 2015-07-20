var conn = require('./db-conn'),
	GridStore = require('mongodb').GridStore,
	mongoose = require('mongoose'),
    shortid = require('shortid');

exports.getVideoCategoryList = getVideoCategoryList;
exports.getVideoFilesFromCategory = getVideoFilesFromCategory;
exports.getVideoFileById = getVideoFileById;
exports.updateVideoFileById = updateVideoFileById;
exports.uploadVideoFile = uploadVideoFile;
exports.uploadImageFile = uploadImageFile;
exports.getLatestImageFile = getLatestImageFile;
exports.addVideoFile = addVideoFile;
exports.getAllVideoFiles = getAllVideoFiles;

function addVideoFile(data, callback) {
    conn.model('videoFiles')
        .create(data, function(err, doc){
            if(err){
                callback(err);
				return;
            }

            callback(null, doc);
        });
}

function getVideoCategoryList(callback){
    conn.model('videoCategory')
        .find()
        .sort('name')
        .exec(function(err, docs){
            if(err) {
                callback(err);
				return;
            }

            callback(null, docs);
        });
};

function getVideoFilesFromCategory(categoryKey, callback){
    conn.model('videoCategory')
        .findOne({ urlKey: categoryKey })
        .exec(function(err, doc){
            if(err) {
                callback(err);
				return;
            }

            conn.model('videoFiles')
                .find({ catId: doc._id })
                .sort('name')
                .exec(function(err, files){
                    if(err) {
                        return callback(err);
                    }

                    callback(null, files);
                });
        });
};

function getAllVideoFiles(callback) {
	conn.model('videoFiles')
		.find()
		.sort('name')
		.exec(function(err, files){
			if(err){
				return callback(err);
			}

			callback(null, files);
		});
};

function getLatestImageFile(catId, callback) {
    conn.model('videoFiles')
        .findOne({ catId: catId })
		.exists('imageGfsFilename')
        .sort('-dateModified')
        .limit(1)
        .exec(function(err, doc){
            if(err) {
                return callback(err);
            }

            callback(null, doc);
        });
};

function getVideoFileById(id, callback){
    conn.model('videoFiles')
        .findOne({ _id: id })
        .exec(function(err, doc){
            if(err){
                return callback(err);
            }

            callback(null, doc);
        });
};

function uploadVideoFile(id, filepath, callback) {
    var gs = new GridStore(conn.db, 'video-' + shortid.generate(), 'w');

    gs.writeFile(filepath, function(err, doc){
        if (err) {
            return callback(err);
        }

        updateVideoFileById(id, { videoGfsFilename: doc.filename }, callback);
    });
};

function uploadImageFile(id, filepath, callback) {
    var gs = new GridStore(conn.db, 'image-' + shortid.generate(), 'w');

    gs.writeFile(filepath, function(err, doc){
        if (err) {
            return callback(err);
        }

        updateVideoFileById(id, { imageGfsFilename: doc.filename }, callback);
    });
};

function updateVideoFileById(id, updateObj, callback) {
    updateObj.dateModified = Date.now();

    conn.model('videoFiles')
        .update({ _id: id },
            { $set: updateObj },
            function(err, result){
                if(err){
                    return callback(err);
                }

                callback(null, result)
            });
};
