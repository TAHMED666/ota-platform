const rates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  BDT: 117.5
};

const convertPrice = (amount, fromCurrency = 'USD', toCurrency = 'USD') => {
  const baseAmount = Number(amount) / (rates[fromCurrency] || 1);
  return Number((baseAmount * (rates[toCurrency] || 1)).toFixed(2));
};

module.exports = { convertPrice };
