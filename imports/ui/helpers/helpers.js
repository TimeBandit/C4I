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

// googlemap component functions

export const parseAdressObject = function(obj) {
  // let res = "";
  // for (let key in obj) {
  //     if (obj[key]) {
  //         res += (obj[key] + ', ');
  //     }
  // }
  // // remove final comma
  // return res.slice(0, -2);
  // only using first and last lines - more reliable
  
  const keys = Object.keys(obj);
  // console.log(obj[keys[0]] + obj[keys[keys.length - 1]]);
  // remove final comma
  return obj[keys[0]] + "," + obj[keys[keys.length - 1]];
}

export const adressObjToURI = function(obj) {
  return encodeURIComponent(parseAdressObject(obj))
}
