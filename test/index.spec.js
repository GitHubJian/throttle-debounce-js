const {throttle, debounce} = require('../lib')

const a = throttle(function () {
    console.log(123)
}, 10)
a()
a()
a()
a()
a()
a()

const b = debounce(function () {
    console.log(234)
}, 1)

b()
b()
b()
b()
b()
b()
b()
b()
