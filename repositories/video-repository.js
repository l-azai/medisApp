var conn = require('./db-conn'),
	GridStore = require('mongodb').GridStore,
	mongoose = require('mongoose'),
    shortid = require('shortid');

exports.getVideoCategoryList = getVideoCategoryList;
exports.getVideosByCategory = getVideosByCategory;
exports.getVideoFileById = getVideoFileById;
exports.updateVideoFileById = updateVideoFileById;
exports.uploadVideoFile = uploadVideoFile;
exports.uploadImageFile = uploadImageFile;
exports.getLatestImageFile = getLatestImageFile;
exports.addVideoFile = addVideoFile;
exports.getVideos = getVideos;

function addVideoFile(data, callback) {
	conn.model('videoCategory')
		.findOne({ _id: data.catId })
		.exec(function(err, cat){
			if(err) {
				return callback(err);
			}

			data.categoryName = cat.name;
			conn.model('videoFiles')
		        .create(data, function(err, doc){
		            if(err){
		                return callback(err);
		            }

		            callback(null, doc);
		        });
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

function getVideosByCategory(categoryKey, callback){
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

function getVideos(searchQuery, callback) {
	// page, pagesize, sort, search, filter

	if(searchQuery) {
		conn.model('videoFiles')
			.find(searchQuery.search || {})
			.sort(searchQuery.sort)
			.skip((searchQuery.page - 1) * searchQuery.pagesize)
			.limit(searchQuery.pagesize)
			.exec(function(err, files){
				if(err){
					return callback(err);
				}

				conn.model('videoFiles')
					.find(searchQuery.search || {})
					.count()
					.exec(function(err, count){
						console.log(count);
						var records = {
							files: files,
							count: count
						};

						callback(null, records);
					});
			});
	} else {
		conn.model('videoFiles')
			.find()
			.sort('name')
			.exec(function(err, files){
				if(err){
					return callback(err);
				}

				callback(null, files);
			});
	}
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
