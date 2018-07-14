const ObjectID = require('mongodb').ObjectID

module.exports = (app, db) => {
    const collection = db.collection('quotes')

    //GET QUOTE

    app.get('/quotes/random', (req, res) => {
        const number = Math.floor(Math.random() * (100 - 1) + 1)
        const documentToReturn = {
            '_number': number
        }
        let randomQuote;
        console.log('RAMDOM ROUTE')
        collection.findOne(documentToReturn, (err, doc) => {
            if (err) {
                res.send('You got an error with your random route log')
                console.log(err)
            } else {
                res.send(doc)
                console.log(doc)
            }
        })
        console.log(number)
    })

    app.get('/quotes/everything', (req, res) => {
        collection.find({}).toArray((err, docs) => {
            if (err) {
                console.log(err)
            }

            res.send(docs)
        })
    })

    app.get('/quotes/:id', (req, res) => {

        const paramsId = req.params.id
        if (paramsId.length < 12 || paramsId.length > 24) {

            console.log(paramsId)
            res.send(`"${paramsId}" is not a valid arguement. Argument passed in must be a single String of 12 bytes or a string of 24 hex characters`)

        } else {
            //ID STrING TO OBJECTID FOR MONGODB USE
            const paramsIdObj = {
                '_id': ObjectID(paramsId)
            }
            console.log(`PARAMS OBJ: ${paramsIdObj}`)
                //FIND QUOTE BY DOCUMENT ID
            collection.findOne(paramsIdObj, (err, doc) => {
                if (err) {
                    console.log(err)
                } else {
                    docs.forEach((el, i) => {
                        res.write(el[i])
                    });
                    res.end()
                }
            })

        }

    })

}


const findAllDocuments = (db, callback) => {
    //GET DOCUMENTS FROM COLLECTION
    collection.find({}).toArray((err, docs) => {
        if (err) {
            console.log(err)
        }

        console.log('All documents request')

        callback(docs)
    })
}