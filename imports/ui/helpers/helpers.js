import numeral from 'numeral'

export const currencyFormat = function(n) {

  // load a language
  numeral.language('uk', {
    delimiters: {
      thousands: ' ',
      decimal: ','
    },
    abbreviations: {
      thousand: 'k',
      million: 'm',
      billion: 'b',
      trillion: 't'
    },
    ordinal: function(number) {
      return number === 1 ? 'er' : 'ème';
    },
    currency: {
      symbol: '£'
    }
  });

  // switch between languages
	numeral.language('uk');
  
  return numeral(n).format('($ 0.00 a)');
}
