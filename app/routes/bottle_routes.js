//// IMPORT DEPENDENCIES ////

const express = require('express')
const passport = require('passport')
const Bottle = require('../models/bottle')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

//// ROUTES ////

// INDEX
// GET /bottles
router.get('/bottles', requireToken, (req, res, next) => {
	Bottle.find()
		.then((bottles) => {
			// `bottles` will be an array of Mongoose documents
			// we want to convert each one to a POJO, so we use `.map` to
			// apply `.toObject` to each one
			return bottles.map((bottle) => bottle.toObject())
		})
		// respond with status 200 and JSON of the bottles
		.then((bottles) => res.status(200).json({ bottles: bottles }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// SHOW
// GET /bottles/5a7db6c74d55bc51bdf39793
router.get('/bottles/:id', requireToken, (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Bottle.findById(req.params.id)
		.then(handle404)
		// if `findById` is succesful, respond with 200 and "bottle" JSON
		.then((bottle) => res.status(200).json({ bottle: bottle.toObject() }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// CREATE
// POST /bottles
router.post('/bottles', requireToken, (req, res, next) => {
	// set owner of new bottle to be current user
	req.body.bottle.owner = req.user.id

	Bottle.create(req.body.bottle)
		// respond to succesful `create` with status 201 and JSON of new "bottle"
		.then((bottle) => {
			res.status(201).json({ bottle: bottle.toObject() })
		})
		// if an error occurs, pass it off to our error handler
		// the error handler needs the error message and the `res` object so that it
		// can send an error message back to the client
		.catch(next)
})

// UPDATE
// PATCH /bottles/5a7db6c74d55bc51bdf39793
router.patch('/bottles/:id', requireToken, removeBlanks, (req, res, next) => {
	// if the client attempts to change the `owner` property by including a new
	// owner, prevent that by deleting that key/value pair
	delete req.body.bottle.owner

	Bottle.findById(req.params.id)
		.then(handle404)
		.then((bottle) => {
			// pass the `req` object and the Mongoose record to `requireOwnership`
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, bottle)

			// pass the result of Mongoose's `.update` to the next `.then`
			return bottle.updateOne(req.body.bottle)
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// DESTROY
// DELETE /bottles/5a7db6c74d55bc51bdf39793
router.delete('/bottles/:id', requireToken, (req, res, next) => {
	Bottle.findById(req.params.id)
		.then(handle404)
		.then((bottle) => {
			// throw an error if current user doesn't own `bottle`
			requireOwnership(req, bottle)
			// delete the bottle ONLY IF the above didn't throw
			bottle.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

//// EXPORT ////

module.exports = router
