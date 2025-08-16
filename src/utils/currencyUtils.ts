
/**
 * Convert price from one currency to another
 */
export const convertPrice = (
  price: string | number, 
  fromCurrency: 'USD' | 'INR', 
  toCurrency: 'USD' | 'INR', 
  exchangeRate: number
): string => {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (fromCurrency === toCurrency) {
    return numericPrice.toString();
  }
  
  if (fromCurrency === 'USD' && toCurrency === 'INR') {
    return (numericPrice * exchangeRate).toFixed(2);
  }
  
  // INR to USD
  return (numericPrice / exchangeRate).toFixed(2);
};

/**
 * Format price with currency symbol
 */
export const formatPrice = (price: string | number, currency: 'USD' | 'INR'): string => {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  
  if (currency === 'USD') {
    return `$${numericPrice.toFixed(2)}`;
  }
  
  // INR
  return `₹${numericPrice.toFixed(2)}`;
};

/**
 * Get currency symbol
 */
export const getCurrencySymbol = (currency: 'USD' | 'INR'): string => {
  return currency === 'USD' ? '$' : '₹';
};
