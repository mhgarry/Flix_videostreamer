const { Schema, model } = require("mongoose");

const videoSchema = new Schema({
	title: {
	 type: String,
	 required: true,
	 unique: true,
	 trim: true,
	},
	video_url: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	thumbnail_url: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	description: {
		type: String,
		required: true,
		trim: true,
	},
	category: {
		type: String,
		required: true,
		trim: true,
	},
	length: {
		type: Number,
	},
	views: {
		type: Number,
	},
	likes: {
		type: Number,
	},
});

module.exports = model('video', videoSchema);
