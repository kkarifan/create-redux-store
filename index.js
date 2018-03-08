var opts = require('./utils/options.js');
var rdss = require('./utils/redusers');
var mdws = require('./utils/middlewares.js');
var redux = require('redux');
var createStore = redux.createStore;

console.log(rdss)

const {composeWithDevTools} = require('redux-devtools-extension');

module.exports = function(rd,md,op) {
	var options = opts(op);
	var reduser = rdss(rd, options);
	var middlewares = mdws(md, options);

	if (process.env.NODE_ENV == 'development') {
		if (options.devTools) {
			middlewares = require('redux-devtools-extension').composeWithDevTools(middlewares)
		}
	}

	return createStore(reduser, middlewares)

}