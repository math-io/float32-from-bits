'use strict';

// MODULES //

var pinf = require( 'const-pinf-float32' );
var ninf = require( 'const-ninf-float32' );
var pow = require( 'math-power' );
var toFloat32 = require( 'float64-to-float32' );
var toFrac = require( './tofrac.js' );


// VARIABLES //

var BIAS = 127;


// FROM BITS //

/**
* FUNCTION: fromBits( bstr )
*	Creates a single-precision floating-point number from an IEEE 754 literal bit representation.
*
* @param {String} bstr - string which is a literal bit representation
* @returns {Number} single-precision floating-point number
*/
function fromBits( bstr ) {
	var sign;
	var frac;
	var exp;

	// Sign bit:
	sign = ( bstr[0] === '1' ) ? -1 : 1;

	// Exponent bits:
	exp = parseInt( bstr.substring(1,9), 2 ) - BIAS;

	// Fraction bits:
	frac = toFrac( bstr.substring( 9 ) );

	// Detect `0` (all 0s) and subnormals (exponent bits are all 0, but fraction bits are not all 0s)...
	if ( exp === -BIAS ) {
		if ( frac === 0 ) {
			return ( sign === 1 ) ? 0 : -0;
		}
		exp = -(BIAS-1); // subnormals are special in that their exponent is constant
	}
	// Detect `+-inf` (exponent bits are all 1 and fraction is 0) and `NaN` (exponent bits are all 1 and fraction is not 0)...
	else if ( exp === BIAS+1 ) {
		if ( frac === 0 ) {
			return ( sign === 1 ) ? pinf : ninf;
		}
		return NaN;
	}
	// Normal numbers...
	else {
		// Account for hidden/implicit bit (2^0):
		frac += 1;
	}
	return toFloat32( sign*frac*pow(2,exp) );
} // end FUNCTION fromBits()


// EXPORTS //

module.exports = fromBits;
