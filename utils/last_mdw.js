var cache = [];
var tid = null;

module.exports = function(store) {
	return function(next) {
		return function(action) {
			console.log('last MDV');

			if (action.type == '@@ERROR') {
				if (process.env.NODE_ENV == 'development') {
					console.error(action.error)
				}
				return;
			} else if (action._isArray) {
				delete action._isArray;
				cache.push(action);
				if (!tid) {
					tid = setTimeout(function(){
						next({
							type : '@@ARRAY',
							payload : [].concat(cache)
						})
						cache = [];
						tid = null;
					},10)
				}
			} else {
				next(action)
			}


		}
	}
}