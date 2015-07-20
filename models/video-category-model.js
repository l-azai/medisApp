var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var videoCategorySchema = new Schema({
	_id: Number,
	name: String,
	catId: Number,
	urlKey: String,
	imageGfsFilename: String,
	typeId: Number,
	dateCreated: {
		type: Date, default: Date.now
	},
	dateModified: {
		type: Date, default: Date.now
	}
}, {
	collection: 'videoCategory'
}); // mongoose pluralizes the model name below, manually set the collection above

mongoose.model('videoCategory', videoCategorySchema);
