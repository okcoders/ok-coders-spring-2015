
var PI = Math.PI;

function area(r) {
  return PI * r * r;
};

function circumference(r) {
  return 2 * PI * r;
};

exports.area = area;
exports.circumference = circumference;