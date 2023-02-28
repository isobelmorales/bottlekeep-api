//// IMPORT DEPENDENCIES ////

const mongoose = require('mongoose')
const User = require('./user')

//// CREATE BOTTLE SCHEMA ////

const bottleSchema = new mongoose.Schema(
	{
		brand: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
        location: {
			type: String,
			required: true,
		},
        datePurchased: {
			type: Date,
			required: true,
		},
        keepTime: {
			type: Number,
			required: true,
		},
        image: {
            type: String,
            required: true
        },
        sharing: Boolean,
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	},
	{
		timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
	}
)

//// VIRTUALS ////


//// EXPORT MODEL ////

module.exports = mongoose.model('Bottle', bottleSchema)
