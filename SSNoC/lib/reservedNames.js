//for list of reserved words
var words = [
"root", "admin"
];
exports.contains = function(word) {
	return words.indexOf(word) >= 0;
};
