'use strict';

// MODULES //

var tape = require( 'tape' );
var pinf = require( 'const-pinf-float32' );
var ninf = require( 'const-ninf-float32' );
var toBits = require( 'math-float32-bits' );
var fromBits = require( './../lib' );


// FIXTURES //

var small = require( './fixtures/bits_1e-36_1e-38.json' );
var medium = require( './fixtures/bits_-1e3_1e3.json' );
var large = require( './fixtures/bits_1e36_1e38.json' );
var subnormal = require( './fixtures/bits_1e-39_1e-45.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( typeof fromBits === 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided all zeros, the function returns `+0`', function test( t ) {
	t.equal( fromBits( toBits( 0 ) ), 0, 'returns +0' );
	t.end();
});

tape( 'if provided a sign bit of 1 and all zeros, the function returns `-0`', function test( t ) {
	var v = fromBits( toBits( -0 ) );
	t.equal( v, 0, 'returns 0' );
	t.equal( 1/v, ninf, 'returns -0' );
	t.end();
});

tape( 'if provided a bit sequence where all exponent bits are 1s and everything else is 0, the function returns positive infinity', function test( t ) {

	t.equal( fromBits( toBits( pinf ) ), pinf, 'returns +infinity' );
	t.end();
});

tape( 'if provided a bit sequence where the sign bit is 1, all exponent bits are 1s, and everything else is 0, the function returns negative infinity', function test( t ) {

	t.equal( fromBits( toBits( ninf ) ), ninf, 'returns -infinity' );
	t.end();
});

tape( 'if provided a bit sequence where the sign bit may be either 1 or 0, all exponent bits are 1s, and the fraction is not all 0s, the function returns `NaN`', function test( t ) {
	var v = fromBits( toBits( NaN ) );
	t.ok( v !== v, 'returns NaN' );
	t.end();
});

tape( 'the function creates single-precision floating-point numbers from literal bit representations for small values', function test( t ) {
	var expected;
	var val;
	var x;
	var i;

	x = small.x;
	expected = small.expected;
	for ( i = 0; i < x.length; i++ ) {
		val = fromBits( x[ i ] );
		t.equal( val, expected[ i ], 'returns a float equal to ' + expected[ i ] + ' from ' + x[ i ] );
	}
	t.end();
});

tape( 'the function creates single-precision floating-point numbers from literal bit representations for medium values', function test( t ) {
	var expected;
	var val;
	var x;
	var i;

	x = medium.x;
	expected = medium.expected;
	for ( i = 0; i < x.length; i++ ) {
		val = fromBits( x[ i ] );
		t.equal( val, expected[ i ], 'returns a float equal to ' + expected[ i ] + ' from ' + x[ i ] );
	}
	t.end();
});

tape( 'the function creates single-precision floating-point numbers from literal bit representations for large values', function test( t ) {
	var expected;
	var val;
	var x;
	var i;

	x = large.x;
	expected = large.expected;
	for ( i = 0; i < x.length; i++ ) {
		val = fromBits( x[ i ] );
		t.equal( val, expected[ i ], 'returns a float equal to ' + expected[ i ] + ' from ' + x[ i ] );
	}
	t.end();
});

tape( 'the function creates single-precision floating-point numbers from literal bit representations for subnormal values', function test( t ) {
	var expected;
	var val;
	var x;
	var i;

	x = subnormal.x;
	expected = subnormal.expected;
	for ( i = 0; i < x.length; i++ ) {
		val = fromBits( x[ i ] );
		t.equal( val, expected[ i ], 'returns a float equal to ' + expected[ i ] + ' from ' + x[ i ] );
	}
	t.end();
});
