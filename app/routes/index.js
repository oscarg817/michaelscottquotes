const quoteRoutes = require('./quote_routes')

module.exports = (app, db) => {
	quoteRoutes(app, db)
}