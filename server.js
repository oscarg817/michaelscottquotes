const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const port = 3000
const url = 'mongodb://localhost:27017'
const dbName = 'michaelScottQuotes'
const assert = require('assert')
const routes = require('./app/routes')
const util = require('util')


const app = express()

app.use(bodyParser.urlencoded({ extended: true }))


MongoClient.connect(url, (err, client) => {
	const db = client.db(dbName)
	//ERROR HANDLING
	assert.equal(null, err)
	//RUN EXPRESS SERVER
	app.listen(port, () => {
		console.log(`Listening on port: ${port}`)
	})
	console.log('Connected to MongoDB')
	
	routes(app, db)

})

const findDocuments = (db, callback) => {
	//GET DOCUMENTS FROM COLLECTION
	const collection = db.collection('quotes')

	collection.find({}).toArray((err, docs) => {
		assert.equal(err, null)
		console.log('Found the following records')
		console.log(docs)
		callback(docs)
	})
}
