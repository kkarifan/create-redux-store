var isPromise = require('ispromise');
var isArray = require('lodash/isArray')
var isError = require('lodash/isError')
var isString = require('lodash/isString')

var parse = function(action) {
	if (isPromise(action) || isArray(action)) {
		return false;
	} else if (isString(action)) {
		return { type : action };
	} else if (isError(action)) {
		return {
			type : '@@ERROR',
			error : action
		};
	} else {
		return action;
	}
}

module.exports = function(store) {
	var prDisp = function(action) {
		store.dispatch(action);
	}

	return function(next) {
		return function(action) {

			action = parse(action);
			if (action) {
				return next(action)
			}

			if (isPromise(action)) {
				return action.then(prDisp).catch(prDisp)
			} else if (isArray(action)) {

				for (var i = 0; i < action.length; i++) {
					var ac = parse(action[i])
					if (ac || ac === false) {
						ac.__asArray = true;
						store.dispatch(action[i])
					}
				}

			} else {
				next(action)
			}

		}
	}
}