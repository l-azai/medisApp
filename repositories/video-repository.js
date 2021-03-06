var conn = require('./db-conn'),
	async = require('async'),
	GridStore = require('mongodb').GridStore,
	mongoose = require('mongoose'),
    shortid = require('shortid'),
	_gfsRepos = require('./gfs-repository')

exports.getVideoCategoryList = getVideoCategoryList;
exports.getVideosByCategory = getVideosByCategory;
exports.getVideoFileById = getVideoFileById;
exports.getVideosByName = getVideosByName;
exports.updateVideoById = updateVideoById;
exports.uploadVideoFile = uploadVideoFile;
exports.uploadImageFile = uploadImageFile;
exports.getLatestImageFile = getLatestImageFile;
exports.addVideo = addVideo;
exports.getVideos = getVideos;
exports.getSearchResults = getSearchResults;
exports.deleteVideo = deleteVideo;

function addVideo(data, callback) {
	async.waterfall([
		function(cb) {
			conn.model('videoCategory')
				.findOne({ _id: data.catId })
				.exec(cb);
		},
		function(cat, cb) {
			data.categoryName = cat.name;
			conn.model('videoFiles')
				.create(data, cb);
		}
	], function(err, doc){
		if(err) {
			return callback(err);
		}

		callback(null, doc);
	});
};

function updateVideoById(id, updateObj, callback) {
    updateObj.dateModified = Date.now();

	async.waterfall([
		function(cb) {
			conn.model('videoCategory')
				.findOne({ _id: updateObj.catId })
				.exec(cb);
		},
		function(cat, cb) {
			updateObj.categoryName = cat.name;
			conn.model('videoFiles')
		        .update({ _id: id }, { $set: updateObj }, cb);
		}
	], function(err, doc){
		if(err) {
			return callback(err);
		}

		callback(null, doc);
	});
};

function getVideoCategoryList(callback){
    conn.model('videoCategory')
        .find()
        .sort('name')
        .exec(function(err, docs){
            if(err) {
                return callback(err);
            }

            callback(null, docs);
        });
};

function getVideosByCategory(categoryKey, callback){
	async.waterfall([
		function(cb){
			conn.model('videoCategory')
				.findOne({ urlKey: categoryKey })
				.exec(cb)
		},
		function(doc, cb){
			conn.model('videoFiles')
				.find({ catId: doc._id })
				.sort('name')
				.exec(cb)
		}
	],
	function(err, files) {
		if(err){
			return callback(err);
		}

		callback(null, files);
	});
};

function getVideos(callback) {
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

function getSearchResults(searchQuery, callback) {
	// page, pagesize, sortName, sortAsc, search, categoryFilter
	var search = new RegExp(searchQuery.search, 'i');
	var sortQuery = searchQuery.sortDesc === 'true'
		? '-' + searchQuery.sortName
		: searchQuery.sortName;

	var query = conn.model('videoFiles')
		.find(searchQuery.search ? { name: search } : {})
		.find(searchQuery.categoryFilter ? { catId: searchQuery.categoryFilter } : {})
		.sort(sortQuery)
		.count(function(err, count){
			if(err) {
				return callback(err);
			}

			query.find()
				.skip((searchQuery.page - 1) * searchQuery.pagesize)
				.limit(searchQuery.pagesize)
				.exec(function(err, pagedRecords) {
					if(err) {
						return callback(err);
					}

					var records = {
							files: pagedRecords,
							count: count
						};
					callback(null, records);
				});
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

function getVideosByName(name, callback) {
	var searchName = new RegExp(name, 'i');

	conn.model('videoFiles')
		.find({ name: searchName })
		.exec(function(err, docs) {
			if(err) {
				return callback(err);
			}

			callback(null, docs);
		});
};

function uploadVideoFile(id, filepath, callback) {
    var gs = new GridStore(conn.db, 'video-' + shortid.generate(), 'w');

    gs.writeFile(filepath, function(err, doc){
        if (err) {
            return callback(err);
        }

        updateVideoById(id, { videoGfsFilename: doc.filename }, callback);
    });
};

function uploadImageFile(id, filepath, callback) {
    var gs = new GridStore(conn.db, 'image-' + shortid.generate(), 'w');

    gs.writeFile(filepath, function(err, doc){
        if (err) {
            return callback(err);
        }

        updateVideoById(id, { imageGfsFilename: doc.filename }, callback);
    });
};

function deleteVideo(id, callback) {
	async.waterfall([
		function(cb){
			conn.model('videoFiles')
				.findOne({ _id: id })
				.exec(cb);
		}
	],
	function(err, doc) {
		if(err) {
			return callback(err);
		}

		// call delete imageGfs and videoGfs in parallel
		async.parallel([
			// delete imageGfs
			function(pcb){
				if(doc.imageGfsFilename) {
					async.waterfall([
						function(wcb) {
							_gfsRepos.checkIfGridFsFileExists(doc.imageGfsFilename, wcb);
						},
						function(exists, wcb) {
							if(exists) {
								_gfsRepos.deleteGridFsFile(doc.imageGfsFilename, wcb);
							} else {
								wcb();
							}
						}
					], function(err, result){
						if(err) {
							return pcb(err);
						}

						pcb(null, result);
					});
				} else {
					pcb();
				}
			},
			// delete videoGfs
			function(pcb) {
				if(doc.videoGfsFilename) {
					async.waterfall([
						function(wcb) {
							_gfsRepos.checkIfGridFsFileExists(doc.videoGfsFilename, wcb);
						},
						function(exists, wcb) {
							if(exists) {
								_gfsRepos.deleteGridFsFile(doc.videoGfsFilename, wcb);
							} else {
								wcb();
							}
						}
					], function(err, result){
						if(err) {
							return pcb(err);
						}

						pcb(null, result);
					});
				} else {
					pcb(null);
				}
			}
		],
		function(err, result){
			if(err) {
				return cb(err);
			}
			// if no error for image and video gfs, then just delete doc
			doc.remove(function(err){
				if(err) {
					return callback(err);
				}

				callback(null);
			});
		});
	});
};
