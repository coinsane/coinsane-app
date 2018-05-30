
/*
* Currency Formatting (prefix or suffix)
* */
export const cFormat = (value = 0, symbol = '') => {
  return symbol.length > 1 ? `${value} ${symbol}` : `${symbol}${value}`;
};


/*
* Number Formatting
* */
export const nFormat = (num = 0, decimal = 0, startFrom = 2) => {
  const si = [
    { value: 0, symbol: '' },
    { value: 1E3, symbol: 'k' },
    { value: 1E6, symbol: 'M' },
    { value: 1E9, symbol: 'B' },
    { value: 1E12, symbol: 'T' },
    { value: 1E15, symbol: 'P' },
    { value: 1E18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const rx2 = /(\d)(?=(\d{3})+(?!\d))/g;
  let i;
  for (i = si.length - 1; i > 0; i -= 1) {
    if (num >= si[i].value) {
      break;
    }
  }
  if (si[i].value < si[startFrom].value) {
    const numSplit = num.toString().split('.');
    if (numSplit.length === 1) return `${numSplit[0].replace(rx2, '$1,')}`;
    return `${numSplit[0].replace(rx2, '$1,')}.${numSplit[1].slice(0, decimal)}`;
  }
  return (num / si[i].value).toFixed(decimal).replace(rx, '$1') + si[i].symbol;
};


export const round = (amount, n) => Math.round(amount * (10 ** n)) / (10 ** n);
