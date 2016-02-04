From Bits
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Creates a [single-precision floating-point number][ieee754] from a [IEEE 754 literal bit representation][float32-bits].


## Installation

``` bash
$ npm install math-float32-from-bits
```


## Usage

``` javascript
var fromBits = require( 'math-float32-from-bits' );
```

#### fromBits( bstr )

Creates a [single-precision floating-point number][ieee754] from a [IEEE 754 literal bit representation][float32-bits].

``` javascript
var bstr = '01000000100000000000000000000000';
var val = fromBits( bstr );
// returns 4

bstr = '01000000010010010000111111011011';
val = fromBits( bstr );
// returns ~3.14

bstr = '11111111011011000011101000110011';
val = fromBits( bstr );
// returns ~-3.14e+38
```

The `function` handles [subnormals][subnormals].

``` javascript
bstr = '10000000000000000000000000010110';
val = fromBits( bstr );
// returns ~-3.08e-44

bstr = '00000000000000000000000000000001';
val = fromBits( bstr );
// returns ~1.40e-45
```

The `function` handles special values.

``` javascript
bstr = '00000000000000000000000000000000';
val = fromBits( bstr );
// returns 0

bstr = '10000000000000000000000000000000';
val = fromBits( bstr );
// returns -0

bstr = '01111111110000000000000000000000';
val = fromBits( bstr );
// returns NaN

bstr = '01111111100000000000000000000000';
val = fromBits( bstr );
// returns +infinity

bstr = '11111111100000000000000000000000';
val = fromBits( bstr );
// returns -infinity
```


## Examples

``` javascript
var round = require( 'math-round' );
var pow = require( 'math-power' );
var toFloat32 = require( 'float64-to-float32' );
var toBits = require( 'math-float32-bits' );
var fromBits = require( 'math-float32-from-bits' );

var frac;
var sign;
var exp;
var b;
var x;
var y;
var i;

// Convert random numbers to IEEE 754 literal bit representations and then convert them back...
for ( i = 0; i < 100; i++ ) {
	if ( Math.random() < 0.5 ) {
		sign = -1;
	} else {
		sign = 1;
	}
	frac = Math.random() * 10;
	exp = round( Math.random()*100 );
	if ( Math.random() < 0.5 ) {
		exp = -exp;
	}
	x = sign * frac * pow( 2, exp );
	x = toFloat32( x );

	b = toBits( x );
	y = fromBits( b );

	console.log( '%d => %s => %d', x, b, y );
	console.log( x === y );
}
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. The [Compute.io][compute-io] Authors.


[npm-image]: http://img.shields.io/npm/v/math-float32-from-bits.svg
[npm-url]: https://npmjs.org/package/math-float32-from-bits

[build-image]: http://img.shields.io/travis/math-io/float32-from-bits/master.svg
[build-url]: https://travis-ci.org/math-io/float32-from-bits

[coverage-image]: https://img.shields.io/codecov/c/github/math-io/float32-from-bits/master.svg
[coverage-url]: https://codecov.io/github/math-io/float32-from-bits?branch=master

[dependencies-image]: http://img.shields.io/david/math-io/float32-from-bits.svg
[dependencies-url]: https://david-dm.org/math-io/float32-from-bits

[dev-dependencies-image]: http://img.shields.io/david/dev/math-io/float32-from-bits.svg
[dev-dependencies-url]: https://david-dm.org/dev/math-io/float32-from-bits

[github-issues-image]: http://img.shields.io/github/issues/math-io/float32-from-bits.svg
[github-issues-url]: https://github.com/math-io/float32-from-bits/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[compute-io]: https://github.com/compute-io/
[ieee754]: https://en.wikipedia.org/wiki/IEEE_754-1985
[subnormals]: https://en.wikipedia.org/wiki/Denormal_number
[float32-bits]: https://github.com/math-io/float32-bits
