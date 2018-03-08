var redux = require('redux');
var combineReducers = redux.combineReducers;


var reduserWrapper = function(reduser) {

	return function(state, action) {
		if (action.type == '@@ARRAY') {
			if (!action.payload || action.payload.length == 0) return state;
			for (var i = 0; i < action.payload.length; i++) {
				state = reduser(state, action.payload[i])
			}
			return state;
		} else {
			return reduser(state, action);
		}
	}
}


module.exports = function(redusers, options) {
	if (typeof redusers == 'function') {
		return reduserWrapper(redusers);
	} else if (typeof redusers == 'object') {
		var res = {}
		for (var i in redusers) {
			if (typeof redusers[i] != 'function') {
				throw new Error('Reduser must be a Function')
			}

			res[i] = reduserWrapper(redusers[i])
		}
		return combineReducers(res)
	} else {
		return null;
	}
}