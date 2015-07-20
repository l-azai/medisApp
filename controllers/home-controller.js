var conn = require('../repositories/db-conn'),
    _gfsRepos = require('../repositories/gfs-repository'),
    _videoRepos = require('../repositories/video-repository'),
    _imageRepos = require('../repositories/image-repository'),
    GridStore = require('mongodb').GridStore,
    mongoose = require('mongoose'),
    fs = require('fs'),
    shortid = require('shortid');

var _app;

exports.init = function(app) {
	_app = app;


    // view models
    _app.get("/api/adminHomeViewModel", adminHomeViewModel);

	_app.get("/api/getVideoCategoryList", getVideoCategoryList);
    _app.get("/api/getVideoFilesFromCategory/:category", getVideoFilesFromCategory);
    _app.get("/api/getAllVideoFiles", getAllVideoFiles);
    _app.get("/api/getVideoFileById/:id", getVideoFileById);
    _app.post("/api/addVideoFile", addVideoFile);

    // gfs
    _app.get("/api/mediaFile/:filename", getMediaFile);
    _app.post("/api/videoFile/upload", uploadVideoFile);
    //_app.post("/api/imageFile/upload", uploadImageFile);
    _app.post("/api/deleteFile/:fileId", deleteFile);
};

function getVideoFileById(req, res) {
    _videoRepos.getVideoFileById(req.params.id, function(err, doc) {
        if(err) {
            return sendFailure(res, err);
        }

        sendSuccess(res, doc);
    });
};

function adminHomeViewModel(req, res){
    var model = {};

    _videoRepos.getVideoCategoryList(function(catErr, categories){
        if(catErr) {
            return sendFailure(res, catErr);
        }

        model.categories = categories;
        _videoRepos.getAllVideoFiles(function(vfErr, files){
            if(vfErr) {
                return sendFailure(res, vfErr);
            }

            model.videoFiles = files;
            sendSuccess(res, model);
        });
    });
};

function getAllVideoFiles(req, res) {
    _videoRepos.getAllVideoFiles(function(err, files){
        if(err) {
            return sendFailure(res, err);
        }

        sendSuccess(res, files);
    });
};

function addVideoFile(req, res){

    var data = {
        name: req.body.videoFilename,
        catId: req.body.videoCategoryId,
        yearReleased: req.body.yearReleased
    };

    sendSuccess(res, { message: 'successfully added file' });
    // _videoRepos.addVideoFile(data, function(err, doc){
    //     if(err){
    //         sendFailure(res, err);
    //         return;
    //     }


        // _videoRepos.uploadImageFile(doc._id, req.files.file.path, function(err, result){
        //     if(err) {
        //         sendFailure(res, err);
        //         return;
        //     }
        //
        deleteFileFromTemp(req.files.file.path);
        //
        //     sendSuccess(res, { message: 'successfully added file' });
        // });

    //});
};

function deleteFile(req, res) {
    //     GridStore.unlink(db, "Despicable Me.jpg", function(err, result) {
    //         if(err) {
    //             sendFailure(res, err);
    //         }

    //         sendSuccess(res, { message: 'successful delete' });
    //         db.close();
    //     });
    res.json('');
};

function getMediaFile(req, res) {
    var fileStream = new GridStore(conn.db, req.params.filename, "r").stream(true); //auto close: true

    fileStream.on('error', function(err){
        console.log('file stream error');
    });

    fileStream.on('close', function(){
        console.log('fileStream closed');
    });

    fileStream.pipe(res);
};

function uploadVideoFile(req, res) {
    var movieId = req.body.movieId;

    _videoRepos.getVideoFileById(movieId, function(err, doc){
        if(err){
            return sendFailure(res, err);
        }

        var gfsFilename = doc.videoGfsFilename;
        if(gfsFilename){
            _gfsRepos.checkIfGridFsFileExists(gfsFilename, function(err, exist){
                if(err) {
                    sendFailure(res, err);
                }

                if(exist) {
                    _gfsRepos.deleteGridFsFile(gfsFilename, function(err, result){
                        if(err) {
                            sendFailure(res, err);
                        }

                        uploadVideoToVideoFile(res, movieId, req.files.file.path);
                    });
                } else {
                    uploadVideoToVideoFile(res, movieId, req.files.file.path);
                }
            });
        } else {
            uploadVideoToVideoFile(res, movieId, req.files.file.path);
        }
    });
};

// function uploadImageFile(req, res) {
//     var movieId = req.body.movieId;
//
//     _videoRepos.getVideoFileById(movieId, function(err, doc){
//         if(err){
//             sendFailure(res, err);
//             return;
//         }
//
//         var gfsFilename = doc.imageGfsFilename;
//         if(gfsFilename){
//             _gfsRepos.checkIfGridFsFileExists(gfsFilename, function(err, exist){
//                 if(err) {
//                     sendFailure(res, err);
//                 }
//
//                 if(exist) {
//                     _gfsRepos.deleteGridFsFile(gfsFilename, function(err, result){
//                         if(err) {
//                             sendFailure(res, err);
//                         }
//
//                         uploadImageToVideoFile(res, movieId, req.files.file.path);
//                     });
//                 } else {
//                     uploadImageToVideoFile(res, movieId, req.files.file.path);
//                 }
//             });
//         } else {
//             uploadImageToVideoFile(res, movieId, req.files.file.path);
//         }
//     });
// };

function getVideoCategoryList(req, res) {
    _videoRepos.getVideoCategoryList(function(err, docs){
        if(err) {
            return sendFailure(res, err);
        }

        (function iterate(index){
            if(index == docs.length) {
                return sendSuccess(res, docs);
            } else {
                _videoRepos.getLatestImageFile(docs[index]._id, function(err, result){
                    if(err) {
                        return sendFailure(res, err);
                    }

                    if(result){
                        docs[index].imageGfsFilename = result.imageGfsFilename;
                    }

                    iterate(index + 1);
                });
            }
        }(0))
    });
};

function getVideoFilesFromCategory(req, res) {
    _videoRepos.getVideoFilesFromCategory(req.params.category, function(err, files){
        if(err) {
            return sendFailure(res, err);
        }

        sendSuccess(res, files);
    });
};

function uploadVideoToVideoFile(res, movieId, filepath) {
    _videoRepos.uploadVideoFile(movieId, filepath, function(err, result){
        if(err) {
            return sendFailure(res, err);
        }

        sendSuccess(res, { message: 'successfully uploaded video' });

        deleteFileFromTemp(filepath);
    });
}

// function uploadImageToVideoFile(res, movieId, filepath, callback) {
//     _videoRepos.uploadImageFile(movieId, filepath, function(err, result){
//         if(err) {
//             callback(err);
//             return;
//         }
//
//         // sendSuccess(res, { message: 'successfully uploaded image' });
//
//         deleteFileFromTemp(filepath);
//
//         callback(null);
//     });
// };

function deleteFileFromTemp(path) {
    fs.unlink(path, function(err){
        if(err) {
            return console.log('unable to delete file: ' + err);
        }

        console.log('temp file delete successful');
    });
};

function sendSuccess(res, data) {
	res.json(data);
};

function sendFailure(res, err) {
	res.json({ error: err.code, message: err.message });
};

function handleError(res, err) {
    sendFailure(res, err);
}

function makeError(err, msg) {
    var e = new Error(msg);
    e.code = err;
    return e;
};
