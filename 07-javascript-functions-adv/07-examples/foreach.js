
function forEach(array, callback) {
	for (var i = 0; i < array.length; i++) {
		callback(array[i]);
	}
}

var array = [0,1,2,3,4,5,6,7,8,9];

forEach(array, function(item) {
	console.log("Just got access to item", item);
});