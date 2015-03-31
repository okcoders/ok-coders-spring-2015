
function map(array, callback) {
	var newarray = [];
	for (var i = 0; i < array.length; i++) {
		newarray[i] = callback(array[i]);
	}
	return newarray;
}

var people = [
	{
		firstName: "OK",
		lastName: "Coders",
		age: 1,
		city: "OKC"
	},
	{
		firstName: "Philip",
		lastName: "Dow",
		age: 32,
		city: "Norman"
	},
	{
		firstName: "Marky",
		lastName: "Mark",
		age: 39,
		city: "Los Angeles"
	},
	{
		firstName: "Ellen",
		lastName: "Ripley",
		age: 28,
		city: "Nostromo"
	}
];

var firstNames = map(people, function(item) {
	return item.firstName;
});

console.log(firstNames);