
var def = {
	devTools : true
}
module.exports = function(op) {
	var res = {};
	if (!op || typeof op != 'object') {
		op = {};
	}
	for (var i in def) {
		res[i] = def[i];
		if (op[i] !== undefined) {
			res[i] = op[i];
		}	
	}

	return res;
}