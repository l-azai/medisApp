var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var videoFilesSchema = new Schema({
	name: String,
	yearReleased: Number,
	catId: Number,
	categoryName: String,
	quality: String,
	videoGfsFilename: String,
	imageGfsFilename: String,
	dateCreated: {
		type: Date, default: Date.now
	},
	dateModified: {
		type: Date, default: Date.now
	}
}, {
	collection: 'videoFiles'
}); // mongoose pluralizes the model name below, manually set the collection above

mongoose.model('videoFiles', videoFilesSchema);

//exports.videoFilesSchema = videoFilesSchema;
