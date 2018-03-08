var getFn = function(mdws) {
	return function(store) {
		return function(next) {
			return function(action) {
				if (mdws[action.type] && typeof mdws[action.type] == 'function') {

					mdws[action.type](store, next, action.payload, action)

				} else {
					next(action)
				}
			}
		}
	}
}


module.exports = function(arr) {
	var res = [];
	if (!arr || !arr.length || typeof arr != 'object') {
		arr = [];
	}

	for (var i = 0; i < arr.length; i++) {
		if (typeof arr[i] == 'function') {
			res.push(arr[i])
		} else if (typeof arr[i] == 'object') {
			res.push(getFn(arr[i]))
		}
	}
	
	return res;
}