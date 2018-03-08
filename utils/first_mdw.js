const parseStr = function(action) {
	if (typeof action == 'string') {
		return {
			type : action
		}
	} else {
		return action;
	}
}

module.exports = function(store) {
	return function(next) {
		return function(action) {
			if (typeof action == 'string') {
				next({
					type : action
				})
			} else if (action instanceof Promise) {
				action.then(function(res) {
					store.dispatch(res)
				}).catch(function(err) {
					store.dispatch({
						type : '@@ERROR',
						error : err
					})
				});
			} else if (action instanceof Array) {
				for (var i = 0; i < action.length; i++) {
					var ac = (typeof action[i] == 'string') ? {type:action[i]} : action[i];
					ac._isArray = true;
					store.dispatch(ac)
				}
			} else {
				next(action)
			}

		}
	}
}