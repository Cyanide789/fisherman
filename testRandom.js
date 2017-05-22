var utils = require("./lib/utils");

var list = [];

for (var i = 0; i < 100; i++) {
    list.push(utils.randomInt(0, 10));
}

var groupBy = function (arry, key) {
    return arry.reduce(function (acc, elem) {
        (acc[elem[key]] = acc[elem[key]] || []).push(elem);
        return acc;
    }, {});
};

var result = list.reduce(function (acc, curr) {
    if (curr in acc) {
        acc[curr]++;
    } else {
        acc[curr] = 1;
    }
    return acc;
}, {});

var result2 = list.reduce(function (acc, elem, index, arry) {
    if (elem in acc) {
        acc[elem]++;
    } else {
        acc[elem] = 1;
    }
    return acc;
}, {});

console.log(JSON.stringify(result, null, 4));

var liss = [1, 2, 3];
console.log(liss);
liss.forEach(function (value, index, arry) {
    arry[index]++;
});
console.log(liss);