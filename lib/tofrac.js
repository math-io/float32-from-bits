'use strict';

// MODULES //

var pow = require( 'math-power' );


// TO FRAC //

/**
* FUNCTION: toFrac( frac )
*	Converts a float's fraction bit sequence to an integer value.
*
* @param {String} frac - literal bit representation of a float's fraction bit sequence
* @returns {Number} integer (floating-point)
*/
function toFrac( frac ) {
	var sum = 0;
	var i;
	for ( i = 0; i < frac.length; i++ ) {
		if ( frac[ i ] === '1' ) {
			sum += pow( 2, -(i+1) );
		}
	}
	return sum;
} // end FUNCTION toFrac()


// EXPORTS //

module.exports = toFrac;
